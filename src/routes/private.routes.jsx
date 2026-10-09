import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import { Dashboard } from '../pages/private/Dashboard';
import { Profile } from '../pages/private/User/Profile';
import { ChangePassword } from '../pages/private/User/ChangePassword';
import { Subscription } from '../pages/private/Subscription';
import MeetupsIcon from '../assets/tab-icons/meetups.png';
import ProfileIcon from '../assets/tab-icons/profile.png';
import SubscriptionsIcon from '../assets/tab-icons/subscriptions.png';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ProfileRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        contentStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Meu Perfil',
          tabBarIcon: { type: 'image', source: ProfileIcon },
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

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
          headerShown: false,
          tabBarLabel: 'Meetups',
          tabBarIcon: { type: 'image', source: MeetupsIcon },
        }}
      />
      <Tab.Screen
        name="User"
        component={ProfileRoutes}
        options={{
          headerShown: false,
          tabBarLabel: 'Meu Perfil',
          tabBarIcon: { type: 'image', source: ProfileIcon },
        }}
      />
      <Tab.Screen
        name="Subscription"
        component={Subscription}
        options={{
          headerShown: false,
          tabBarLabel: 'Inscrições',
          tabBarIcon: { type: 'image', source: SubscriptionsIcon },
        }}
      />
    </Tab.Navigator>
  );
};
