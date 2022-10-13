import { Platform } from 'react-native'
import * as Settings from '../api/SettingsInterface'

import { request, requestNotifications, openSettings, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const contactsPermissionsHandler = function(value) {

    // Request user permissions - Android
    if (Platform.OS === 'android') {
        if (value === true) {
            request(PERMISSIONS.ANDROID.READ_CONTACTS).then((result) => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log('This feature is not available (on this device / in this context)');
                        break;
                    case RESULTS.DENIED:
                        console.log('The permission has not been requested / is denied but requestable');
                        break;
                    case RESULTS.LIMITED:
                        console.log('The permission is limited: some actions are possible');
                        break;
                    case RESULTS.GRANTED:
                        // Set value in settings db
                        Settings.setContacts(value);
                        break;
                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        break;
                  }
            }).catch((error) => {
                console.error('[Permissions] [E]:', error);
            });
        } else {
            openSettings().catch(() => console.warn('Cannot open device settings'));
        }
    }
    else if (Platform.OS === 'ios') {
        // Do ios stuff idk lol
    }
}

export const notifsPermissionsHandler = function(value) {
    console.log(value);

    if (value === true) {
        console.log('requesting notification permissions...');
        
        requestNotifications(['alert', 'sound']).then(({status, settings}) => {
            console.log(status);
        });
    } else {
        openSettings().catch(() => console.warn('Cannot open device settings'));
    }
} 