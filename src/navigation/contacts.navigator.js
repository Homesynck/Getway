import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../scenes/home/dashboard.view';
import Contact from '../scenes/contact-detail/contact.screen';
// import Contacts from "./src/screens/ContactsView";
// import AddContact from "./src/screens/AddContactView";

const Stack = createStackNavigator();

export const ContactsNavigator = () => (
  <Stack.Navigator 
    headerMode='none'
    initialRouteName="Dashboard"
  >
    <Stack.Screen name="Dashboard" component={Dashboard} />
    <Stack.Screen name="Contact" component={Contact} />
    {/* <Stack.Screen name="Contacts" component={Contacts} />
    <Stack.Screen name="AddContact" component={AddContact} /> */}
  </Stack.Navigator>
);
