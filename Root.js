import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/LoginView';
import Register from './src/screens/RegisterView';
import ForgotPassword from './src/screens/ForgotPasswordView';
import Home from './src/screens/HomeView';
import Contact from './src/screens/ContactView';
import Dashboard from './src/screens/DashboardView';
import Contacts from "./src/screens/ContactsView";
import AddContact from "./src/screens/AddContactView";

const Stack = createStackNavigator();

function Root() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AddContact"
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Contacts" component={Contacts} />
        <Stack.Screen name="AddContact" component={AddContact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Root;