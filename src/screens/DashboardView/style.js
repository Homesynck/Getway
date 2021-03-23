import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
