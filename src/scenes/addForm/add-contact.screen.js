import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text, Layout } from '@ui-kitten/components';

    
const AddContact = () => {
    const [contact, setContact] = useState({
        lastName: "",
        firstName:"",
        phoneNumber: "",
        email: ""
    });
    return (
        
        <Layout style={styles.container}>
             
            <View>
            <Text style={styles.title} category='h3'>Nouveau contact</Text>
                <Input
                    value={contact.name}
                    label="Nom"
                    style={styles.input}
                    onChangeText={ lastName => {
                        const tempContact = { ...contact }
                        tempContact.lasrName = lastName
                        setContact(tempContact);
                    }}
                />
                <Input
                    value={contact.firstName}
                    label="Prénom"
                    style={styles.input}
                    onChangeText={ firstName => {
                        const tempContact = { ...contact }
                        tempContact.firstName = firstName
                        setContact(tempContact);
                    }}
                />
                <Input
                    value={contact.phoneNumber}
                    label="Numéro de téléphone"
                    style={styles.input}
                    onChangeText={ phoneNumber => {
                        const tempContact = { ...contact }
                        tempContact.phoneNumber = phoneNumber
                        setContact(tempContact);
                    }}
                />
                
                    <Input
                        value={contact.email}
                        label="Email"
                        style={styles.input}
                        onChangeText={email => {
                            const tempContact = { ...contact }
                            tempContact.email = email
                            setContact(tempContact);
                        }}
                    />
               
                <Button
                    style={styles.button}
                    onPress={() => console.log(contact)}>
                    Ajouter
                </Button>
            </View>
        </Layout>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center', 
    },
    title:{
        textAlign:'center',
        marginBottom:40,
        letterSpacing:12
    }, 
    input:{
        borderRadius:5,
        marginLeft:20,
        marginRight:20,
        marginBottom:10
    },
    button:{
        padding: 10,
        borderRadius: 5,
        marginTop:20,
        marginRight:20,
        alignSelf:'flex-end'
    },
})

export default AddContact;

