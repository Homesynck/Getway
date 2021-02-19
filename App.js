import 'react-native-gesture-handler';
import React, { useState } from 'react';

import Root from './Root';
import { NativeModules, SafeAreaView } from 'react-native'

const App = () => {

  return (
    <SafeAreaView>
          <Root />
    </SafeAreaView>

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