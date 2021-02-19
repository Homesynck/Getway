import React, { useState } from 'react';
import { View, SafeAreaView, Text, TextInput, Button } from 'react-native';

const ForgotPassword = (onPressForgotPassword) => {

    const [username, setUsername] = useState('');

    const [formState, setFormState] = useState({
        message: '',
        isLoggingIn: false
    });

    return (
        <SafeAreaView>
            <View>
                <Text>
                    Forgot Password Page
                </Text>
                <TextInput
                    placeholder='Username'
                    onChangeText={(username => setUsername(username))}
                    value={username}
                />
                <Button
                    onPress={e => handleForgotPassword(e)}
                    title='Reset password'
                // disabled={buttonState}
                />
            </View>
        </SafeAreaView>

    )
}

export default ForgotPassword;
