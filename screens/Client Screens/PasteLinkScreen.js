import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking, Alert, Image } from 'react-native';
import ProductPage from './ProductPage';
import { Platform, StatusBar} from 'react-native';
import BottomNav from '../../components/BottomNav'; // Import the bottom navigation component
import { useRoute } from '@react-navigation/native';

const PasteLinkScreen = ({ navigation }) => {
  const [link, setLink] = useState('');
  
  const route = useRoute();
  const email = route.params.email;

  // Example JSON object representing product details
  const product = {
    imageSource: 'https://random.imagecdn.app/500/150',
    url: 'https://www.amazon.com/dp/B123456789',
    title: 'Example Product Title',
    price: '$99.99',
    id: 'B123456789',
    dimensions: '10 x 5 x 2 inches',
    inStock: true,
  };

  const handleCheckProduct = () => {
    //Validate the link
    if (!isValidUrl(link)) {
      Alert.alert('Invalid URL', 'Please enter a valid amazon URL');
      return;
    }

    //BACKEND CODE FOR CHECKING PRODUCT
    // Implement logic for sending the link to the backend, and then redirecting to the product page with a json object containing the product details
    // For now, we will just redirect to the product page for testing purposes

    // JUST FOR TESTING
    navigation.navigate('ProductPage', { product: product, email: email }); // Redirect to the product page with the product details
    // JUST FOR TESTING
  }

  const isValidUrl = (url) => {
    // amazon URL validation using regular expression
    const pattern = /^https?:\/\/(?:www\.)?amazon\.com\/(?:[^/]+\/)*?(?:dp|gp\/product)\/[A-Za-z0-9]{10}(?:\/[^?#]*|$)/;
    return pattern.test(url);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Paste your link here</Text>
      <TextInput
        style={styles.textBox}
        placeholder="Paste your link"
        onChangeText={setLink}
        value={link}
      />
      <TouchableOpacity style={styles.button} onPress={handleCheckProduct}>
        <Text style={styles.buttonText}>Check Product</Text>
      </TouchableOpacity>
      <BottomNav navigation={navigation} email={email}/>
       

    </View>

    
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 ,
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3274cb',
    marginBottom: 16,
  },
  textBox: {
    width: '100%',
    height: 40,
    borderColor: '#3274cb',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: '#3274cb',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomNavigationButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNavigationButtonText: {
    marginTop: 5, // Add some margin to the top of the button text
    color: '#333', // Change this to your desired text color
    fontSize: 12, // Change this to your desired font size
  },
  bottomNavigationButtonIcon: {
    marginBottom: 2, // Add some margin to the bottom of the button icon
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default PasteLinkScreen;
