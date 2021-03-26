import React from 'react';
import { Text } from 'react-native';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { ContactsNavigator } from './contacts.navigator';
import { SecondNavigator } from './second.navigator.js';
import { ThirdNavigator } from './third.navigator';

import { HomeBottomNavigation } from '../scenes/home/home-bottom-navigation.component';

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const initialTabRoute = 'Contacts';

const ROOT_ROUTES = ['Home', 'Contacts', 'Second', 'Third'];

const TabBarVisibilityOptions = ({ route }) => {
  const isRootRoute = ROOT_ROUTES.includes(route.name);

  return { tabBarVisible: isRootRoute };
};

const HomeTabsNavigator = () => (
  <BottomTab.Navigator
    screenOptions={TabBarVisibilityOptions}
    initialRouteName={initialTabRoute}
    tabBar={props => <HomeBottomNavigation {...props} />}
    >
    <BottomTab.Screen name='Contacts' component={ContactsNavigator} />
    <BottomTab.Screen name='Second' component={SecondNavigator} />
    <BottomTab.Screen name='Third' component={ThirdNavigator} />
  </BottomTab.Navigator>
);

const HomeNavigator = () => (
  <Drawer.Navigator
    screenOptions={{ gestureEnabled: false }}>

    <Drawer.Screen name='Home' component={HomeTabsNavigator} />
    {/* <Drawer.Screen name='Settings' component={SettingScreen} /> */}
    
  </Drawer.Navigator>
);

export default HomeNavigator;