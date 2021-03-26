import React, { useState, useMemo, createContext } from 'react';

// UI kitten
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

// Autres librairies
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import LoginNavigator from '../navigation/login.navigator';
import AppNavigator from '../navigation/app.navigator';
import { default as theme } from './theme.json';
import { default as mapping } from './mapping.json';

const AuthContext = createContext('NOT_SIGNED_IN');

const App = () => {

    function AuthProvider() {

        const [state, setState] = useState('NOT_SIGNED_IN');

        const value = {state, setState}

        let arr = [];
        switch (state) {        
            case 'NOT_SIGNIN':
            arr.push(
                <LoginNavigator />
            );
            break;
            case 'SIGNIN':
            arr.push(
                <AppNavigator />
            );
            break;
            default:
            arr.push(
                <LoginNavigator />
            );
            break;
        }
      
        return (
        <AuthContext.Provider value={value}>
            {arr[0]}
        </AuthContext.Provider>
        )
      
      }
    

    //On execute avant toutes les tâches d'initialisations
    SplashScreen.hide();

    return (
    <>
        <IconRegistry icons={EvaIconsPack} />
        {/* AppearanceProvider si besoin d'un dark mode */}
            <ApplicationProvider 
            {...eva} 
            theme={{...eva.light, ...theme}}
            customMapping={mapping}>
        
                <SafeAreaProvider>
                    <AuthProvider>

                    </AuthProvider>
                </SafeAreaProvider>
        
            </ApplicationProvider>
    </>
)};

export default App;