/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { CurrentUserProvider } from './components/CurrentUser'

const RootComponent = () => {
    return (
        <CurrentUserProvider>
            <App />
        </CurrentUserProvider>
    )
};

AppRegistry.registerComponent(appName, () => RootComponent);
