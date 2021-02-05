import React, { useState } from 'react'
import { SafeAreaView, Text, TextInput, Button, View } from 'react-native';

const RegisterNumber = ({user, update, nextStep}) => {

    const [number, setNumber] = useState("");

    return (
        <View>
            <TextInput
            placeholder='Enter your phone number'
            onChangeText={number => setNumber(number)}
            value={number}
            />
            <Button 
            onPress={() => {
                user.phone = number
                update(user)
                nextStep()
            }}
            title='Register you phone number' 
            />
        </View>
    )
};

const VerifyNumber = ({nextStep}) => {

    const [code, setCode] = useState("");

    return (
        <View>
            <TextInput
            placeholder='Enter you verify code'
            onChangeText={code => setCode(code)}
            value={code}
            />
            <Button 
            onPress={() => nextStep()}
            title='Verify my phone number' 
            />
        </View>
    )
};

const RegisterInformation = ({user, update, nextStep}) => {
    return (
        <View>
            <TextInput
                value={user.username}
                placeholder="Enter an username"
                onChangeText={
                    username => {
                        let tempUser = {...user}
                        tempUser.username = username
                        update(tempUser)
                    }
                }
            />
            <TextInput
                value={user.email}
                placeholder="Enter you email"
                onChangeText={
                    email => {
                        let tempUser = {...user}
                        tempUser.email = email
                        update(tempUser)
                    }
                }
            />
            <View>
                <TextInput
                    value={user.password}
                    placeholder="Enter a password"
                    onChangeText={
                        password => {
                            let tempUser = {...user}
                            tempUser.password = password
                            update(tempUser)
                        }
                    }
                />
                {(user.password.length < 8 && user.password.length > 0) && (
                    <Text>Your password must be at least with 8 characters ...</Text>
                )}
            </View>
            <View>
                <TextInput
                    value={user.password2}
                    placeholder="Retype your password"
                    onChangeText={
                        password2 => {
                            let tempUser = {...user}
                            tempUser.password2 = password2
                            update(tempUser)
                        }
                    }
                />
                {(user.password != user.password2) && (
                    <Text>You have to enter the same password</Text>
                )}
            </View>
            <Button title="Confirm my registration" onPress={() => {
                    nextStep()
                }}
            />
        </View>
    )
};


const Register = () => {

    //Information about the new user
    const [user, setUser] = useState({
        phone: "",
        username: "",
        password: "",
        password2: "",
        email: ""
    });

    const [registerStep, setRegisterStep] = useState(0);

    const handleNextStep = () => {
        setRegisterStep(registerStep + 1)
    }

    const updateUser = (user) => {
        setUser(user)
    }

    const finalizeRegistration = () => {
        console.log(user)
        console.log("Successfully register new user : " + user.username + " " + user.email + " " + user.password)
    }

    const registerStepList = [
        {
            step: <RegisterNumber user={user} update={updateUser} nextStep={handleNextStep} />
        },
        {
            step: <VerifyNumber nextStep={handleNextStep} />
        },
        {
            step: <RegisterInformation user={user} update={updateUser} nextStep={finalizeRegistration} />
        }
    ];

    return (
        <SafeAreaView>
            {registerStepList[registerStep].step}
        </SafeAreaView>
    )
}

export default Register;