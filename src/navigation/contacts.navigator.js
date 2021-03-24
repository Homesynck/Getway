import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/HomeView';

const Stack = createStackNavigator();

export const ContactsNavigator = () => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);
