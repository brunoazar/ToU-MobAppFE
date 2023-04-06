import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('LoginScreen');
    }, 3000); // duration
  }, []);

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
