import React, { useState } from 'react';
import { SafeAreaView, NativeModules } from 'react-native';

import { Button, Input, Icon, Text, Layout } from '@ui-kitten/components';

const { SignIn } = NativeModules;

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

    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async e => {
        e.preventDefault();
        try {
            const res = await SignIn.signIn(username, password);
            console.log(res);
            navigation.navigate("Register");
        } catch (error) {
            console.error(error.message);
            setErrorMessage(error.message);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <Text category='h1'>GETWAY</Text>
                <Text category='s1'>Bon retour parmis nous!</Text>
                <Text category='h5'>{errorMessage}</Text>
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
                    onPress={e => handleLogin(e)}
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