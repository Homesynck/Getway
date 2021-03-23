import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Input, Text } from '@ui-kitten/components';

const AddContact = () => {
    const [contact, setContact] = useState({
        name: "",
        phoneNumber: "",
        email: ""
    });

    return (
        <View>
            <Text category='h3'>Here is the add contact view</Text>
            <Input
                value={contact.name}
                placeholder="Name"
                onChangeText={ name => {
                    const tempContact = { ...contact }
                    tempContact.name = name
                    setContact(tempContact);
                }}
            />
            <Input
                value={contact.phoneNumber}
                placeholder="Phone number"
                onChangeText={ phoneNumber => {
                    const tempContact = { ...contact }
                    tempContact.phoneNumber = phoneNumber
                    setContact(tempContact);
                }}
            />
            <View>
                <Input
                    value={contact.email}
                    placeholder="Email"
                    onChangeText={email => {
                        const tempContact = { ...contact }
                        tempContact.email = email
                        setContact(tempContact);
                    }}
                />
            </View>
            <Button
                onPress={() => console.log(contact)}>
                Add
            </Button>
        </View>
    )
}

export default AddContact;

