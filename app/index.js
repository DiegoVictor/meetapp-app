import { AppRegistry, YellowBox } from 'react-native';
import App from './src/components';
import { name as appName } from './app.json';

YellowBox.ignoreWarnings(['componentWillMount is deprecated']);

AppRegistry.registerComponent(appName, () => App);
