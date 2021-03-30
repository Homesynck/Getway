import React, {useEffect, useState} from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';
import { Icon, Text } from '@ui-kitten/components';
import Student from '../../assets/student.svg';
import { Avatar } from "react-native-elements";

import { getContacts } from '../../modules/contact/contacts.module';

const Dashboard = ({navigation}) => {

    const contacts = getContacts()

    return (
            <SafeAreaView>
                <View style={{alignItems:'center', marginTop:10}}>
                   <Student height={290} width={250}/>
                   <Text category='h2' style={styles.text}>Mon Dashboard</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <View style={[styles.container, styles.box, {justifyContent:'center', alignItems:'center'}]} >
                        <Text style={styles.number}>{contacts.length}</Text>
                        <Text category='s1' style={{color:'#E46F4C'}}>contacts</Text>
                    </View>
                    <TouchableOpacity  style={[styles.container, styles.box]}>
                        <Avatar
                        size="large"
                        rounded
                        title={contacts[0].displayName.split(" ").map((name) => name[0]).join('').toUpperCase()}
                        activeOpacity={0.7}
                        containerStyle={{ backgroundColor: '#F0DFCF' }}
                        /> 
                        <View>
                            <Text>{contacts[0].displayName}</Text>
                            <Text>{contacts[0].phoneNumbers[0].number}</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                    <View style={{justifyContent:'center', alignSelf:'center'}}>
                    <View style={[styles.container, styles.long_box]}>
                    </View>
                </View>
            </SafeAreaView>
    )
}
                    {/* <TouchableOpacity 
                        style={[styles.card, styles.contactListCard]} 
                        onPress={() => navigation.navigate('Contacts')}>
                    </TouchableOpacity> */}
const styles = StyleSheet.create({
    container:{
        padding:10,
        margin:13,
        borderRadius:15,
        shadowColor: "#d9d9d9",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        backgroundColor:'white',
        elevation: 15,
        
    },
    box: {
        height: 135,
        width: 135,
    },
    long_box: {
        height: 120,
        width: 300,
    },
    text:{
        
        letterSpacing:8,
        color:'#C1AB9A'
    },
    number: {
        textAlign:'center',
        fontSize:50,
        fontWeight:'bold', 
        color:'#E46F4C'
    }
});

export default Dashboard;
