import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListContact from '../scenes/listContact/list-contact.screen';
import Contact from '../scenes/contact-detail/contact.screen';

const Stack = createStackNavigator();

export const ListNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ListContact" component={ListContact} />
    <Stack.Screen name="Contact" component={Contact} />
  </Stack.Navigator>
);
