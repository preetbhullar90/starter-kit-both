/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { LogBox } from 'react-native';

import { CurrentUserProvider } from './components/CurrentUser'
LogBox.ignoreLogs(['RCTBridge required dispatch_sync to load RCTAccessibilityManager. This may lead to deadlocks']);

const RootComponent = () => {
    return (
        <CurrentUserProvider>
            <App />
        </CurrentUserProvider>
    )
};

AppRegistry.registerComponent(appName, () => RootComponent);
