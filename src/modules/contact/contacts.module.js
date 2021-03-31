import React, { useContext } from "react";

import Contacts from 'react-native-contacts';
import ContactsContext from './contacts.context';

export const getContacts = () => {
  const { contacts, setContacts } = useContext(ContactsContext)

  return contacts
}

export const getContactsFromAndroid = (setter, loading) => {
  Contacts.getAll()
    .then((r) => {
      const contacts = r.map((c, id) => {
        c.id = id
        c.description = null
        c.favoris = false
        c.groupes = []
      })
      console.log("LOADED CONTACT FROM CONTEXT", JSON.stringify(r, null, 2))
      loading(false)
      setter(r)
    })
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