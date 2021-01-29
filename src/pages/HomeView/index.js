import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import Contact from '../../components/Contact';

const Home = () => {
    return (
        <SafeAreaView>
            <Text>Home</Text>
            <Contact />
        </SafeAreaView>
    )
}

export default Home;