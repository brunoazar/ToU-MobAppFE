import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RegisterScreen from './RegisterScreen';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  function navigateToRegister() {
      navigation.navigate("RegisterScreen");
  }

  function navigateToApply() {
    navigation.navigate("ApplyAsTravelerScreen");
}

  ////
  const handleLogin = async () => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
  
    try {
      //backend code for login
      const response = await fetch('https://example.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to login');
      }
  
      // TODO: handle successful login
    } catch (error) {
      console.log(error);
      // TODO: handle login error
    }
  };
  
  ////
  const handlePress = () => {
    Linking.openURL('https://example.com/forgot-password');
  };
  ////

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Regex to validate email
  
      return regex.test(email)
     ;
    }
  ///

  const handleApply = () => {
    navigateToApply()
  };

  const handleSignUp = () => {
    navigateToRegister()
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Login</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={[
            styles.loginButton,
            !validateEmail(email) && { backgroundColor: '#ccc' },
          ]}
          onPress={handleLogin}
          disabled={false}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        
        
        <TouchableOpacity onPress={handlePress} style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
  

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyText}>Apply as a Traveler</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3274cb',
  },
  form: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#3274cb',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 5,
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpButton: {
    backgroundColor: '#3274cb',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  signUpText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#3274cb',
  },
  applyText: {
    color: '#3274cb',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotText: {
    color: '#3274cb',
    fontSize: 14,
    fontWeight: 'bold',
  },
  forgotBtn: {
    width: '100%',
    textAlign: 'left',
    alignItems: 'flex-start',
  },
});

export default LoginScreen;
