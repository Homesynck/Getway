import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {Input,Text, Layout, Button, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import Error from '../../assets/error.svg';
import { SafeAreaView } from 'react-native';
import { ArrowIosBackIcon } from '../../components/icons';
import { useNavigation } from '@react-navigation/native';
const ForgotPassword = (onPressForgotPassword) => {

    const [username, setUsername] = useState('');

    const [formState, setFormState] = useState({
        message: '',
        isLoggingIn: false
    });

    const navigation = useNavigation();
    const renderBackAction = () => (
        <TopNavigationAction
          icon={ArrowIosBackIcon}
          onPress={navigation.goBack}
        />
      );
    return (
        <SafeAreaView>
            <TopNavigation
            accessoryLeft={renderBackAction}
            />
            <View style={{alignSelf : 'center'}}>
            <Error height={350} width={270}/>
            </View>
        </SafeAreaView>
        // <Layout>
        //     <View>
        //         <Text category='h3' style={styles.title}>
        //             Mot de pass oublié
        //         </Text>
        //         <Input
        //             placeholder='Username'
        //             onChangeText={(username => setUsername(username))}
        //             value={username}
        //         />
        //         <Button
        //             onPress={e => handleForgotPassword(e)}
        //             style={styles.button}
        //         // disabled={buttonState}
        //         >
        //             Valider
        //         </Button>
        //     </View>
        // </Layout>

    )
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center', 
        padding:20,
        justifyContent:'center',
    },
    title: {
      textAlign:'center',
      marginBottom:10,
    },
    button:{
        padding: 10,
        borderRadius: 60,
        marginTop:10,
    },
})


export default ForgotPassword;
