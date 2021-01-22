import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';

const Login = ({ onLoginPress }) => {

    return (
        <ScrollView>
            <Text>
                Login
            </Text>

            <TextInput placeholder='Username' />
            <TextInput placeholder='Password' />
            <View style={{ margin: 7 }} />
            <Button
                onPress={onLoginPress}
                title="Submit"
            />
        </ScrollView>
    )
};


export default Login;

