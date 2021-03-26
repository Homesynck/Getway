import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/LoginView';
import Register from '../screens/RegisterView';
import ForgotPassword from '../screens/ForgotPasswordView';

const Stack = createStackNavigator();

export const LoginNavigator = () => (
  <Stack.Navigator 
    headerMode='none'
    initialRouteName="Login"
  >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  </Stack.Navigator>
);
