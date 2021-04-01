import React, { useState, useEffect, useContext } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";

import ContactsContext from '../modules/contact/contacts.context';
import Dashboard from '../scenes/home/dashboard.view';
import Contact from '../scenes/contact-detail/contact.screen';
import { NativeModules } from 'react-native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DashboardNavigator = () => (
  <Stack.Navigator 
  screenOptions={{ headerShown: false }}
  initialRouteName="Dashboard">
    <Stack.Screen name="Dashboard" component={Dashboard} />
    <Stack.Screen name="Contact" component={Contact} />
  </Stack.Navigator>
)

const { UserModule } = NativeModules;

const DashboardDrawerContent = (props) => {
  const { contacts, setContacts } = useContext(ContactsContext)
  const [username, setUsername] = useState("");

  const getUsername = async () => {
    const name = await UserModule.getUsername()
    setUsername(name);
  }

  useEffect(() => {
    let mounted = true;

    if(mounted){
      getUsername();
    }

    return mounted = false;
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        labelStyle={{color:"#E46F4C"}}
        label={username}
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export const ContactsNavigator = () => (
  //TODO change color of onPress element
  <Drawer.Navigator
    drawerType={'front'}
    drawerContent={(props) => <DashboardDrawerContent {...props} />}
    screenOptions={{ gestureEnabled: true, headerShown: false , 
    drawerActiveTintColor:'#e46f4c'}}
    initialRouteName="Mon espace"
    >
    <Drawer.Screen name="Mon espace" component={DashboardNavigator} 
    />
  </Drawer.Navigator>
);
