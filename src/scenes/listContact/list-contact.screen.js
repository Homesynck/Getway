import React, { useState, useEffect, PureComponent } from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Contacts from 'react-native-contacts';

class ContactListItem extends PureComponent {

  render() {
    const props = this.props;

    return (
      <TouchableOpacity onPress={props.onPress}>
        <View style={styles.item}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </TouchableOpacity>
      
    )
  }
}

const ListContact = () => {

  const navigation = useNavigation();

    const [contactsData, setContactsData] = useState([]);

    const getAllContacts = async () => {
        const contacts = await Contacts.getAll();
        console.log(contacts);
        setContactsData(contacts);
    }

    useEffect(() => {
        getAllContacts();
    },[]);

    const renderItem = ({item}) => (
      <ContactListItem 
        title = {item.displayName}
        onPress={navigation.navigate('Contact', {contact: item} )}
      />
    );

    return (
        <SafeAreaView style={styles.container}>
          <FlatList
              data={contactsData}
              renderItem={renderItem}
              keyExtractor={item => item.recordID}
          />
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#607D8B',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
});

export default ListContact;