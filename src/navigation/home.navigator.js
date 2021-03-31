import React from "react";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { ContactsNavigator } from "./contacts.navigator";
import { AddNewNavigator } from "./add-new.navigator.js";
import { ListNavigator } from "./list.navigator";

import { HomeBottomNavigation } from "../scenes/home/home-bottom-navigation.component";

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const initialTabRoute = "Contacts";
const ROOT_ROUTES = ["Home", "Contacts", "Nouveau", "List"];

const TabBarVisibilityOptions = ({ route }) => {
  const isRootRoute = ROOT_ROUTES.includes(route.name);

  return { tabBarVisible: isRootRoute };
};

const HomeTabsNavigator = () => (
  <BottomTab.Navigator
    screenOptions={{...TabBarVisibilityOptions, headerShown: false}}
    initialRouteName={initialTabRoute}
    tabBar={(props) => <HomeBottomNavigation {...props} />}
  >
    <BottomTab.Screen name="Contacts" component={ContactsNavigator} />
    <BottomTab.Screen name="Nouveau" component={AddNewNavigator} />
    <BottomTab.Screen name="List" component={ListNavigator} />
  </BottomTab.Navigator>
);

const HomeNavigator = () => <HomeTabsNavigator />;

export default HomeNavigator;
