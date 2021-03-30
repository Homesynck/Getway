import React, {useEffect} from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';
import { Icon, Text } from '@ui-kitten/components';
import Student from '../../assets/student.svg'


const Dashboard = ({navigation}) => {
    const getAllContacts = async () => {
        const contacts = await Contacts.getAll();
        //console.log(contacts.length + " contacts : " + contacts.map((contact) => contact.displayName).join(', '));
        setContactsData(contacts);
    }

    useEffect(() => {
        getAllContacts();
    },[]);
    return (
            <SafeAreaView>
                <View style={{alignItems:'center', marginTop:10}}>
                   <Student height={290} width={250}/>
                   <Text category='h2' style={styles.text}>Mon Dashboard</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <View style={[styles.container, styles.box]} >
                        {contacts.length}
                    </View>
                    <TouchableOpacity  style={[styles.container, styles.box]}>
                        <View>
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
        color:'#E46F4C'
    }
});

export default Dashboard;
