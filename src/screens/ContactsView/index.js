import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, Text, StyleSheet } from 'react-native';
import ContactListItem from '../../components/ContactListItem';
import { useNavigation } from '@react-navigation/native';

import { getAllContacts } from '../../modules';

import { Layout } from '@ui-kitten/components';

const Contacts = () => {
  const navigation = useNavigation();

  const [contactsData, setContactsData] = useState([]);

  useEffect(() => {

    const contacts =  async () => {
     const contactsRes = await getAllContacts();
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

export default Contacts;
