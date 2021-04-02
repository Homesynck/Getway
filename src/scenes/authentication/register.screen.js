import React, { useState, useContext, createRef } from 'react'
import { SafeAreaView, View, StyleSheet, NativeModules } from 'react-native';

import AuthContext from "../../modules/authentication/authentication.context";


import { Button, Input, Text } from '@ui-kitten/components';

import Unlock from '../../assets/unlock.svg';
import AppTree from '../../assets/appTree.svg';
import touchApp from '../../assets/touchApp.svg';
import Phone from '../../assets/phone.svg';
import ContactsContext from '../../modules/contact/contacts.context';
import { syncContactsFromAndroid } from '../../modules/contact/contacts.module';

const { Register } = NativeModules;

const RegisterNumber = ({ user, update, nextStep }) => {

  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  const handleRegistrationNumber = async e => {
    e.preventDefault();
    const nb = "+33"+number.substring(1, number.length);

    try {
      await Register.sendPhoneNumber(nb);
      user.phone = nb;
      update(user);
      nextStep();
    } catch (error) {
      setError("Please verify your number!");
      console.error("[SEND PHONE NUMBER] ", error.message);
      nextStep(); // dev purpose
    }
  };

  return (
    <>
      <View style={styles.title_container}>
        <Text style={styles.title} category='h3'>Vérification du numéro de téléphone</Text>
        <Text style={styles.subtitle} category='s1'>Nous vous enverrons un code!</Text>
      </View>
      <View style={styles.icon_container}>

        <AppTree height={300} width={200} />

      </View>
      <View style={styles.input_container}>

        <Input
          placeholder='Numéro de téléphone'
          keyboardType='numeric'
          onChangeText={number => setNumber(number)}
          style={styles.input}
          maxLength={10}
        />
        <Button
          onPress={handleRegistrationNumber}
          style={styles.button}
        >
          Valider
                    </Button>

        <Text category="h6">{error}</Text>

      </View>
    </>
  )
};

const VerifyNumber = ({ nextStep }) => {

  const [code, setCode] = useState([]);
  const [error, setError] = useState("");

  const codeLength = 6;
  const inputRefs = Array(codeLength).fill(createRef())

  const autoNextFocus = (index) => {
    if (index < codeLength - 1) {
      inputRefs[index + 1].focus();
    }
  }

  const handleVerifyNumber = async e => {
    const numericCode = code.join('');
    console.log("VERIFYING CODE: " + numericCode);
    e.preventDefault();
    try {
      await Register.setToken(numericCode);
      nextStep();
    } catch (error) {
        console.error(error);
        setError(error);
    }
  };

  return (
    <>
      <View style={styles.title_container}>
        <Text style={styles.title} category='h3'>Saisissez le code</Text>
      </View>
      <View style={styles.icon_container}>

        <Unlock height={300} width={200} />

      </View>
      <View style={styles.input_container}>
        <View style={{ flexDirection: 'row' }} >
          {
            inputRefs.map((k, id) => (
              <Input
                placeholder='-'
                keyboardType='numeric'
                key={id}
                style={styles.inputNum}
                ref={r => inputRefs[id] = r}
                maxLength={1}
                onChangeText={
                  digit => {
                    let tempCode = [...code]
                    tempCode[id] = digit
                    setCode(tempCode)
                    autoNextFocus(id)
                  }
                }></Input>
            ))
          }
        </View>

        <Button
          onPress={handleVerifyNumber}
          style={styles.button}>
          Vérifier mon numéro
                </Button>

        <Text category="h6">{error}</Text>

      </View>
    </>
  )
};

const RegisterInformation = ({ user, update }) => {

  const { authState, setAuthState } = useContext(AuthContext);
  const {contacts, setContacts} = useContext(ContactsContext);


  const handleRegistration = async e => {
    e.preventDefault();
    if (user.username == null || user.password == null)
      return;
    try {
      const registerResponse = await Register.signup(user);
      console.log(registerResponse);
      await syncContactsFromAndroid(setContacts);
      setAuthState({status:'SIGNED_IN', token:registerResponse[1]});
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <View style={styles.title_container}>

        <Phone height={200} width={150} />

        <Text style={styles.title} category='h3'>Inscription</Text>

      </View>

      <View style={styles.input_container}>

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
          secureTextEntry={true}
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
          secureTextEntry={true}
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

      </View>
    </>
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
    <SafeAreaView style={{ flex: 1 }}>
      {registerStepList[registerStep].step}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  icon_container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  input_container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 20,
  },
  input: {
    borderRadius: 30,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 10,
    marginTop: 10,
  },
  inputNum: {
    borderRadius: 100,
    width: 53,
    textAlign: 'center',
    margin: 1,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 70,
    marginTop: 10,

  },
});

export default RegisterScreen;