import 'react-native-gesture-handler';
import React, { useState } from 'react';
import Root from './Root';


const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

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