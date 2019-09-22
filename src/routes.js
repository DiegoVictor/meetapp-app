import React, { forwardRef } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { useSelector } from 'react-redux';

import SignIn from './components/pages/Sign/In';
import SignUp from './components/pages/Sign/Up';
import Dashboard from './components/pages/Dashboard';
import Subscription from './components/pages/Subscription';
import Profile from './components/pages/Profile';

function Routes() {
  const signed = useSelector(state => state.signed);
  const Router = createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard,
            Subscription,
            Profile,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#FFF',
              inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
              style: {
                backgroundColor: '#2B1A2F',
                border: 0,
                borderTopColor: '#2B1A2F',
                fontSize: 12,
                lineHeight: 14,
                paddingBottom: 5,
                paddingTop: 5,
              },
            },
          }
        ),
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
