import React, { useState } from 'react';

import React, { useState, useEffect } from 'react';
// import {
//   SafeAreaView,
//   View,
//   StatusBar,
// } from 'react-native';

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
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Login from './src/components/Login/Login';
import Dashboard from './src/components/Dashboard/Dashboard';


const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
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

return (
  <>
    <SafeAreaView>
      {isLoggedIn ? <Dashboard />
        : <Login onLoginPress={() => setIsLoggedIn(true)} />
      }
    </SafeAreaView>
  </>
)
};

export default App;