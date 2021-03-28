import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, Text, View } from 'react-native';

import { Divider, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

import { ArrowIosBackIcon } from '../../components/icons';


const Contact = ({route}) => {
    //TODO useRoute hook here
    const { contact } = route.params;
    const navigation = useNavigation();

    console.log(contact)

    const renderBackAction = () => (
        <TopNavigationAction
          icon={ArrowIosBackIcon}
          onPress={navigation.goBack}
        />
      );

    return (
        <SafeAreaView>
            <TopNavigation
                title={contact.displayName}
                accessoryLeft={renderBackAction}
            />
            <Divider/>
            <View>
                <Text>This is the contact view</Text>
                <View>
                    <Text>ID: {contact.recordID}</Text>
                    <Text>NAME: {contact.displayName}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Contact;
