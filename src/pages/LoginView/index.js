import React, { useState } from 'react';
import { ScrollView, SafeAreaView, StyleSheet, View, Text, TextInput, Button } from 'react-native';

import { Sizing, Typography, Outlines, Colors, Buttons } from "../../styles"

import { login, onPress } from "../../modules";

const Login = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [formState, setFormState] = useState({
        message: '',
        isLoggingIn: false
    });

    const buttonState = formState.isLoggingIn || !username || !password;

    // const handleChange = e => {
    //     console.log(e.target);
    //     setUser({ ...user, [e.target.id]: e.target.value });
    // };

    const handleLogin = e => {
        e.preventDefault();
        const formState_tmp = {
            message: formState.message,
            isLoggingIn: true
        };

        setFormState(formState_tmp);
        console.log("User -> " + username);

        try {
            login(username, password);
            navigation.navigate('Home');
        } catch (error) {
            console.log(error);
            setFormState(...formState, message = error);
        }
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
}

const style = StyleSheet.create({
    contentContainer: {
        padding: Sizing.x20,
    },
    sectionContainer: {
        borderBottomWidth: Outlines.borderWidth.thin,
        borderColor: Colors.neutral.s100,
        paddingBottom: Sizing.x20,
        marginBottom: Sizing.x20,
    },
    container: {
        marginBottom: Sizing.x80,
    },
    headerContainer: {
        marginBottom: Sizing.x20,
        paddingBottom: Sizing.x20,
        borderBottomWidth: Outlines.borderWidth.thin,
        borderColor: Colors.neutral.s100,
    },
    headerText: {
        ...Typography.header.x60,
        marginBottom: Sizing.x10,
    },
    subheaderText: {
        ...Typography.header.x20,
    },
});

export default Login;