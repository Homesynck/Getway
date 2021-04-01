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

//need to pass: { contacts, setContacts } from useContext(ContactsContext)

export const deleteContactById = (id, contacts, setContacts) => {
  let contactsArr = [...contacts.filter((contact) => contact.id != id)]
  setContacts(contactsArr)
  console.log("DELETED CONTACT ", id)
}

export const addContact = (contact, contacts, setContacts) => {
  contact.id = contacts[contacts.length - 1].id + 1
  contactsArr = [...contacts.push(contact)]
  setContacts(contactsArr)
  console.log("ADDED NEW CONTACT ", contact.id)
}

export const updateContactById = (id, newContact, contacts, setContacts) => {
  contactsArr = [...contacts]
  contactsArr[contactsArr.findIndex(contact => contact.id == id)] = newContact
  setContacts(contactsArr)
  console.log("EDITED CONTACT ", id)
}