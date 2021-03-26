import React, { useState, useEffect, createContext } from 'react';

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

const requestReadContactsPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: "Read contacts",
          message:
            "This app need to have access to your contacts",
          buttonNegative: "Cancel",
          buttonPositive: "I give the permission"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the read contacts feature");
      } else {
        console.log("Read contacts permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

const App = () => {

  useEffect(() => {
    setTimeout(() => requestReadContactsPermission(), 200);
  }, []);

    function AuthProvider() {

        const [state, setState] = useState('NOT_SIGNIN');

        const value = {state, setState}

        let arr = [];
        switch (state) {        
            case 'NOT_SIGNIN':
            arr.push(
                <LoginNavigator />
            );
            break;
            case 'SIGNED_IN':
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