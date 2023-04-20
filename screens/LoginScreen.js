import axios from '../api/axios';
// import axios from '../src/api/axios';
import React, { useState } from 'react';
import { Platform, StatusBar, ScrollView} from 'react-native';
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
import ApplyAsTravelerScreen from './ApplyAsTravelerScreen';
import PasteLinkScreen from './ClientScreens/PasteLinkScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  function navigateToRegister() {
    setEmail('');
    setPassword('');
      navigation.navigate("RegisterScreen");
  }

  function navigateToApply() {
    setEmail('');
    setPassword('');
    navigation.navigate("ApplyAsTravelerScreen");
}

  ////
  const handleLogin = async () => {
    console.log("We are here");
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    // validate password
    if(!password){
      Alert.alert('Invalid Password', 'Please enter a password.');
      return;
    }

    try{
      console.log("We are here 2");
      const res = await axios.post('/login',//post request
      JSON.stringify({email: email, password: password}),//include email and password
      {
        headers: { 'Content-Type': 'application/json' }
      }
      );
      console.log(res.data);//for you to check what the server is responding with

      //send user to corresponding page
      checkLogin(res.status, res.data.type, res);

    }catch(err){

      console.log(err);
    }


    
    // Backend code for login
    // navigate to the appropriate screen based on the user type using checkLogin function below
    // BACKEND DEVELOPER: uncomment the code below and replace the dummy code with your own

    // try {
    //   //backend code for login
    //   const response = await fetch('http://localhost:5000/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       email,
    //       password,
    //     }),
    //   });
  
    //   if (!response.ok) {
    //     throw new Error('Failed to login');
    //   }
  
    //   // TODO: handle successful login using checkLogin function below
    // } catch (error) {
    //   console.log(error);
    //   // TODO: handle login error using checkLogin function below
    // }
  };

  const checkLogin = (responseCode, userType, result) => {
    // Handle login logic here
    if(responseCode == 200){
      Alert.alert('Login Successful');
      AsyncStorage.setItem("AccessToken", result.data);
      if(userType == 'Traveler' || userType == 'traveler'){
        setPassword('');
        navigation.navigate("TravelerMainScreen", { email: email });
      }
      else{
        setPassword('');
        navigation.navigate("PasteLinkScreen", { email: email });
      }
    }
    else if(responseCode == 403){
      Alert.alert('Account Blocked', 'Too many failed login attempts.');
    }
    else{
      Alert.alert('Login Failed', 'Incorrect email or password.');
    }
  };
  
  

  const handlePress = () => {
    // handles the forgot password button
    navigation.navigate("ForgotPasswordScreen")
  };
  

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
    <ScrollView contentContainerStyle={styles.container}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20 ,
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
