import { useContext } from "react";
import { NativeModules, NativeEventEmitter } from 'react-native';

import Contacts from 'react-native-contacts';
import ContactsContext from './contacts.context';

const { FileSync } = NativeModules;

export const getContacts = () => {
  const { contacts } = useContext(ContactsContext)

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

export const syncContactsFromAndroid = async (setContacts) => {
  const contactList = await getContactsFromAndroid();
  setContacts(contactList);
  await FileSync.openDirectory();
  FileSync.setOnUpdate();
  await FileSync.startSyncing();
  const syncData = await FileSync.syncData(contactList);
  console.log("Data sync: ", syncData);
}

//need to pass: { contacts, setContacts } from useContext(ContactsContext)

export const deleteContactById = async (id, contacts, setContacts) => {
  const contact = contacts.find(contact => contact.id == id );
  try {
    const deletedRes = await FileSync.deleteFile(contact);
    console.log(deletedRes);
    const newContactsList = await FileSync.getData();
    console.log(newContactsList);
    setContacts(newContactsList)
    console.log("DELETED CONTACT ", id);
  } catch (error) {
    console.error(error.message);
  }
  
}

export const addContact = async (contact, contacts, setContacts) => {
  contact.id = contacts[contacts.length - 1].id + 1
  contact.recordID = Math.floor(Math.random() * (9999999 - 10000) + 10000) + "";
  try {
    const addedContact = await FileSync.editFile(contact);
    console.log("New contact: ", addedContact);
    // get the new data
    const newContactsList = await FileSync.getData();
    console.log(newContactsList);

    setContacts(newContactsList);
    console.log("ADDED NEW CONTACT ", contact.id)
  } catch (error) {
    console.error(error.message);
  }
  
}

export const updateContactById = async (id, newContact, setContacts) => {
  try {
    const addedContact = await FileSync.editFile(newContact);
    console.log("New contact: ", addedContact);
    // get the new data
    const newContactsList = await FileSync.getData();
    console.log(newContactsList);

    setContacts(newContactsList);
    console.log("EDITED CONTACT ", id)
  } catch (error) {
    console.error(error.message);
  }
  
}

export const getContactById = (id, contacts) => {
  return contacts.find(contact => contact.id == id)
}

export const getData = async (setContacts) => {
  const newContactsList = await FileSync.getData();
  console.log(newContactsList);
  setContacts(newContactsList);
}

export const onContactsUpdate = (setContacts) => {
  const eventEmitter = new NativeEventEmitter(FileSync);

  eventEmitter.addListener('NewUpdate', async () => {
    try {
        console.log("Update");
        await getData(setContacts);
    } catch (error) {
        console.error(error.message);
    }
  });
}