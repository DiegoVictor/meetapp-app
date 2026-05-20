import MaterialIcons from '@react-native-vector-icons/material-icons';
import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import { Dashboard } from '../pages/private/Dashboard';
import { Profile } from '../pages/private/Profiler';
import { Subscription } from '../pages/private/Subscription';

const Tab = createNativeBottomTabNavigator();

export const PrivateRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        tabBarStyle: {
          backgroundColor: '#2B1A2F',
          border: 0,
          borderTopColor: '#2B1A2F',
          fontSize: 12,
          lineHeight: 14,
          paddingBottom: 5,
          paddingTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Meetups',
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Meu Perfil',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Subscription"
        component={Subscription}
        options={{
          tabBarLabel: 'Inscrições',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="local-offer" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
