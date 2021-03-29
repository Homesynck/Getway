import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import AuthNavigatorConsumer from '../modules/authentication/authentication-navigator.consumer';

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

    <AuthNavigatorConsumer />

  </NavigationContainer>
)

export default AppNavigator;