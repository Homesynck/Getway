import React, { useEffect, useContext } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Divider } from '@ui-kitten/components';
import Student from '../../assets/student.svg';
import { Avatar, Icon } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';

import { getContacts, onContactsUpdate } from '../../modules/contact/contacts.module';

import ContactsContext from '../../modules/contact/contacts.context';

const Star = ({outline = false, onPress = null}) => (
  <View style={[styles.center]} onPress={onPress}>
    {outline ?
    <Icon
      name={'star'}
      type="font-awesome"
      color="#fad34a"
    />
    : null}
  </View>
)

const MyAvatar = ({ contact, size, color }) => (
  <Avatar
    size={size}
    rounded
    title={contact?.displayName.split(' ').map((name) => name[0]).join('').toUpperCase()}
    activeOpacity={0.7}
    containerStyle={{ alignSelf: 'center', margin: 10, backgroundColor: color }}
  />
)

const Dashboard = (props) => {

  const navigation = useNavigation();
  const contacts = getContacts()

  const { setContacts } = useContext(ContactsContext);
  
  useEffect(() => {
    let mounted = true
    
    if(mounted){
      onContactsUpdate(setContacts);
    }
  
    return () => mounted = false;
  }, []);

  const BigContact = ({contact}) => {
    if(contact == null) {
      return (
        <View style={[styles.container, styles.box, styles.center]}>
          <Text category="s1" style={{ color: '#C1AB9A' }}>Aucun contact</Text>
        </View>
      )
    }
    return (
      <View style={[styles.container, styles.box, styles.center]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Contact', { contact: contact })}
        >
          <MyAvatar contact={contact ? contact: {}} size={'medium'} color={'#F0DFCF'} />
          <Text category="s1" style={{ color: '#C1AB9A', alignSelf: 'center' }}>{contact.displayName}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const FavoriteCard = ({contacts}) => {
    if(!contacts.length) {
      return (
        <View style={styles.center}>
          <View style={[styles.container, styles.long_box]}>
            <Text style={{textAlign: "center"}}>Aucun contact pour l'instant</Text>
          </View>
        </View>
      ) 
    }
  
    const favoritesContacts = contacts.filter(contact => contact.favoris)

    let contactsArr = []
    if(favoritesContacts.length > 1 ) {
      //AFFICHAGE 2 CONTACT FAVORIS
      contactsArr = favoritesContacts.slice(0,2)
    }
    else if(favoritesContacts.length == 1) {
      //AFFICHAGE 1 CONTACT FAVORIS
      contactsArr.push(favoritesContacts[0])
    }
    else if(contacts.length > 1) {
      //AFFICHAGE 2 CONTACTS NON FAVORIS
      contactsArr = contacts.slice(0,2)
    }
    else {
      //AFFICHAGE 1 CONTACT
      contactsArr.push(contacts[0])
    }
    return (
      <View style={styles.center}>
        <View style={[styles.container, styles.long_box]}>
          {contactsArr.map((contact, id) => {
            return (
              <React.Fragment key={id}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Contact', { contact: contact })}
                  style={styles.favoris}
                >
                  <MyAvatar contact={contact} size={'small'} color={'#C1AB9A'} />
                  <View style={styles.icon}>
                    <Text category="s1" style={styles.text}>{contact.displayName}</Text>
                  </View>
                  <Star 
                  outline={contact.favoris}
                  />
                </TouchableOpacity>
                {id < contactsArr.length - 1 ? <Divider/> : null }
              </React.Fragment>
            )
          })}
        </View>
      </View>
    )
  }

  
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.image}>
          <Student height={290} width={250} />
          <Text style={styles.title}>MON ESPACE</Text>
        </View>

        <View style={[{ flexDirection: "row" }, styles.center]}>
          <View style={[styles.container, styles.box, styles.center]} >
            <Text style={styles.number}>{contacts.length}</Text>
            <Text category="s1" style={{ color: "#E46F4C" }}>
              contact{contacts.length > 1 ? "s" : null}
            </Text>
          </View>

          <BigContact contact={contacts.length > 0 ? contacts[contacts.length - 1] : null} />
        </View>

        <FavoriteCard contacts={contacts} />
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  image: {
    alignItems: 'center',
    marginTop: 10
  },
  title: {
    fontWeight: '100',
    fontSize: 24,
    letterSpacing: 8,
    color: '#E46F4C'
  },
  container: {
    padding: 10,
    margin: 13,
    borderRadius: 15,
    shadowColor: "#d9d9d9",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    backgroundColor: 'white',
    elevation: 15,
  },
  box: {
    height: 135,
    width: 135,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  long_box: {
    height: 120,
    width: 300,
  },
  number: {
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    color: '#E46F4C'
  },
  text: {
    color: '#24190F',
    letterSpacing: 2
  },
  icon: {
    flex: 1,
    justifyContent: 'center'
  },
  favoris: {
    flexDirection: "row",
    flex: 1
  }
});

export default Dashboard;
