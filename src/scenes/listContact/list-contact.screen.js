import React, { useState, useEffect, PureComponent } from 'react';

import { Text, StyleSheet, StatusBar, SafeAreaView, View, SectionList } from 'react-native'
import { ListItem, Avatar, Badge } from 'react-native-elements';

import TouchableScale from 'react-native-touchable-scale';
import { useNavigation } from '@react-navigation/native';

import { getContacts, deleteContactById } from '../../modules/contact/contacts.module';

class ContactListItem extends PureComponent {

  render() {
    const props = this.props;
    const id = props.id
    const [badgesVisible, setBadge] = props.badgeState
    const badge = (!badgesVisible) ? null
      :
      (
        <Badge //TODO Touchable
          status="error"
          value={'-'}
          //containerStyle={{ marginTop: -65, marginRight: -20 }}
          onPress={
            () => {console.log("TRYING TO DELETE ", id);deleteContactById(id)}
          }
          badgeStyle={{backgroundColor: '#d4281b', paddingHorizontal:10, paddingVertical:15}}
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

  const [badgesVisible, setBadge] = useState(true);

  const contacts = convertContactToSections(getContacts())

  const renderItem = ({ item }) => (
    <ContactListItem
      id={item.id}
      title={item.displayName}
      badgeState={[badgesVisible, setBadge]}
      // onPress={() => {
      //   if(!badgesVisible)
      //     navigation.navigate('Contact', { contact: item })
      //   else
      //   setBadge(false)
      // }}
      style={{
        margin:'10'
      }}
    />
  );

  const renderTitle = ({ section: { title } }) => (
    <Badge value={title} status="warning" style={{ alignSelf: 'flex-start'}} />
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