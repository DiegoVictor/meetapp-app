import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from '../pages/SignIn';

const Stack = createNativeStackNavigator();

export const PublicRoutes = () => {
  return (
    <Stack.Navigator>
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
