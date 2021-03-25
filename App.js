import React, { useEffect } from 'react';

import { PermissionsAndroid } from 'react-native';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import Root from './Root';
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

  useEffect(() => {
    setTimeout(() => requestReadContactsPermission(), 200);
  }, []);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider 
        {...eva} 
        theme={{...eva.light, ...theme}}
        customMapping={mapping}>
        <Root />
      </ApplicationProvider>
    </>
  )
}

export default App;