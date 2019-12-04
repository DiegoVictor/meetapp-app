import { reactotronRedux } from 'reactotron-redux';
import Reactotron from 'reactotron-react-js';
import sagaPlugin from 'reactotron-redux-saga';

if (process.env.NODE_ENV === 'development') {
  Reactotron.configure()
    .use(reactotronRedux())
    .use(sagaPlugin())
    .connect()
    .clear();
}
