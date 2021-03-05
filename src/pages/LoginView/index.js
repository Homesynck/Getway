import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button } from 'react-native';

import { style } from "./style.js";

import { login } from "../../modules";

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
        <ScrollView contentContainerStyle={style.contentContainer}>
            <View style={style.sectionContainer}>
                <View style={style.container}>
                    <View style={style.headerContainer}>
                        <Text style={style.headerText}>
                            Getway
                            </Text>
                        <Text style={style.subheaderText}>
                            Sign in to your account
                            </Text>
                    </View>
                </View>
            </View>
            <View style={style.sectionContainer}>
                <TextInput
                    placeholder='Username'
                    onChangeText={(username => setUsername(username))}
                    value={username}
                />
                <TextInput
                    placeholder='Password'
                    onChangeText={password => setPassword(password)}
                />
                <Button
                    onPress={e => handleLogin(e)}
                    title='Login'
                // disabled={buttonState}
                />
                <Button
                    onPress={() => navigation.navigate('Register')}
                    title='Sign Up'
                />
            </View>
        </ScrollView>
    )
};

export default Login;