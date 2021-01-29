import React, { useState } from 'react';
import { View, SafeAreaView, Text, TextInput, Button } from 'react-native';

const Login = (onPressLogin) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [formState, setFormState] = useState({
        message: '',
        isLoggingIn: false
    });

    // const buttonState = formState.isLoggingIn || !user.username || !user.password;

    // const handleChange = e => {
    //     console.log(e.target);
    //     setUser({ ...user, [e.target.id]: e.target.value });
    // };

    const handleLogin = e => {
        e.preventDefault();
        console.log("User" + username);
    }

    return (
        <SafeAreaView>
            <View>
                <Text>
                    Login page
                </Text>
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
                <Button title='Sign Up' />
            </View>
        </SafeAreaView>

    )
}

export default Login;
