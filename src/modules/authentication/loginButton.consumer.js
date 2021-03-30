import React, { useContext } from "react";
import { NativeModules } from 'react-native';
import { Button } from '@ui-kitten/components';

import AuthContext from "./authentication.context";

const { SignIn } = NativeModules;

const LoginButton = ({style, user, fallback}) => {

    const { authState, setAuthState } = useContext(AuthContext);

    const handleLogin = async e => {
        e.preventDefault();
        try {
            const res = await SignIn.signIn(user.username, user.password);
            console.log(res);
            // TODO set auth token to res.token
            setAuthState('SIGNED_IN');
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