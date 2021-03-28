import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../scenes/home/dashboard.view';

// import Contacts from "./src/screens/ContactsView";
// import AddContact from "./src/screens/AddContactView";

const Stack = createStackNavigator();

export const ContactsNavigator = () => (
  <Stack.Navigator 
    headerMode='none'
    initialRouteName="Dashboard"
  >
    <Stack.Screen name="Dashboard" component={Dashboard} />
    
  </Stack.Navigator>
);
