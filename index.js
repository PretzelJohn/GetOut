/**
 * @format
 */

import 'react-native-get-random-values';
import { AppRegistry, NativeModules } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';
import './src/database/utils/Base64';
import { HandleCall } from './src/api/CallHandler';

//Fixes TextEncoder missing error
const TextEncodingPolyfill = require('text-encoding');
Object.assign(global, {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask("CallHandler", () => HandleCall);
NativeModules.CallModule.startService();
