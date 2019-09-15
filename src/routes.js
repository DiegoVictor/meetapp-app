import React, { forwardRef } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { useSelector } from 'react-redux';

import SignIn from './components/pages/Sign/In';
import SignUp from './components/pages/Sign/Up';
import Dashboard from './components/pages/Dashboard';

function Routes() {
  const signed = useSelector(state => state.signed);
  const Router = createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createSwitchNavigator({
          Dashboard,
        }),
      },
      {
        initialRouteName: (() => {
          if (signed) {
            return 'App';
          }
          return 'Sign';
        })(),
      }
    )
  );

  return <Router />;
}

export default forwardRef(Routes);
