import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import HomeNavigator from './home.navigator';

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

    {/* Si connecté : */}
    <HomeNavigator />
    {/* Sinon
    <LoginNavigator /> */}


  </NavigationContainer>
)

export default AppNavigator;