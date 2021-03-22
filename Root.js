import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/pages/LoginView/';
import Register from './src/pages/RegisterView/';
import ForgotPassword from './src/pages/ForgotPasswordView/';
import Home from './src/pages/HomeView/';
import Contact from './src/pages/ContactView/';
import Dashboard from './src/pages/DashboardView';

const Stack = createStackNavigator();

function Root() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Root;