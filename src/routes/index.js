import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { setNavigator } from '~/services/navigator';
import { Dashboard } from '~/pages/Dashboard';
import { Profile } from '~/pages/Profile';
import { SignIn } from '~/pages/Sign/In';
import { SignUp } from '~/pages/Sign/Up';
import { Subscription } from '~/pages/Subscription';

export const Routes = () => {
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
            Dashboard: {
              screen: Dashboard,
              navigationOptions: {
                tabBarLabel: 'Meetups',
                tabBarIcon: ({ tintColor }) => (
                  <Icon
                    name="format-list-bulleted"
                    size={20}
                    color={tintColor}
                  />
                ),
              },
            },
            Profile: {
              screen: Profile,
              navigationOptions: {
                tabBarLabel: 'Meu perfil',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="person" size={20} color={tintColor} />
                ),
              },
            },
            Subscription: {
              screen: Subscription,
              navigationOptions: {
                tabBarLabel: 'Inscrições',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="local-offer" size={20} color={tintColor} />
                ),
              },
            },
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

  return (
    <Router
      ref={nav => {
        setNavigator(nav);
      }}
    />
  );
};
