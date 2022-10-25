import { NativeModules } from 'react-native'
import { check, request, requestNotifications, RESULTS } from 'react-native-permissions';

//Requests a permission and returns true if it was granted, or false otherwise
export const getPermission = async function(permission : any, shouldRequest=false) : Promise<boolean> {
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
            console.log('The permission status is unknown');
            return false;
    }
}


//Requests permission to send notifications and returns true if it was granted, or false otherwise
export const getNotifPermission = async function() : Promise<boolean> {
    console.log('requesting notification permissions...');
    const result = await requestNotifications(['alert', 'sound']);
    return result.status === 'granted';
} 


//Requests a role - android only (set GetOut as default app)
export enum Role {
    ASSISTANT, BROWSER, HOME, SMS, CALL_REDIRECTION, CALL_SCREENING, DIALER, EMERGENCY
}
export const getRole = function(role : Role) : void {
    const { RoleModule } = NativeModules;
    RoleModule.requestRole(Role[role]);
}