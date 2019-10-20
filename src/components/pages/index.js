import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import '~/config/ReactotronConfig';
import Routes from '~/routes';
import store from '~/store';
import Style from './styles';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <Routes />
        <Style />
        <ToastContainer />
      </PersistGate>
    </Provider>
  );
}

export default App;
