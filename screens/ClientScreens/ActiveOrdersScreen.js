import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Platform, StatusBar} from 'react-native';
import ActiveOrderCard from '../../components/ActiveOrderCard';

// importing fake data for testing
import activeProducts from '../../fake_data/activeProducts';

const ActiveOrdersScreen = ({ navigation }) => {
  const route = useRoute();
  const email = route.params.email;

  //get list of json product objects from server (pending orders)
  // Backend API call to get active orders
  //const products = [];

  // Render each product as a ActiveOrderCard component
  const renderProduct = ({ item }) => <ActiveOrderCard product={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Active Orders</Text>
      <FlatList
        data={activeProducts} // replace with actual active orders
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

export default ActiveOrdersScreen;
