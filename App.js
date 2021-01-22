import React, { useState } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';


import {
  Header,
} from 'react-native/Libraries/NewAppScreen';

import Login from './src/components/Login/Login';
import Dashboard from './src/components/Dashboard/Dashboard';


const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <Header />
          <View>
            <Login />
          </View>
        </ScrollView>
      </SafeAreaView>
      {/* <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View>
          {isLoggedIn ? <Login onPressLogin={() => setIsLoggedIn(true)} />
            : <Dashboard />
          }
        </View>
      </SafeAreaView> */}
    </>
  );
};

export default App;