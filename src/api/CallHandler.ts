import { NativeModules } from 'react-native';
import { _loadBlacklist } from './BlacklistInterface';
import { _loadWhitelist } from './WhitelistInterface';
import { insert } from './CallLogInterface';
import { getBlockCalls, getUseContacts, getUseNotifications, getUseWhitelist, getUseBlacklist, _loadSettings } from './SettingsInterface';
import notifee, { AndroidImportance } from '@notifee/react-native';


//Returns true if the phone number is in the whitelist or blacklist
const _checkList = async(loader : Function, phoneNumber : string) => {
    const list = await loader('');
    for(let i = 0; i < list.length; i++) {
        const phone_number = list[i].phone_number;
        if(phoneNumber === phone_number) return true;
    }
    return false;
}

//Returns true if the call should be blocked, false otherwise
const _shouldBlock = async(data : any) => {
    if(!getBlockCalls()) return false;

    //Check if caller is in contacts
    let block = false;
    if(getUseContacts()) block = true; //Block if not in contacts
    if(getUseBlacklist() && await _checkList(_loadBlacklist, data.phoneNumber)) block = true; //Block if in blacklist
    if(getUseWhitelist() && block && await _checkList(_loadWhitelist, data.phoneNumber)) block = false; //Allow if in whitelist
    return block;
}

//Sends a notification
const _sendNotif = async(title : string, body : string) => {
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
        id: "CallHandler",
        name: "CallHandler Channel",
        importance: AndroidImportance.MIN
    });
    await notifee.displayNotification({
        title: title,
        body: body,
        android: {
            channelId,
            pressAction: {
                id: "default"
            }
        }
    });
}

//Blocks or allows a call (headless)
export const HandleCall = async(data : any) => {
    if(data.phoneNumber == null) return; //Ignore startup call
    console.log("CallHandler.js: Received incoming call "+data.phoneNumber+", "+data.timestamp+", "+data.location);

    //Load user preferences
    await _loadSettings();
    const useNotifs = getUseNotifications();
    console.log("CallHandler.js: Using settings {useNotifs: "+useNotifs+"}");

    //Block the call if it should and insert the call into db
    let block = await _shouldBlock(data);
    NativeModules.CallModule.sendResponse(block);
    insert(data.phoneNumber, data.timestamp, data.location, block);

    //Send notification if blocked and useNotifs = true
    const phoneNumber = data.phoneNumber.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    if(block && useNotifs) _sendNotif("GetOut", "Blocked call from "+phoneNumber+". Tap for details.");
}

//Starts the sticky service (headless and internal)
export const StartService = async(data : any) => {
    console.log("StartService loading settings...");
    await _loadSettings();
    console.log("StartService settings loaded! getBlockCalls() = "+getBlockCalls());
    if(getBlockCalls()) {
        console.log("StartService starting service...");
        NativeModules.CallModule.startService();
    }
}

//Stops the sticky service
export const StopService = async() => {
    NativeModules.CallModule.stopService();
}