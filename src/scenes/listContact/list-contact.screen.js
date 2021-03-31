import React, { useState, useEffect, PureComponent } from 'react';

import { Text, StyleSheet, StatusBar, SafeAreaView, View, SectionList } from 'react-native'
import { ListItem, Avatar, Badge } from 'react-native-elements';
import { AlphabetList } from "react-native-section-alphabet-list";

import TouchableScale from 'react-native-touchable-scale';
import { useNavigation } from '@react-navigation/native';

import { getContacts } from '../../modules/contact/contacts.module';

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
          containerStyle={{ marginTop: -65, marginRight: -20 }}
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
        containerStyle={{
          padding:10,
          margin:13,
          borderRadius:10,
          shadowOpacity: 0.5,
          shadowRadius: 1,
          backgroundColor:'white',
          elevation: 10
        }}
      >
        <Avatar
          size="small"
          rounded
          title={props.title.split(" ").map((name) => name[0]).join('').toUpperCase()}
          activeOpacity={0.7}
          containerStyle={{ backgroundColor: '#C1AB9A' }}
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

function convertContactToSections(contacts) {
  let contactsList = [];
  let aCode = "A".charCodeAt(0);
  for(let i = 0; i < 26; i++) {
    let currChar = String.fromCharCode(aCode + i)
    let obj = {title: currChar}

    let currContacts = contacts.filter(contact => {
      if(contact.familyName.length > 0)
        return contact.familyName[0].toUpperCase() === currChar
      return contact.displayName[0].toUpperCase() === currChar
    });

    if (currContacts.length > 0) {
      currContacts.sort((a,b) => a.familyName.localeCompare(b.familyName));
      obj.data = currContacts;
      contactsList.push(obj)
    }
  }
  return contactsList;
}

const ListContact = () => {

  const navigation = useNavigation();

  const [badgesVisible, setBadge] = useState(false);

  const contacts = convertContactToSections(getContacts())

  const renderItem = ({ item }) => (
    <ContactListItem
      title={item.displayName}
      badgeState={[badgesVisible, setBadge]}
      onPress={() => {
        setBadge(false)
        navigation.navigate('Contact', { contact: item })
      }}
      style={{
        margin:'10'
      }}
    />
  );

  const renderTitle = ({ section: { title } }) => (
    <Badge value={title} badgeStyle={{backgroundColor:'#E46F4C', alignSelf:'baseline', padding:10, marginLeft:10, marginTop:10}}/>
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff'}}>
      <View onResponderGrant={(e) => console.log("received event:", e)}>
        <SectionList
          sections={contacts}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
          renderSectionHeader={renderTitle}
          contentContainerStyle={{ borderRadius: 6, overflow: 'hidden' }}
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