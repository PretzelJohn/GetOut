import { Platform } from 'react-native'
import * as Settings from './SettingsInterface'

import { check, request, requestNotifications, RESULTS } from 'react-native-permissions';


//Requests a permission and returns true if it was granted, or false otherwise
export const getPermission = async function(permission : any, shouldRequest=false) : Promise<boolean> {
    if (Platform.OS === 'android') {
        const result = shouldRequest ? await request(permission) : check(permission);

        switch (result) {
            case RESULTS.UNAVAILABLE:
                console.log('This feature is not available (on this device / in this context)');
                return false;
            case RESULTS.DENIED:
                console.log('The permission has not been requested / is denied but requestable');
                return false;
            case RESULTS.LIMITED:
                console.log('The permission is limited: some actions are possible');
                return false;
            case RESULTS.GRANTED:
                console.log('The permission is granted.');
                return true;
            case RESULTS.BLOCKED:
                console.log('The permission is denied and not requestable anymore');
                return false;
            default:
                return false;
        }
    } else {
        //TODO: iOS
    }
    return false;
}


//Requests permission to send notifications and returns true if it was granted, or false otherwise
export const getNotifPermission = async function() : Promise<boolean> {
    console.log('requesting notification permissions...');
    const result = await requestNotifications(['alert', 'sound']);
    return result.status === 'granted';
} 


//Requests a role (set GetOut as default app) and returns true if it was granted, or false otherwise
export const getRole = async function(role : any) : Promise<boolean> {
    //TODO: getRole
    return new Promise<boolean>(resolve => {
        resolve(false);
    });
}