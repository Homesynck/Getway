import React from 'react';
import { FlatList, SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import { Layout } from '@ui-kitten/components';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Hélène Te',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Jules Doumèche',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Daniel Aguiar',
  },
];

const ContactItem = ({ name, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Text style={styles.text}>{name}</Text>
  </TouchableOpacity>
);

const Contacts = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <ContactItem 
    name={item.name}
    onPress={() => navigation.navigate('Contact', {
      contact: item
    })} />
  );

    return (
        <SafeAreaView>
          <Layout style={{marginVertical: 16, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>List of contacts</Text>
          </Layout>
          <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id} />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#607D8B',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  text: {
    fontSize: 18,
    color: "#f5f1f0",
  },
});

export default Contacts;
