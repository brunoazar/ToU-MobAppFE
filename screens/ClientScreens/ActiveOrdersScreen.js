import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Platform, StatusBar} from 'react-native';
import ActiveOrderCard from '../../components/ActiveOrderCard';

const ActiveOrdersScreen = ({ navigation }) => {
  const route = useRoute();
  const email = route.params.email;

  //get list of json product objects from server (pending orders)
  const products = [];

  // Render each product as a ActiveOrderCard component
  const renderProduct = ({ item }) => <ActiveOrderCard product={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Active Orders</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
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
  },
});

export default ActiveOrdersScreen;
