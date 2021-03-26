import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Icon } from '@ui-kitten/components';

const Dashboard = ({navigation}) => {
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

const styles = StyleSheet.create({
    dashboardChoices: {
        padding: 5,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    card: {
        height: 160,
        width: 160,
        borderRadius: 25,
        backgroundColor: '#00BCD4',
        marginBottom: 16,
        flex: 0.5,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    icCard: {
        width: 128,
        height: 128,
    },

    contactListCard: {
        backgroundColor: '#0097A7',
    },
    addContactCard: {
        backgroundColor: '#CDDC39',
    },
    contactSyncCard: {
        backgroundColor: '#455A64',
    },
});

export default Dashboard;
