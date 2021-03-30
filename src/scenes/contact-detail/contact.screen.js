import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Avatar, Icon } from "react-native-elements";
import { Divider, TopNavigation, TopNavigationAction, Text, Layout } from '@ui-kitten/components';

import { ArrowIosBackIcon } from '../../components/icons';
import { ScrollView } from 'react-native';

const Contact = ({ route }) => {
  //TODO useRoute hook here
  const { contact } = route.params;
  const navigation = useNavigation();

  const renderBackAction = () => (
    <TopNavigationAction
      icon={ArrowIosBackIcon}
      onPress={navigation.goBack}
    />
  );

  const ContactProp = ({str, title}) => {
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
        <ContactProp str={contact.givenName} title={'Prénom'}/>
        {/* <Text category='label'>N° téléphone</Text>
        <Text category='h6'>{phoneNumber}</Text> */}
        <ContactProp str={contact.phoneNumbers.length > 0 ? contact.phoneNumbers[0].number : ''} title={'N° téléphone'}/>
      </View>

      <View style={styles.row}>
        <ContactProp str={contact.familyName} title={'Nom'}/>
      </View>

    </View>
  )

  const ContactDescriptionCard = ({contact}) => (
    <View style={styles.container}>
      <Text category='label' style={styles.text}>Description</Text>
      {/* <Text>{contact.memo}</Text> */}
      <Text>DESCRIPTION ICI</Text>
  </View>
  )

  const MailsAdress = ({list, hasNext}) => {
    if(list.length == 0)
      return null

    return (
      <>
        <View style={[styles.row, { flexDirection: 'row', marginBottom: 10}]}>
          <View>
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
              <View key={id}>
                <Text category='label'>{mail.label}</Text>
                <Text style={{marginBottom: 3}}>{mail.email}</Text>
              </View>
              ))}
          </View>
          
        </View>
        {hasNext ? <Divider style={{marginBottom: 10}}/> : null}
      </>
    )
  }

  const ContactAdress = ({list, hasNext}) => {
    if(list.length == 0)
      return null

    return (
      <>
        <View style={{ flexDirection: 'row' }}>
          <Icon
            reverse
            reverseColor='#C1AB9A'
            name='map-pin'
            type='font-awesome'
            color='#F0DFCF'
            iconStyle={styles.iconStyle}
          />
          <View>
            {list.map((address, id) => (
              <View key={id}>
                <Text category='label'>{address.label}</Text>
                <Text style={{marginBottom: 3}}>{address.formattedAddress}</Text>
              </View>
            ))}
          </View>
        </View>
        {hasNext ? <Divider style={{marginBottom: 10}}/> : null}
      </>
    )
  }

  const AdditionalPhoneNumbers = ({list, hasNext}) => {
    if(list.length < 2)
      return null

    list.shift()

    return (
      <>
        <View style={{ flexDirection: 'row' }}>
          <Icon
            reverse
            reverseColor='#C1AB9A'
            name='phone'
            type='font-awesome'
            color='#F0DFCF'
            iconStyle={styles.iconStyle}
          />
          <View>
            {list.map((phone, id) => (
              <View key={id}>
                <Text category='label'>{phone.label}</Text>
                <Text style={{marginBottom: 3}}>{phone.number}</Text>
              </View>
            ))}
          </View>
        </View>
        {hasNext ? <Divider style={{marginBottom: 10}}/> : null}
      </>
    )
  }

  const ContactAllInformations = ({contact}) => {
    let checker = arr => arr.every(Boolean);
    console.log(contact)
    let conditions = [
      contact.phoneNumbers.length >= 2,
      contact.emailAddresses.length > 0,
      contact.postalAddresses.length > 0
    ]

    console.log(conditions)

    if(!(conditions.includes(true)))
      return null

    return (
      <View style={styles.container}>

        <AdditionalPhoneNumbers list={contact.phoneNumbers}  hasNext={conditions.slice(1).includes(true)} />
        <MailsAdress list={contact.emailAddresses} hasNext={conditions.slice(2).includes(true)} />
        <ContactAdress list={contact.postalAddresses} />

      </View>
    )
  }

  return (

    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <SafeAreaView>
        <TopNavigation
          title={contact.displayName}
          accessoryLeft={renderBackAction}
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

});

export default Contact;
