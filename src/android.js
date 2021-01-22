import React, { useState } from 'react';

import {
    SafeAreaView,
} from 'react-native';

import Login from './components/Login/Login';


const Getway = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <>
            <SafeAreaView>
                {
                    isLoggedIn ? <Dasbhoard />
                        : <Login onLoginPress={() => setIsLoggedIn(true)}
                        />}
            </SafeAreaView>
        </>
    )
};

export default Getway;

