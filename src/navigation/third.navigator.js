import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../scenes/home/home.screen';

const Stack = createStackNavigator();

export const ThirdNavigator = () => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);
