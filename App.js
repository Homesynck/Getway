import React, { useState } from 'react';

import { SafeAreaView } from 'react-native';

import Login from './src/components/Login/Login';
import Dashboard from './src/components/Dashboard/Dashboard';

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

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
