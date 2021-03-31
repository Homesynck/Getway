import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from "@react-navigation/drawer";

import Dashboard from '../scenes/home/dashboard.view';

// import Contacts from "./src/screens/ContactsView";
// import AddContact from "./src/screens/AddContactView";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const ContactsNavigator = () => (
  <Drawer.Navigator screenOptions={{ gestureEnabled: true, headerShown: false }} initialRouteName="Dashboard">
    <Drawer.Screen name="Dashboard" component={Dashboard} />
  </Drawer.Navigator>
  // <Stack.Navigator 
  //   screenOptions={{ headerShown: false }}
  //   initialRouteName="Dashboard"
  // >
  //   <Stack.Screen name="Dashboard" component={Dashboard} />
    
  // </Stack.Navigator>
);
