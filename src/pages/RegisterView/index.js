import React, { useState } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native';

import { Button, Input, Text } from '@ui-kitten/components';

import { registration, sendPhoneNumber, verifyNumberWithCode } from '../../modules/index';

const RegisterNumber = ({ user, update, nextStep }) => {

    const [number, setNumber] = useState("");

    const handleRegistrationNumber = e => {
        e.preventDefault();
        sendPhoneNumber(number)
            .then(() => {
                console.log("It's work");
                user.phone = number;
                update(user);
                nextStep();
            })
            .catch(error => {
                console.log("ERROR");
                console.log(error.message);
            });
    };

    return (
        <ScrollView>
            <View>
                <Text category='h3'>Vérification du numéro de téléphone</Text>
                <Text category='s1'>Nous vous enverrons un code!</Text>
            </View>
            <View>
                <Input
                    placeholder='Numéro de téléphone'
                    onChangeText={number => setNumber(number)}
                    value={number}
                />
                <Button
                    onPress={handleRegistrationNumber}>
                    Valider
                </Button>
            </View>
        </ScrollView>
    )
};

const VerifyNumber = ({ nextStep }) => {

    const [code, setCode] = useState("");

    const handleVerifyNumber = e => {
        e.preventDefault();
        verifyNumberWithCode(code)
            .then(() => {
                nextStep();
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    return (
        <View>
            <Input
                placeholder='----'
                onChangeText={code => setCode(code)}
                value={code}
            />
            <Button
                onPress={handleVerifyNumber}>
                Vérifier mon numéro
            </Button>
        </View>
    )
};

const RegisterInformation = ({ user, update, nextStep }) => {

    const handleRegistration = e => {
        e.preventDefault();
        registration(user)
            .then(() => {
                nextStep();
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    return (
        <View>
            <Text category='h3'>INSCRIPTION</Text>
            <Input
                value={user.username}
                placeholder="Identifiant"
                onChangeText={
                    username => {
                        let tempUser = { ...user }
                        tempUser.username = username
                        update(tempUser)
                    }
                }
            />
            <Input
                value={user.email}
                placeholder="Email"
                onChangeText={
                    email => {
                        let tempUser = { ...user }
                        tempUser.email = email
                        update(tempUser)
                    }
                }
            />
            <View>
                <Input
                    value={user.password}
                    placeholder="Mot de passe"
                    onChangeText={
                        password => {
                            let tempUser = { ...user }
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
                <Input
                    value={user.password2}
                    placeholder="Confirmation du mot de passe"
                    onChangeText={
                        password2 => {
                            let tempUser = { ...user }
                            tempUser.password2 = password2
                            update(tempUser)
                        }
                    }
                />
                {(user.password != user.password2) && (
                    <Text>You have to enter the same password</Text>
                )}
            </View>
            <Button
                onPress={handleRegistration}>
                Valider
            </Button>
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
        setUser(user);
    }

    const finalizeRegistration = () => {
        console.log(user)
        console.log("Successfully register new user : ", user.username, " ", user.email, " ", user.password)
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