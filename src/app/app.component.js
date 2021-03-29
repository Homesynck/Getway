import React, { useState, useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';

// UI kitten
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

// Autres librairies
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import AuthContext from '../modules/authentication/authentication.context';
import AppNavigator from '../navigation/app.navigator';

import { default as theme } from './theme.json';
import { default as mapping } from './mapping.json';

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

  const [authState, setAuthState] = useState('SIGNED_IN') //NOT_SIGNED_IN

  useEffect(() => {
    setTimeout(() => requestReadContactsPermission(), 200);
  }, []);
  //On execute avant toutes les tâches d'initialisations
  setTimeout(() => SplashScreen.hide(), 200);

  return (
  <>
      <IconRegistry icons={EvaIconsPack} />
      {/* AppearanceProvider si besoin d'un dark mode */}
          <ApplicationProvider 
          {...eva} 
          theme={{...eva.light, ...theme}}
          customMapping={mapping}>
      
              <SafeAreaProvider>
                  <AuthContext.Provider value={{authState, setAuthState}}>

                    <AppNavigator />

                  </AuthContext.Provider>
              </SafeAreaProvider>
      
          </ApplicationProvider>
  </>
)};

export default App;