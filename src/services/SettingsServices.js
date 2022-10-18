import { Platform } from 'react-native'
import * as Settings from '../api/SettingsInterface'

import { request, requestNotifications, openSettings, PERMISSIONS, RESULTS } from 'react-native-permissions';

// permission = (e.g. PERMISSIONS.ANDROID.READ_CONTACTS) 
export const getPermission = function(permission) {
    if (Platform.OS === 'android') {    
        request(permission).then((result) => {
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
                        Settings.setContacts(true);
                        return true;
                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        return false;
                  }
            }).catch((error) => {
                console.error('[Permissions] [E]:', error);
            });
    }
}

export const openDeviceSettings = function() {
    openSettings().catch(() => console.warn('Cannot open device settings'));
}

export const notifsPermissionsHandler = function(value) {

    console.log('requesting notification permissions...');
        
    requestNotifications(['alert', 'sound']).then(({status, settings}) => {
        if (status === 'granted') {
            return true;
        } else {
            return false;
        }
    });
} 