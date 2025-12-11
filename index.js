/**
 * @format
 */

// Initialize Firebase FIRST before any other imports that might use Firebase

// Initialize Firebase messaging

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
