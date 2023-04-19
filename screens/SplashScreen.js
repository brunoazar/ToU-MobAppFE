import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      handleGetToken();
    }, 3000); // duration
  }, []);

  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem('AccessToken');
    if(!dataToken){
      navigation.replace('LoginScreen');
    }
    else{
      if (dataToken.type === 'traveler'){
        navigation.replace('TravelerMainScreen');
      }
      else{
        navigation.replace('PasteLinkScreen');
      }
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')} // logo path
        style={styles.logo}
      />
    </View>
  );
};

SplashScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
