import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Platform, StatusBar} from 'react-native';
import PendingOrderCard from '../../components/PendingOrderCard';

//importing fake data for testing
import pendingProducts from '../../fake_data/pendingProducts'

const PendingOrdersScreen = ({ navigation }) => {
  const route = useRoute();
  const email = route.params.email;

  //get list of json product objects from server (pending orders)
  const products = [];

  //fake data for testing
  //products = pedningProducts;

  // Render each product as a PendingOrderCard component
  const renderProduct = ({ item }) => <PendingOrderCard product={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pending Orders</Text>
      <FlatList
        data={pendingProducts} // replace with actual pending orders
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 ,
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#3274cb',
    textAlign: 'center',
  },
});

export default PendingOrdersScreen;
