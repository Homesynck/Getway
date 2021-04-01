import React, {useEffect, useState} from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';
import {Text, Divider } from '@ui-kitten/components';
import Student from '../../assets/student.svg';
import { Avatar, Icon } from "react-native-elements";

import { getContacts } from '../../modules/contact/contacts.module';


const Dashboard = ({navigation}) => {

    const contacts = getContacts()

    const MyAvatar = ({i, size, color}) => (
      <Avatar
        size={size}
        rounded
        title={contacts[i].displayName.split(' ').map((name) => name[0]).join('').toUpperCase()}
        activeOpacity={0.7}
        containerStyle={{ alignSelf:'center',margin:10, backgroundColor: color}}
      />
    )

    const Star = () =>(
      <View style={[styles.center]}>
        <Icon
          name='star'
          type='font-awesome'
          color='#fad34a'
        />
      </View>
    )

    return (
            <SafeAreaView>
              <View style={styles.image}>
                   <Student height={290} width={250}/>
                   <Text style={styles.title}>MON DASHBOARD</Text>
                </View>

                <View style={[{flexDirection:'row'}, styles.center] }>
                    <View style={[styles.container, styles.box, styles.center]} >
                        <Text style={styles.number}>{contacts.length}</Text>
                        <Text category='s1' style={{color:'#E46F4C'}}>contacts</Text>
                    </View>
                    
                    <View style={[styles.container, styles.box, styles.center]}>
                      <TouchableOpacity //TODO onPress() 
                      >
                      <MyAvatar i={0} size={'medium'} color={'#F0DFCF'}/>
                      <Text category='s1' style={{color:'#C1AB9A'}}>{contacts[0].displayName}</Text>
                      </TouchableOpacity>
                      </View>
                     
                    
               </View>

                <View style={styles.center}>
                    <View style={[styles.container, styles.long_box]}>
                      <TouchableOpacity 
                        //TODO onPress()
                        style={styles.favoris}
                      >
                        <MyAvatar i={1} size={'small'} color={'#C1AB9A'} />
                        <View style={styles.icon}>
                          <Text category='s1' style={styles.text}>{contacts[1].displayName}</Text>
                        </View>
                          <Star />
                      </TouchableOpacity>
                      <Divider />
                      <TouchableOpacity 
                        //TODO onPress()
                        style={styles.favoris}
                      >
                        <MyAvatar i={2} size={'small'} color={'#C1AB9A'}/>
                        <View style={styles.icon}>
                          <Text category='s1' style={styles.text}>{contacts[2].displayName}</Text>
                        </View>
                        <Star />
                      </TouchableOpacity>
                    </View>
                  </View>
            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    image:{
      alignItems:'center',
      marginTop:10
    },
    title:{
      fontWeight:'100',
      fontSize:24,
      letterSpacing:8,
      color:'#E46F4C'
    },
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
    center:{
      justifyContent:'center', 
      alignItems:'center'
    },
    long_box: {
        height: 120,
        width: 300,
    },
    number: {
        textAlign:'center',
        fontSize:50,
        fontWeight:'bold', 
        color:'#E46F4C'
    },
    text:{
      color:'#24190F', 
      letterSpacing:2
    },
    icon:{
      flex:1,
      justifyContent:'center'
    },
    favoris:{
      flexDirection:"row", 
      flex:1
    }
});

export default Dashboard;
