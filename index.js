/**
 * @format
 */

import { AppRegistry } from 'react-native';
import Getway from './src/android';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => Getway);
