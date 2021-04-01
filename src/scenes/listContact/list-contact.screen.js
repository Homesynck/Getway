import React, { useState, useContext, PureComponent } from 'react';

import { Text, StyleSheet, StatusBar, SafeAreaView, View, SectionList } from 'react-native'
import { ListItem, Avatar, Badge } from 'react-native-elements';

import TouchableScale from 'react-native-touchable-scale';
import { useNavigation } from '@react-navigation/native';

import ContactsContext from '../../modules/contact/contacts.context';

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
          onPress={props.onBadgePress}
          badgeStyle={{backgroundColor: '#d4281b', margin:10, paddingLeft:8, paddingRight:8}}
        />
      )

    return (
      <ListItem
        Component={TouchableScale}
        friction={90}
        tension={100}
        activeScale={0.95}
        onPress={props.onPress}
        onLongPress={props.onLongPress}
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
          {props.description != null
          ? <ListItem.Subtitle>{props.description}</ListItem.Subtitle>
          : null}
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

  const { contacts, setContacts } = useContext(ContactsContext)

  const contacts_list = convertContactToSections(contacts)

  const renderItem = ({ item }) => (
    <ContactListItem
      id={item.id}
      title={item.displayName}
      description={item.description}
      badgeState={[badgesVisible, setBadge]}
      onBadgePress={() => deleteContactById(item.id, contacts, setContacts)}
      onPress={() => {        
         if(!badgesVisible)
           navigation.navigate('Contact', { contact: item })
         else
         setBadge(false)
      }}
      onLongPress={() => setBadge(!badgesVisible)}
      style={{
        margin:'10'
      }}
    />
  );

  const renderTitle = ({ section: { title } }) => (
    <View style={styles.index}>
      <Text style={{textAlign:'center', color:'white'}}>{title}</Text>
    </View>
  )

  if(contacts.length == 0){
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff'}}>
        <View>
          <Text style={{ alignSelf: 'center', margin: 10 }}>Aucun contact pour l'instant</Text>
        </View >
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff'}}>
      <View>
        <SectionList
          sections={contacts_list}
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
  index:{
    backgroundColor:'#E46F4C', 
    borderRadius:12, 
    width:50, 
    padding:5, 
    margin:8
  }

});

export default ListContact;