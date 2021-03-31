import React, { useContext } from "react";

import Contacts from 'react-native-contacts';
import ContactsContext from './contacts.context';

export const getContacts = () => {
    const {contacts, setContacts} = useContext(ContactsContext)

    return contacts
}

export const getContactsFromAndroid = (setter, loading) => {
    Contacts.getAll()
        .then((r) => {
            const contacts = r.map((c) => {
                c.description = null
                c.favoris = false
                c.groupes = []
            })
            console.log("LOADED CONTACT FROM CONTEXT", JSON.stringify(r, null, 2))
            loading(false)
            setter(r)
        })
}