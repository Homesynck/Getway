import React, { useState, useEffect, PureComponent } from 'react';

import { StyleSheet, StatusBar, SafeAreaView, View } from 'react-native'
import { ListItem, Avatar, Badge } from 'react-native-elements';

import TouchableScale from 'react-native-touchable-scale';
import { useNavigation } from '@react-navigation/native';

import Contacts from 'react-native-contacts';
import { List, Icon } from '@ui-kitten/components';

class ContactListItem extends PureComponent {

  render() {
    const props = this.props;
    const [badgesVisible, setBadge] = props.badgeState
    const badge = (!badgesVisible) ? null
    : 
    (
      <Badge //TODO Touchable
      status='error'
      value={'X'}
      containerStyle={{ marginTop: -65, marginRight: -20}}
      onPress={
        () => console.log("TODO, delete contact " + props.title)
      }
    />
    )

    return ( 
      <ListItem
        Component={TouchableScale}
        friction={90}
        tension={100}
        activeScale={0.95}
        onPress={props.onPress}
        onLongPress={() => setBadge(!badgesVisible)}
        style={{
          margin: 10,
          marginBottom: 0,
          borderRadius: 100
        }}
      >
        <Avatar
          size="small"
          rounded
          title={props.title.split(" ").map((name) =>name[0]).join('').toUpperCase()}
          activeOpacity={0.7}
          containerStyle={{backgroundColor: '#C1AB9A'}}
        />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: 'bold' }}>
            {props.title}
          </ListItem.Title>
          <ListItem.Subtitle>
            Some info here
          </ListItem.Subtitle>
        </ListItem.Content>
        {badge}
      </ListItem>
    )
  }
}

const ListContact = () => {

  const navigation = useNavigation();

    const [contactsData, setContactsData] = useState([]);
    const [badgesVisible, setBadge] = useState(false);

    const getAllContacts = async () => {
        const contacts = await Contacts.getAll();
        //console.log(contacts.length + " contacts : " + contacts.map((contact) => contact.displayName).join(', '));
        setContactsData(contacts);
    }

    useEffect(() => {
        getAllContacts();
    },[]);
    
    const renderItem = ({item}) => (
      <ContactListItem 
        title = {item.displayName}
        badgeState={[badgesVisible, setBadge]}
        onPress={() => {
          setBadge(false)
          navigation.navigate('Contact', {contact: item})
        }}
        style={{
          margin: '10'
        }}
      />
    );

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View  onResponderGrant={(e) => console.log("received event:", e)}>
          <List
            data={contactsData}
            renderItem={renderItem}
            keyExtractor={item => item.recordID}
            contentContainerStyle={{borderRadius: 6, overflow: 'hidden'}}

          />
        </View >
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
  item: {
    backgroundColor: '#607D8B',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },

});

export default ListContact;