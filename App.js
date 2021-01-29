import 'react-native-gesture-handler';
import React, { useState } from 'react';

import Root from './Root';
import { NativeModules } from 'react-native'

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { Getway } = NativeModules;

  const sayHiFromJava = async () => {
    Getway.sayHi((err) => { console.log(err) }, (msg) => { console.log(msg) });
  };

  sayHiFromJava();

  return (
    <Root />
    // <StatusBar barStyle="dark-content" />
    // <SafeAreaView>
    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic">
    //     <Header />
    //     <View>
    //       <Login />
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
  );
};

export default App;