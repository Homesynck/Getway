import React, { useEffect, useContext } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";

import ContactsContext from '../modules/contact/contacts.context';
import Dashboard from '../scenes/home/dashboard.view';
import { getContactsFromAndroid } from '../modules/contact/contacts.module'
import { TouchableOpacity } from 'react-native';

// import Contacts from "./src/screens/ContactsView";
// import AddContact from "./src/screens/AddContactView";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DashboardDrawerContent = (props) => {
  const { contacts, setContacts } = useContext(ContactsContext)
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        labelStyle={{color:"#E46F4C"}}
        label="Importation des contacts android"
        onPress={() => {
          getContactsFromAndroid().then((r) => {
            setContacts(r)
            console.log("Imported: " + r.length)
          })
        }}
      />
      <DrawerItem
        labelStyle={{color:"#E46F4C"}}
        label="Se déconnecter"
        onPress={() => console.log("TODO/ déconnexion")}
      />
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
    initialRouteName="Dashboard"
    >
    <Drawer.Screen name="Mon espace" component={Dashboard} 
    />
  </Drawer.Navigator>
);
