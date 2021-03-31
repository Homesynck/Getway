import React, { useContext } from "react";

import { Text } from 'react-native';

import Contacts from 'react-native-contacts';
import ContactsContext from './contacts.context';

export const getContacts = () => {
  const { contacts, setContacts } = useContext(ContactsContext)

  return contacts
}

export const getContactsFromAndroid = async() => {
  let imported = await Contacts.getAll()
  imported = imported.map((c, id) => ({
      ...c,
      id: id,
      description: null,
      favoris: false,
      groupes: []
    })
  )

  return imported
}

export const deleteContactById = (id) => {
  const { contacts, setContacts } = useContext(ContactsContext)
  // contactsArr = [...contacts.filter((contact) => contact.id != id)]
  // setContacts(contactsArr)
  console.log("DELETED CONTACT ", id)
}

export const addContact = (contact) => {
  const { contacts, setContacts } = useContext(ContactsContext)
  contactsArr = [...contacts.push(contact)]
  setContacts(contactsArr)
}

export const updateContactById = (id, newContact) => {
  const { contacts, setContacts } = useContext(ContactsContext)
  
  contactsArr = [...contacts]
  contactsArr[contactsArr.findIndex(contact => contact.id == id)] = newContact
  setContacts(contactsArr)
}