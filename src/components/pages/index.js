import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import 'react-toastify/dist/ReactToastify.css';
import '../../config/ReactotronConfig';
import Routes from '../../routes';
import store from '../../store';
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
