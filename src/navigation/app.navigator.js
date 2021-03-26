import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import HomeNavigator from './home.navigator';

// Stack
// import { createStackNavigator } from '@react-navigation/stack';
// import Login from '../screens/LoginView';
// import Register from '../screens/RegisterView';
// import ForgotPassword from '../screens/ForgotPasswordView';
// import Home from '../screens/HomeView';
// import Contact from '../screens/ContactView';
// import Dashboard from '../screens/DashboardView';
// import Contacts from "../screens/ContactsView";
// import AddContact from "../screens/AddContactView";
// const Stack = createStackNavigator();

/*
 * Navigation theming: https://reactnavigation.org/docs/en/next/themes.html
 */
const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // prevent layout blinking when performing navigation
    background: 'transparent'
  }
};

const AppNavigator = () => (
  <NavigationContainer theme={navigatorTheme}>

    <HomeNavigator/>

    {/* <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{headerShown: false}}>

      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Contacts" component={Contacts} />
      <Stack.Screen name="AddContact" component={AddContact} />

    </Stack.Navigator> */}

  </NavigationContainer>
)

export default AppNavigator;