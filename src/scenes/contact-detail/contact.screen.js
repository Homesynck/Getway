import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Avatar, Icon } from "react-native-elements";
import { Divider, TopNavigation, TopNavigationAction, Text } from '@ui-kitten/components';

import { ArrowIosBackIcon, EditIcon, Checkmark, CloseIcon, StarOutlineIcon, StarIcon } from '../../components/icons';

import ContactsContext from '../../modules/contact/contacts.context';
import { updateContactById, getContactById } from '../../modules/contact/contacts.module';

const Contact = ({ route }) => {
  const { contacts, setContacts } = useContext(ContactsContext)

  //TODO useRoute hook here
  let contact = getContactById((route.params).contact.id, contacts);

  const navigation = useNavigation();

  const [ isEditing, setEditor ] = useState(false) 

  const [ isFavoris, setFavoris] = useState(contact.favoris)
  
  const editContact = (c) => contact = c

  const ContactProp = ({str, title, onChange = null}) => {
  
    if(isEditing)
      return (
        <>
          <Text category='label'>{title}</Text>
          <TextInput 
          style={{color:'#a0a0a0'}}
          onChangeText={onChange}>
            {str}
          </TextInput>
        </>
      )

    if(!str)
      return null;
    
    return (
      <>
        <Text category='label'>{title}</Text>
        <Text category='h6' style={styles.text}>{str}</Text>
      </>
    )
  }

  const ContactInfoCard = ({contact}) => (
    <View style={[styles.container, { flexDirection: 'row', }]} >
      <View style={[styles.row, { marginLeft: 20 }, { justifyContent: 'center' }]}>
        <Avatar
          size="large"
          rounded
          title={contact.displayName.split(" ").map((name) => name[0]).join('').toUpperCase()}
          activeOpacity={0.7}
          containerStyle={{ backgroundColor: '#C1AB9A' }}/>
      </View>

      <View style={styles.row}>
        <ContactProp 
        str={contact.givenName}
        title={'Prénom'}
        onChange={ prop => {
          let tempContact = { ...contact }
          tempContact.givenName = prop
          editContact(tempContact)
        }}/>

        <ContactProp 
        str={contact.phoneNumbers.length > 0 ? contact.phoneNumbers[0].number : ''} 
        title={'N° téléphone'}
        onChange={ prop => {
          let tempContact = { ...contact }
          tempContact.phoneNumbers[0] = {number: prop}
          console.log(tempContact);
          editContact(tempContact)
        }}/>

      </View>

      <View style={styles.row}>
        <ContactProp 
        str={contact.familyName} 
        title={'Nom'}
        onChange={ prop => {
          let tempContact = { ...contact }
          tempContact.familyName = prop
          editContact(tempContact)
        }}/>
      </View>

    </View>
  )

  const ContactDescriptionCard = ({contact}) => {
    if(isEditing)
      return (
        <View style={styles.container}>
          <Text category='label' style={styles.text}>Description</Text>
          <TextInput 
          style={{color:'#a0a0a0'}}
          onChangeText={ prop => {
            let tempContact = { ...contact }
            tempContact.description = prop
            editContact(tempContact)
          }}>
            {contact.description}
          </TextInput>
        </View>
      )

    if(!contact.description)
      return null
    
    return (
      <View style={styles.container}>
        <Text category='label' style={styles.text}>Description</Text>
        <Text>{contact.description}</Text>
      </View>
    )
  }

  const ContactInfo = ({str, title, onChange}) => {
    if(isEditing)
      return (
        <>
          <Text category='label'>{title}</Text>
          <TextInput 
          style={{color:'#a0a0a0', marginBottom: 3}}
          onChangeText={onChange}>
            {str}
          </TextInput>
        </>
      )

    if(!str)
      return null;
    
    return (
      <>
        <Text category='label'>{title}</Text>
        <Text style={{marginBottom: 3}}>{str}</Text>
      </>
    )
  }

  const MailsAdress = ({list, hasNext}) => {    
    if(list.length == 0 && !isEditing)
      return null

    return (
      <>
        <View style={[styles.row, { flexDirection: 'row', marginBottom: 10}]}>
          <View style={styles.icon}>
            <Icon
              reverse
              reverseColor='#C1AB9A'
              name='envelope'
              type='font-awesome'
              color='#F0DFCF'
              style={{alignSelf: 'flex-end'}}
            />
          </View>
          <View>
            {list.map((mail, id) => (
              <View key={id} style={{justifyContent:'center', flex:1}}>
                <ContactInfo 
                title={mail.label} 
                str={mail.email}
                onChange={ prop => {
                  let tempContact = { ...contact }
                  tempContact.emailAddresses[id].email = prop
                  editContact(tempContact)
                }}/>
              </View>
              ))}
            { isEditing ? 
              <View style={{justifyContent:'center', flex:1}}>
                <TextInput 
                placeholder={"mail adress"} 
                style={{color:'#a0a0a0'}} 
                onChangeText={ prop => {
                  let tempContact = { ...contact }
                  tempContact.emailAddresses.push({email: prop, label: 'Home'})
                  editContact(tempContact)
                }}/>
              </View>
            : null}
          </View>
          
        </View>
        {(hasNext || isEditing) ? <Divider style={{marginBottom: 10}}/> : null}
      </>
    )
  }

  const ContactAdress = ({list, hasNext}) => {
    if(list.length == 0 && !isEditing)
      return null

    return (
      <>
      <View style={[styles.row, { flexDirection: 'row', marginBottom: 10}]}>
        <View style={styles.icon}>
          <Icon
            reverse
            reverseColor='#C1AB9A'
            name='map-pin'
            type='font-awesome'
            color='#F0DFCF'
            iconStyle={styles.iconStyle}
          />
          </View>
          <View>
            {list.map((address, id) => (
              <View key={id} style={{justifyContent:'center', flex:1}}>
                <ContactInfo title={address.label} str={address.formattedAddress}/>
              </View>
            ))}
            { isEditing ? 
              <View style={{justifyContent:'center', flex:1}}>
                <TextInput placeholder={"adress"} style={{color:'#a0a0a0'}} />
              </View>
            : null}
          </View>
        </View>
        {hasNext ? <Divider style={{marginBottom: 10}}/> : null}
      </>
    )
  }

  const AdditionalPhoneNumbers = ({list, hasNext}) => {
    console.log(list);
    if(list.length < 2 && !isEditing)
      return null

    list.shift()

    return (
      <>
      <View style={[styles.row, { flexDirection: 'row', marginBottom: 10}]}>
        <View style={styles.icon}>
          <Icon
            reverse
            reverseColor='#C1AB9A'
            name='phone'
            type='font-awesome'
            color='#F0DFCF'
            iconStyle={styles.iconStyle}
          />
          </View>
          <View>
            {list.map((phone, id) => (
              <View key={id} style={{justifyContent:'center', flex:1}}>
                <ContactInfo title={phone.label} str={phone.number}/>
              </View>
            ))}
            { isEditing ? 
              <View style={{justifyContent:'center', flex:1}}>
                <TextInput placeholder={"phone number"} style={{color:'#a0a0a0'}} />
              </View>
            : null}
          </View>
        </View>
        {(hasNext || isEditing) ? <Divider style={{marginBottom: 10}}/> : null}
      </>
    )
  }

  const ContactAllInformations = ({contact}) => {
    let conditions = [
      contact.phoneNumbers.length >= 2,
      contact.emailAddresses.length > 0,
      contact.postalAddresses.length > 0
    ]

    if(!(conditions.includes(true)) && !isEditing)
      return null

    return (
      <View style={styles.container}>

        <AdditionalPhoneNumbers list={contact.phoneNumbers}  hasNext={conditions.slice(1).includes(true)} />
        <MailsAdress list={contact.emailAddresses} hasNext={conditions.slice(2).includes(true)} />
        <ContactAdress list={contact.postalAddresses} />

      </View>
    )
  }

  const renderBackAction = () => (
    <TopNavigationAction
      icon={isEditing ? CloseIcon : ArrowIosBackIcon}
      onPress={() => {
        if(isEditing) {
          setEditor(false)
          contact = getContactById((route.params).contact.id, contacts)
        }
        else
          navigation.goBack()
      }}
    />
  );

  const renderRightActions = () => (

    <React.Fragment>
      <TopNavigationAction 
      icon={isFavoris? StarIcon : StarOutlineIcon}
      onPress={() => {
        if(isFavoris){
          //TODO Changement d'état
          contact.favoris = false
          updateContactById(contact.id, contact, setContacts)
        }else{
          contact.favoris = true
          updateContactById(contact.id, contact, setContacts)
        }
        setFavoris(!isFavoris)
      }}/>
      <TopNavigationAction 
      icon={isEditing ? Checkmark : EditIcon}
      onPress={() => {
        if(isEditing) {
          updateContactById(contact.id, contact, setContacts)
        }
        setEditor(!isEditing)
      }}
      />
    </React.Fragment>
  );

  return (

    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <SafeAreaView>
        <TopNavigation
          title={contact.displayName}
          accessoryLeft={renderBackAction}
          accessoryRight={renderRightActions}
        />
        <Divider />
        <View >

          <ContactInfoCard contact={contact}/>

          <ContactDescriptionCard contact={contact} />

          <ContactAllInformations contact={contact} />

        </View>
      </SafeAreaView>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 13,
    borderRadius: 15,
    shadowColor: "#d9d9d9",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,

    elevation: 13,
    backgroundColor: 'white'
  },
  row: {
    marginRight: 23
  },
  text: {
    marginBottom: 10
  },
  icon:{
    justifyContent:'center', 
    marginRight:10
  }

});

export default Contact;
