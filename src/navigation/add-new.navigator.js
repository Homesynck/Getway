import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AddContact from '../scenes/addForm/add-contact.screen';

const Stack = createStackNavigator();

export const AddNewNavigator = () => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name="AddContact" component={AddContact} />
  </Stack.Navigator>
);
