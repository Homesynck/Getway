import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

import { Button, Input, Icon, Text, Layout } from '@ui-kitten/components';

import { login } from "../../modules";

const NextArrowIcon = (props) => (
    <Icon name='arrow-forward' {...props} />
);

const NextButton = ({ onPress, title }) => (
    <Button accessoryRight={NextArrowIcon} onPress={onPress}>
        {title}
    </Button>
);

const Login = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [formState, setFormState] = useState({
        message: '',
        isLoggingIn: false
    });

    const buttonState = formState.isLoggingIn || !username || !password;

    const handleLogin = e => {
        e.preventDefault();
        const formState_tmp = {
            message: formState.message,
            isLoggingIn: true
        };

        setFormState(formState_tmp);

        login(username, password)
            .then(() => {
                navigation.navigate('Home');
            })
            .catch(error => {
                console.log(error.message);
                setFormState(...formState, message = error.message);
            });
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <Text category='h1'>GETWAY</Text>
                <Text category='s1'>Bon retour parmis nous!</Text>

                <Input
                    placeholder='Identifiant'
                    onChangeText={(username => setUsername(username))}
                    value={username}
                />
                <Input
                    placeholder='Mot de passe'
                    onChangeText={password => setPassword(password)}
                />
                <NextButton
                    // onPress={e => handleLogin(e)}
                    onPress={() => navigation.navigate('Home')}
                    title='Connexion'
                // disabled={buttonState}
                />
                <NextButton
                    onPress={() => navigation.navigate('Register')}
                    title='Inscription'
                />
            </Layout>
        </SafeAreaView>
    )
}

export default Login;