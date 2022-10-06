/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';
import './src/database/utils/Base64';

AppRegistry.registerComponent(appName, () => App);
