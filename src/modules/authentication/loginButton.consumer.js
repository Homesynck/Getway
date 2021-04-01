import React, { useContext } from "react";
import { NativeModules } from 'react-native';
import { Button } from '@ui-kitten/components';

import AuthContext from "./authentication.context";
import ContactsContext from '../contact/contacts.context';

import { getData } from "../contact/contacts.module";

const { SignIn, FileSync } = NativeModules;

const LoginButton = ({style, user, fallback}) => {

    const { setAuthState } = useContext(AuthContext);
    const { setContacts } = useContext(ContactsContext);

    const handleLogin = async e => {
        e.preventDefault();
        try {
            const loginResponse = await SignIn.signIn(user.username, user.password);
            console.log(loginResponse);
            await FileSync.openDirectory();
            FileSync.setOnUpdate();
            await FileSync.startSyncing();
            await getData(setContacts);
            setAuthState({status: 'SIGNED_IN', token: loginResponse.token});
        } catch (error) {
            console.error(error.message);
            fallback(error.message);
        }
    }

    return (
        <Button
        onPress={e => handleLogin(e)}
        style={style}
        // disabled={buttonState}
        >Connexion</Button>
        )
}


export default LoginButton;