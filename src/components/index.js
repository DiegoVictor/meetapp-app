import React, { Component } from 'react';
import '~/config/ReactotronConfig';
import { StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import CodePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';

import Default from './layouts/Default';
import Routes from '~/routes';
import store from '~/store';

class App extends Component {
  constructor(props) {
    super(props);

    OneSignal.init('e12369bb-f27f-40a8-aab3-98474c5ac789');
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillMount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived = data => {};

  onOpened = notification => {};

  onIds = id => {};

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistStore(store)}>
          <StatusBar barStyle="light-content" backgroundColor="#191620" />
          <Default>
            <Routes ref={nav => Navigator(nav)} />
          </Default>
        </PersistGate>
      </Provider>
    );
  }
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);
