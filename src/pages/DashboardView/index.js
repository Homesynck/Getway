import React from 'react';
import { SafeAreaView, View, Text, ScrollView } from 'react-native';

import { Layout, Icon } from '@ui-kitten/components';

import { styles } from './style';

const Dashboard = () => {
    return (
        <ScrollView>
            <SafeAreaView>
                <View style={styles.dashboardChoices}>
                    <View style={[styles.card, styles.contactListCard]}>
                        <Icon
                            style={styles.icCard}
                            fill='#e3dfd5'
                            name='people-outline'
                        />
                        <Text>Contact List</Text>
                    </View>
                    <View style={[styles.card, styles.addContactCard]}>
                        <Icon
                            style={styles.icCard}
                            fill='#e3dfd5'
                            name='person-add-outline'
                        />
                        <Text>Add Contact</Text>
                    </View>
                    <View style={[styles.card, styles.contactSyncCard]}>
                        <Icon
                            style={styles.icCard}
                            fill='#e3dfd5'
                            name='sync-outline'
                        />
                        <Text>Contacts Sync</Text>
                    </View>
                    <View style={styles.card}>
                        <Icon
                            style={styles.icCard}
                            fill='#e3dfd5'
                            name='people-outline'
                        />
                        <Text>Contact list</Text>
                    </View>
                </View>
            </SafeAreaView>
            
        </ScrollView>
    )
}

export default Dashboard;
