import React, { useContext } from "react";
import { Button } from '@ui-kitten/components';

import AuthContext from "./authentication.context";
import handleLogin from './authentication.module';

const LoginButton = ({style}) => {

    const { authState, setAuthState } = useContext(AuthContext);

    return (
        <Button
        // onPress={e => handleLogin(e)}
        onPress={e => setAuthState('SIGNED_IN')}
        style={style}
        // disabled={buttonState}
        >Connexion</Button>
        )
}


export default LoginButton;