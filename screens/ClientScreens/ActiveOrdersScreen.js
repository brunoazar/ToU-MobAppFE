import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Platform, StatusBar} from 'react-native';
import ActiveOrderCard from '../../components/ActiveOrderCard';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// importing fake data for testing
import activeProducts from '../../fake_data/activeProducts';

const ActiveOrdersScreen = ({ navigation }) => {
  const [products, setProducts] = useState(null);

  //get list of json product objects from server (pending orders)
  // Backend API call to get active orders
  //const products = [];


  const handleProducts = async () => {
    try{
      console.log("We are here 9");
      const token = await AsyncStorage.getItem('AccessToken');
      console.log(token);
      const res = await axios.get('/client/home/activeorders',//post request
      {
        headers: { 'Content-Type': 'application/json' ,
                    'Authorization': `Bearer ${token}`
                  }
      }
      );
      console.log(res.data.aorders);//for you to check what the server is responding with

      return res.data.aorders;
      

    }catch(err){

      console.log(err);
    }
  }

  const getProducts = async () => {
    const products =await handleProducts();
    return products;
  }
  
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    fetchProducts();
  }, []);

  // Render each product as a ActiveOrderCard component
  const renderProduct = ({ item }) => {products && <ActiveOrderCard navigation={navigation} product={item} />};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Active Orders</Text>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backContainer}>
        <View style={styles.backButtonContainer}>
          <Ionicons name="ios-close" size={28} color="#3274cb" />
        </View>
      </TouchableOpacity>
      <FlatList
        data={products} // replace with actual active orders
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20 ,
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
  backContainer: {
    position: 'absolute',
    top: 20,
    right: 10,
    zIndex: 9999,
  },
  backButtonContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ActiveOrdersScreen;
