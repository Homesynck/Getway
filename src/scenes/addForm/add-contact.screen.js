import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Layout } from '@ui-kitten/components';
import { Icon, Input } from 'react-native-elements'
    
const AddContact = () => {
    const [contact, setContact] = useState({
        lastName: "",
        firstName:"",
        phoneNumber: "",
        email: ""
    });
    return (
        
        <View style={styles.container}>
             <Icon
              name='user-circle'
              type='font-awesome'
              color='#C1AB9A'
              size={50}
              />
            <View>
            <Text style={styles.title} category='h3'>Nouveau contact</Text>
            <View style={{margin:20}}>
                <Input
                    value={contact.name}
                    placeholder="Nom"  
                    style={styles.text}    
                    onChangeText={ lastName => {
                        const tempContact = { ...contact }
                        tempContact.lasrName = lastName
                        setContact(tempContact);
                    }}
                />
                <Input
                    value={contact.firstName}
                    placeholder="Prénom"
                    style={styles.text} 
                    onChangeText={ firstName => {
                        const tempContact = { ...contact }
                        tempContact.firstName = firstName
                        setContact(tempContact);
                    }}
                />
                <Input
                    value={contact.phoneNumber}
                    placeholder="Numéro de téléphone"
                    style={styles.text} 
                    onChangeText={ phoneNumber => {
                        const tempContact = { ...contact }
                        tempContact.phoneNumber = phoneNumber
                        setContact(tempContact);
                    }}
                />
                
                    <Input
                        value={contact.email}
                        placeholder="Email"
                        style={styles.text} 
                        onChangeText={email => {
                            const tempContact = { ...contact }
                            tempContact.email = email
                            setContact(tempContact);
                        }}
                    />
              </View> 
                <Button
                    style={styles.button}
                    onPress={() => console.log(contact)}>
                    <Icon
                    name='plus'
                    type='font-awesome'
                    color='white'
                    size={15}
                    />
                </Button>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center', 
    },
    title:{
        textAlign:'center',
        letterSpacing:3,
        color:'#C1AB9A'
        
    }, 
    text:{
      fontSize:16,
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

