import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../scenes/autentification/login.screen';
import Register from '../scenes/autentification/register.screen';
import ForgotPassword from '../scenes/autentification/forgot-password.screen';

const Stack = createStackNavigator();

const LoginNavigator = () => (
  <NavigationContainer>
      <Stack.Navigator 
      headerMode='none'
      initialRouteName="Login"
      >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
  </NavigationContainer>
);

export default LoginNavigator;