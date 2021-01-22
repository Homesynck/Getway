import React, { useState } from 'react';

import {
    AppRegistry,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';

import Login from './components/Login/Login';


const Getway = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <>
            <SafeAreaView>
                <Login onLoginPress={() => this.setIsLoggedIn(true)} />
            </SafeAreaView>
        </>

    )
};

