import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

const Contact = ({route}) => {
    //TODO useRoute hook here
    const { contact } = route.params;

    return (
        <SafeAreaView>
            <View>
                <Text>This is the contact view</Text>
                <View>
                    <Text>ID: {contact.id}</Text>
                    <Text>NAME: {contact.name}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Contact;
