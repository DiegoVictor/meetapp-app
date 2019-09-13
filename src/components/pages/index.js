import React from 'react';
import { Provider } from 'react-redux';
import Routes from '../../routes';
import store from '../../store';
import Style from './styles';

function App() {
  return (
    <Provider store={store}>
      <Routes />
      <Style />
    </Provider>
  );
}

export default App;
