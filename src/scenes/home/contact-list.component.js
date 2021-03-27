import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, Text } from 'react-native';
import Contacts from "react-native-contacts";

import ContactListItem from '../../components/ContactListItem';
import { useNavigation } from '@react-navigation/native';


import { Layout } from '@ui-kitten/components';

const ContactsScreen = () => {
  const navigation = useNavigation();

  const [contactsData, setContactsData] = useState([]);

  useEffect(() => {

    const contacts =  async () => {
     const contactsRes = await Contacts.getAll();;
     setContactsData(contactsRes);
    }
    contacts();
  }, []);

  const renderItem = ({ item }) => (
    <ContactListItem 
      name={item.displayName}
      onPress={() => navigation.navigate('Contact', {
        contact: item
      })} />
  );

    return (
        <SafeAreaView>
          <Layout style={{marginVertical: 16, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>List of contacts</Text>
          </Layout>
          <FlatList
              data={contactsData}
              renderItem={renderItem}
              keyExtractor={item => item.recordID} />
        </SafeAreaView>
    )
};

export default ContactsScreen;
