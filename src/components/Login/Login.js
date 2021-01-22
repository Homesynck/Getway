import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    Button
} from 'react-native';

import style from './style';

const Login = ({ onLoginPress }) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleUserNameChange = (e) => {
        e.preventDefault();
        setUserName(e.username.value);
    }

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.password.value);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // api call to login (userName, password) => token via SSL
        // if(authored)
        onLoginPress();
    };


    return (
        <SafeAreaView>
            <Text style={style.loginText}>
                Login
            </Text>

            <TextInput
                style={style.input}
                placeholder='Username'
                name='username'
                onChange={e => handleUserNameChange(e)}
                value={userName}
            />
            <TextInput
                style={style.input}
                placeholder='Password'
                name='password'
                onChange={e => handlePasswordChange(e)}
                value={password}
            />
            <View style={{ margin: 7 }} />
            <Button
                onPress={e => handleLogin(e)}
                title="Submit"
            />
        </SafeAreaView>
    )
};


export default Login;

