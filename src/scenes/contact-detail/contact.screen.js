import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Avatar,Icon } from "react-native-elements";
import { Divider, TopNavigation, TopNavigationAction, Text} from '@ui-kitten/components';

import { ArrowIosBackIcon } from '../../components/icons';
import { ScrollView } from 'react-native';



const Contact = ({route}) => {
    //TODO useRoute hook here
    const { contact } = route.params;
    const navigation = useNavigation();

    console.log(contact)

    const renderBackAction = () => (
        <TopNavigationAction
          icon={ArrowIosBackIcon}
          onPress={navigation.goBack}
        />
      );

    return (
        
        <ScrollView>
            <SafeAreaView>
                <TopNavigation
                    title={contact.displayName}
                    accessoryLeft={renderBackAction}
                />
                <Divider/>
                
                <View style={[styles.container, {flexDirection:'row',}]} >

                    <View style={[styles.row, {marginLeft:20}, {justifyContent:'center'}]}>
                    <Avatar
                        size="large"
                        rounded
                        title={contact.displayName.split(" ").map((name) =>name[0]).join('').toUpperCase()}
                        activeOpacity={0.7}
                        containerStyle={{backgroundColor: '#C1AB9A'}}
                    />
                    </View>
                    <View style={styles.row}>
                        <Text category='label'>Prénom</Text>
                        <Text category='h6' style={styles.text}>{contact.givenName}</Text>
                        <Text category='label'>N° téléphone</Text>
                        <Text category='h6'>{contact.phoneNumbers[0].number}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text category='label'>Nom</Text>
                        <Text category='h6' style={styles.text}>{contact.familyName}</Text>
                        
                    </View>    
                </View>
                <View style={styles.container}>
                    <Text category='label' style={styles.text}>Description</Text>
                    {/* TODO : récupération description */}
                    <Text>/*ICI LA DESCRIPTION DU CONTACT*/</Text>
                </View>
                <View style={styles.container}>
                    <View style={[styles.row, {flexDirection:'row'}]}>
                         <Icon
                            reverse
                            reverseColor='#C1AB9A'
                            name='envelope'
                            type='font-awesome'
                            color='#F0DFCF'
                            />
                        <View>
                        {contact.emailAddresses.map((mail) => (
                        <View>
                            <Text category='label'>{mail.label} </Text>
                            <Text>{mail.email+'\n'}</Text>
                        </View>
                        ))}
                        </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Icon
                            reverse
                            reverseColor='#C1AB9A'
                            name='map-pin'
                            type='font-awesome'
                            color='#F0DFCF'
                            iconStyle={styles.iconStyle}
                        />
                        <View>
                        {contact.postalAddresses.map((address) => (
                        <View>
                            <Text category='label'>{address.label} </Text>
                            <Text>{address.formattedAddress+'\n'}</Text>
                        </View>
                        ))}
                        </View>
                    </View>
                </View>
                
            </SafeAreaView>
        </ScrollView>

    )
}
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
        shadowOpacity: 0.5,
        shadowRadius: 1,

        elevation: 13,
        backgroundColor:'white'
    },
    row:{
        marginRight:23
    }, 
    text:{
        marginBottom:10
    },
   
  });

export default Contact;
