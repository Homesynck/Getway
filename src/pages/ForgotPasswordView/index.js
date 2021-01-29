import React, { useState } from 'react';
import { View, SafeAreaView, Text, TextInput, Button } from 'react-native';

const ForgotPassword = (onPressForgotPassword) => {

    const [username, setUsername] = useState('');

    const [formState, setFormState] = useState({
        message: '',
        isLoggingIn: false
    });

<<<<<<< HEAD
=======
    // const buttonState = formState.isLoggingIn || !user.username || !user.password;

    // const handleChange = e => {
    //     console.log(e.target);
    //     setUser({ ...user, [e.target.id]: e.target.value });
    // };

>>>>>>> d0d8259d02d172ae62b619e5c34f5beff9976be8
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
