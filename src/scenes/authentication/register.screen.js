import React, { useState } from 'react'
import { SafeAreaView, View, StyleSheet, NativeModules } from 'react-native';

import { Button, Input, Text, Layout } from '@ui-kitten/components';

import Contacts from 'react-native-contacts';

const { Register, FileSync } = NativeModules;

const RegisterNumber = ({ user, update, nextStep }) => {

    const [number, setNumber] = useState("");
    const [error, setError] = useState("");

    const handleRegistrationNumber = async e => {
        nextStep();
        e.preventDefault();
        try {
            await Register.sendPhoneNumber(number);
            user.phone = number;
            update(user);
            nextStep();
        } catch (error) {
            console.error("[SEND PHONE NUMBER] ", error.message);
            setError(error.message);
            nextStep();
        }
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

    const handleVerifyNumber = async e => {
        e.preventDefault();
        nextStep();
        // try {
        //     // TODO call verifyNumber method from bridge
        // } catch (error) {
        //     //TODO update state
        //     console.error(error);
        // }
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

const RegisterInformation = ({ user, update }) => {

    const handleRegistration = async e => {
        e.preventDefault();
        if(user.username == null || user.password == null)
            return;
        try {
            const res = await Register.signup(user);
            console.log(res);
            const contacts = await Contacts.getAll();
            const dataSync = await FileSync.syncData(contacts);
            console.log(dataSync);
        } catch (error) {
            console.error(error.message);
        }
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


const RegisterScreen = () => {

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

    const registerStepList = [
        {
            step: <RegisterNumber user={user} update={updateUser} nextStep={handleNextStep} />
        },
      {
         step: <VerifyNumber nextStep={handleNextStep} />
        },
        {
            step: <RegisterInformation user={user} update={updateUser} />
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

export default RegisterScreen;