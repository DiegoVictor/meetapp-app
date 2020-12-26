import { reactotronRedux } from 'reactotron-redux';
import Reactotron from 'reactotron-react-native';
import sagaPlugin from 'reactotron-redux-saga';

if (__DEV__) {
  const tron = Reactotron.configure()
    .use(reactotronRedux())
    .use(sagaPlugin())
    .useReactNative()
    .connect();

  console.tron = tron;
  tron.clear();
}
