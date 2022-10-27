import { NativeModules } from 'react-native';
import { _loadBlacklist } from './BlacklistInterface';
import { _loadWhitelist } from './WhitelistInterface';
import { insert } from './CallLogInterface';
import { getBlockCalls, getUseContacts, getUseNotifications, getUseWhitelist, getUseBlacklist, _loadSettings } from './SettingsInterface';
import notifee from '@notifee/react-native';

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

    let block = false;
    if(getUseBlacklist() && await _checkList(_loadBlacklist, data.phoneNumber)) block = true;
    if(getUseWhitelist() && block && await _checkList(_loadWhitelist, data.phoneNumber)) block = false;
    return block;
}

//Sends a notification
const _sendNotif = async(title : string, body : string) => {
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
        id: "CallHandler",
        name: "CallHandler Channel"
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

//Blocks or allows a call
export const handleCall = async(data : any) => {
    if(data.phoneNumber == null) return;
    console.log("CallHandler.js: Received incoming call "+data.phoneNumber+", "+data.timestamp+", "+data.location);

    //Load user preferences
    await _loadSettings();
    const useNotifs = getUseNotifications();
    const useContacts = getUseContacts();
    console.log("CallHandler.js: Using settings {useNotifs: "+useNotifs+", useContacts: "+useContacts+"}");

    //Block if caller is on blacklist, allow if on whitelist (TODO: Handle partial numbers)
    let block = await _shouldBlock(data);
    NativeModules.CallModule.sendResponse(block, useContacts);
    insert(data.phoneNumber, data.timestamp, data.location, block);

    //Send notification if blocked and useNotifs = true
    if(block && useNotifs) _sendNotif("GetOut", "Blocked call from "+data.phoneNumber+". Tap for details.");
    
}