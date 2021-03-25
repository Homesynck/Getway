import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getAllContacts } from '../../modules';

import { Layout } from '@ui-kitten/components';


const ContactItem = ({ name, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Text style={styles.text}>{name}</Text>
  </TouchableOpacity>
);

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
    <ContactItem 
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#607D8B',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  text: {
    fontSize: 18,
    color: "#f5f1f0",
  },
});

export default Contacts;
