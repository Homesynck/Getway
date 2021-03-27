import React, { useContext } from "react";

import AuthContext from './authentication.context';
import HomeNavigator from '../../navigation/home.navigator';
import LoginNavigator from '../../navigation/login.navigator';

const AuthNavigatorConsumer = () => {
    const { authState, setAuthState } = useContext(AuthContext)

    return authState === "SIGNED_IN"
        ? <HomeNavigator />
        : <LoginNavigator />
}


export default AuthNavigatorConsumer;