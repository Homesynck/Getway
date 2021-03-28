import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {Input, Text, Layout, Modal, Card, Button } from '@ui-kitten/components';
import Logo from '../../assets/logo.svg';

import LoginButton from '../../modules/authentication/loginButton.consumer';
import { endAsyncEvent } from 'react-native/Libraries/Performance/Systrace';

const Login = (props) => {
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [visible, setVisible] = useState(false);

    const setError = (error) => {
        setErrorMessage(error)
        setVisible(true)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={styles.container}>

            <Modal 
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}>
                <Card disabled={true}>
                    <Text category='h6' style={{margin: 5}}>{errorMessage}</Text>
                    <Button 
                    size='small'
                    appearance='outline'
                    onPress={() => setVisible(false)}
                    style={{margin: 5}}>
                        Ok
                    </Button>
                </Card>
            </Modal>

                <Logo height={100} width={100} />

                <Text style={styles.getwayTitle} category='h1'>GETWAY</Text>
                <Text style={styles.subtitle} category='s1'>Bon retour parmis nous!</Text>

                <Input
                    placeholder='Identifiant'
                    onChangeText={(username => setUsername(username))}
                    value={username}
                    style={styles.input}
                />
                <Input
                    placeholder='Mot de passe'
                    secureTextEntry={true}
                    onChangeText={password => setPassword(password)}
                    style={styles.input}
                />
                <TouchableOpacity 
                    style={{alignSelf: 'flex-end', marginRight: '15%', marginBottom: '5%'}}
                    onPress={() => navigation.navigate('ForgotPassword')}>
                    <View style={styles.link}>
                        <Text category='p2' appearance='hint'>
                            Mot de passe oublié ?
                        </Text>
                    </View>
                </TouchableOpacity>
                <LoginButton 
                    style={styles.button}
                    user={{username, password}}
                    fallback={setError}/>
            </Layout>
            <Layout style={{
                elevation: 0,
                flex: 1, 
                justifyContent: 'center', 
                alignItems: 'center'}
                }>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                    style={styles.button}>
                    <View>
                        <Text category='s2'>
                            Vous n'avez toujours pas de compte ? Inscrivez-vous !
                        </Text>
                    </View>
                </TouchableOpacity>
            </Layout>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 7, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    getwayTitle: {
      marginTop: 15,
      letterSpacing: 20, 
      fontWeight:'bold'
    },
    subtitle:{
        marginBottom:20
    },
    input:{
        borderRadius:30,
        marginLeft:50,
        marginRight:50,
        marginTop:30
    },
    button:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 60,
        marginTop:10
    },
    link: {
        //marginBottom: 30,
        alignItems: 'flex-end',
        backgroundColor: 'transparent'
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    }

  });

export default Login;