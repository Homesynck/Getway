import React, { useState } from 'react'
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';

import { Button, Input, Text, Layout } from '@ui-kitten/components';

import { registration, sendPhoneNumber, verifyNumberWithCode } from '../../modules/index';

const RegisterNumber = ({ user, update, nextStep }) => {

    const [number, setNumber] = useState("");
    const [error, setError] = useState("");

    const handleRegistrationNumber = e => {
        nextStep();
        // e.preventDefault();
        // sendPhoneNumber(number)
        //     .then(() => {
        //         console.log("It works");
        //         user.phone = number;
        //         update(user);
        //         nextStep();
        //     })
        //     .catch(error => {
        //         console.error("[SEND PHONE NUMBER] ", error.message);
        //         setError(error.message);
        //         nextStep();

        //     });
    };

    return (
        <SafeAreaView>
            <Layout style={styles.container}>
                
                    <Text style={styles.title} category='h3'>Vérification du numéro de téléphone</Text>
                    <Text style={styles.subtitle} category='s1'>Nous vous enverrons un code!</Text>
                
                    <Text category="h6">{error}</Text>
            
                    <Input
                        placeholder='Numéro de téléphone'
                       // onChangeText={number => setNumber(number)}
                        //value={number}
                        style={styles.input}
                    />
                    <Button
                        onPress={handleRegistrationNumber}
                        style={styles.button}
                    >
                        Valider
                    </Button>
            </Layout>
        </SafeAreaView>
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
        
        <Layout style={styles.container}>

            <Text style={styles.title} category='h3'>Saisissez le code</Text>
            <View style={{flexDirection:'row'}} >
            <Input
                placeholder="."
                style={styles.inputNum}>
            </Input>
            <Input
                placeholder="."
                style={styles.inputNum}>
            </Input>
            <Input
                placeholder="."
                style={styles.inputNum}>
            </Input>
            <Input
                placeholder="."
                style={styles.inputNum}>
            </Input>
            <Input
                placeholder="."
                style={styles.inputNum}>
            </Input>
            <Input
                placeholder="."
                style={styles.inputNum}>
            </Input>
           
            {/* <Input
                placeholder='----'
                onChangeText={code => setCode(code)}
                value={code}
            /> */}
            </View>
            <Button
                onPress={handleVerifyNumber}
                style={styles.button}>
                Vérifier mon numéro
                
            </Button>
        
        </Layout>
 
    )
};

const RegisterInformation = ({ user, update, nextStep }) => {

    const handleRegistration = e => {
        e.preventDefault();
        registration(user)
            .then(res => {
                console.log(res);
                nextStep();
            })
            .catch(error => {
                console.error(error.message);
            });
    };

    return (
        <SafeAreaView>
        <Layout style={styles.container}>
        
            <Text style={styles.title} category='h3'>Inscription</Text>
            <Input
                value={user.username}
                label='Identifiant'
                onChangeText={
                    username => {
                        let tempUser = { ...user }
                        tempUser.username = username
                        update(tempUser)
                    }
                }
                style={styles.input}
            />
            <Input
                value={user.email}
                label="Email"
                onChangeText={
                    email => {
                        let tempUser = { ...user }
                        tempUser.email = email
                        update(tempUser)
                    }
                }
                style={styles.input}
            />
         
                <Input
                    value={user.password}
                    label="Mot de passe"
                    onChangeText={
                        password => {
                            let tempUser = { ...user }
                            tempUser.password = password
                            update(tempUser)
                        }
                    }
                    style={styles.input}
                />
                {(user.password.length < 8 && user.password.length > 0) && (
                    <Text>Votre mot de passe doit faire minimum 8 charatères</Text>
                )}
            
                <Input
                    value={user.password2}
                    label="Confirmation du mot de passe"
                    onChangeText={
                        password2 => {
                            let tempUser = { ...user }
                            tempUser.password2 = password2
                            update(tempUser)
                        }
                    }
                    style={styles.input}
                />
                {(user.password != user.password2) && (
                    <Text>Veuillez entrer le même mot de passe</Text>
                )}
            
            <Button
                onPress={handleRegistration}
                style={styles.button}
            >
                Valider
            </Button>
        
        </Layout>
        </SafeAreaView>
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

const styles = StyleSheet.create({
    container: {
        alignItems:'center', 
        padding:20,
        justifyContent:'center',
    },
    title: {
      textAlign:'center',
      marginBottom:10,
    },
    subtitle:{
        marginBottom:20,
    },
    input:{
        borderRadius:30,
        marginLeft:50,
        marginRight:50,
        marginBottom:10,
        marginTop:10,
    },
    inputNum:{
        borderRadius:100,
        width:53,
        textAlign:'center', 
        margin:1,
        
        
    },
    button:{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 70,
        marginTop:10,

    },
  });

export default Register;