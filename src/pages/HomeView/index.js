import React from 'react';
import { ScrollView, SafeAreaView, StyleSheet, View } from 'react-native';

import Contact from '../../components/Contact';

import BaseExample from "./BaseExample"
import ColorExample from "./ColorExample"

import { Sizing, Outlines, Colors } from "../../styles"

const Home = () => {
    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={style.contentContainer}>
                <View style={style.sectionContainer}>
                    <BaseExample />
                </View>
                <View style={style.sectionContainer}>
                    <ColorExample />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    contentContainer: {
        padding: Sizing.x20,
    },
    sectionContainer: {
        borderBottomWidth: Outlines.borderWidth.thin,
        borderColor: Colors.neutral.s100,
        paddingBottom: Sizing.x20,
        marginBottom: Sizing.x20,
    },
})

export default Home;