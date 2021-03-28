import React, { useState, useEffect, PureComponent } from 'react';
import { View, SafeAreaView, StyleSheet, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Contacts from 'react-native-contacts';
import { ListItem, Text, List, Icon } from '@ui-kitten/components';

class ContactListItem extends PureComponent {

  render() {
    const props = this.props;
    const renderItemIcon = (props) => (
      <Icon {...props} name='person'/>
    );
    return (
        <ListItem
        accessoryLeft={renderItemIcon}
        title={props.title}
        description='ok'
        />
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
      
      <List
        data={contactsData}
        renderItem={renderItem}
        keyExtractor={item => item.recordID}
      />

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

});

export default ListContact;