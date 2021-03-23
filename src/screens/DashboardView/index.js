import React from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Icon } from '@ui-kitten/components';

import { styles } from './style';

const Dashboard = () => {
    const navigation = useNavigation();
    return (
        <ScrollView>
            <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Getway Dasboard</Text>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>

                    <TouchableOpacity 
                        style={[styles.card, styles.contactListCard]} 
                        onPress={() => navigation.navigate('Contacts')}>
                        <Icon
                            style={styles.icCard}
                            fill='#e3dfd5'
                            name='people-outline'
                        />
                        <Text>Contact List</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.card, styles.addContactCard]}
                        onPress={() => navigation.navigate('AddContact')}>
                        <Icon
                            style={styles.icCard}
                            fill='#e3dfd5'
                            name='person-add-outline'
                        />
                        <Text>Add Contact</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.card, styles.contactSyncCard]}>
                        <Icon
                            style={styles.icCard}
                            fill='#e3dfd5'
                            name='sync-outline'
                        />
                        <Text>Contacts Sync</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <Icon
                            style={styles.icCard}
                            fill='#e3dfd5'
                            name='people-outline'
                        />
                        <Text>Contact list</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            
        </ScrollView>
    )
}

export default Dashboard;
