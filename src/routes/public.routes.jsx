import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from '../pages/public/SignIn';
import { SignUp } from '../pages/public/SignUp';

const Stack = createNativeStackNavigator();

export const PublicRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        contentStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
