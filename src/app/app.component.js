import React from 'react';

// UI kitten
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

// Autres librairies
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import AppNavigator from '../navigation/app.navigator';
import { default as theme } from './theme.json';
import { default as mapping } from './mapping.json';

const App = () => {

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
                    <AppNavigator />
                </SafeAreaProvider>
        
            </ApplicationProvider>
    </>
)};

export default App;