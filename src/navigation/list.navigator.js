import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListContact from '../scenes/listContact/list-contact.screen';

const Stack = createStackNavigator();

export const ListNavigator = () => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name="List" component={ListContact} />
  </Stack.Navigator>
);
