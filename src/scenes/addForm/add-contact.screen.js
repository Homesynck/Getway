import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Card, Modal } from '@ui-kitten/components';
import { Icon, Input } from 'react-native-elements'
import ContactsContext from '../../modules/contact/contacts.context'; 
import { addContact } from '../../modules/contact/contacts.module';
    
const AddContact = () => {
    const { contacts, setContacts } = useContext(ContactsContext);
    const [visible, setVisible] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState({
        number: "",
        label: "",
    });
    const [contact, setContact] = useState({
        familyName: "",
        givenName:"",
        displayName:"",
        email: "",
        description: null,
        favoris: false,
        groupes: [],
        postalAddresses:[],
        emailAddresses:[],
    });

    const addNewContact = async () => {
        console.log("Add contact");
        contact.phoneNumbers = [phoneNumber];
        contact.displayName = contact.givenName + " " + contact.familyName;
        const res = await addContact(contact, contacts, setContacts);
        console.log(res);
        setVisible(true)
    }


    return (
        
        <View style={styles.container}>
                <Modal
                    visible={visible}
                    backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                    onBackdropPress={() => setVisible(false)}>
                    <Card disabled={true}>
                    <Text>Contact ajouté avec succès</Text>
                    <Button onPress={() => setVisible(false)}>
                        Ok !
                    </Button>
                    </Card>
                </Modal>
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
                    value={contact.familyName}
                    placeholder="Nom"  
                    style={styles.text}    
                    onChangeText={ familyName => {
                        const tempContact = { ...contact }
                        tempContact.familyName = familyName
                        setContact(tempContact);
                    }}
                />
                <Input
                    value={contact.givenName}
                    placeholder="Prénom"
                    style={styles.text} 
                    onChangeText={ givenName => {
                        const tempContact = { ...contact }
                        tempContact.givenName = givenName
                        setContact(tempContact);
                    }}
                />
                <Input
                    value={phoneNumber.number}
                    placeholder="Numéro de téléphone"
                    style={styles.text} 
                    onChangeText={ number => {
                        const tempPhoneNumber = { ...phoneNumber }
                        tempPhoneNumber.number = number;
                        setPhoneNumber(tempPhoneNumber);
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
                    onPress={addNewContact}>
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

