import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { Button, Input, Text, Layout } from '@ui-kitten/components';

import LoginButton from '../../modules/authentication/loginButton.consumer';

const Login = ({navigation}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <Text style={styles.getwayTitle} category='h1'>GETWAY</Text>
                <Text style={styles.subtitle} category='s1'>Bon retour parmis nous!</Text>
                <Text category='h5'>{errorMessage}</Text>
                <Input
                    placeholder='Identifiant'
                    onChangeText={(username => setUsername(username))}
                    value={username}
                    style={styles.input}
                />
                <Input
                    placeholder='Mot de passe'
                    onChangeText={password => setPassword(password)}
                    style={styles.input}
                />
                <LoginButton 
                    style={styles.button}
                    user={{username, password}}
                    fallback={setErrorMessage}/>
                <Button
                    onPress={() => navigation.navigate('Register')}
                    style={styles.button}>
                    Inscription
                </Button>
            </Layout>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    getwayTitle: {
      letterSpacing: 20, 
      fontWeight:'bold'
    },
    subtitle:{
        marginBottom:20,
    },
    input:{
        borderRadius:30,
        marginLeft:50,
        marginRight:50,
        marginBottom:10
    },
    button:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 60,
        marginTop:10,
    },
  });

export default Login;