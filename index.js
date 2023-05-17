/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import {MakeLogin} from './src/main/factories/pages/login-factory';

AppRegistry.registerComponent(appName, () => MakeLogin);
