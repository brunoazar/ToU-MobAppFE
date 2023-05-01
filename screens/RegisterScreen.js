import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [building, setBuilding] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const navigation = useNavigation();

  function onBackPressed(){
      navigation.goBack()
  }
  
  const handleRegister = () => {
    // Handle registration logic here
    if(!phoneAndEmailIsOk()){
      Alert.alert('Invalid Input', 'Please make sure you filled the form correctly.');
      return
    };
    if(notEmpty()){
      return;
    };
    //If the code reached here, it means that the form is valid
    //Backend developer, your code goes here :)
  };

  const notEmpty = () => {
    // Validate first name
    if (!firstName) {
      Alert.alert('Invalid First Name', 'Please enter your first name.');
      return true;
    }
    // Validate last name
    if (!lastName) {
      Alert.alert('Invalid Last Name', 'Please enter your last name.');
      return true;
    }
    // Validate gender
    if (!gender){
      Alert.alert('Invalid Gender', 'Please enter your Gender.');
      return true;
    }
    // Validate City
    if (!city){
      Alert.alert('Invalid City', 'Please enter your City.');
      return true;
    }
    // Validate Building
    if (!building){
      Alert.alert('Invalid Building', 'Please enter your Building.');
      return true;
    }
    // Validate Agreement
    if (!agreement){
      Alert.alert('Agreement Error', 'Please agree to the terms and conditions.');
      return true;
    }
    // Validate password
    if (!password || !isValidPassword) {
      Alert.alert('Invalid Password', 'Please enter your password.');
      return true;
    }
    return false;
  };

  const validatePhoneNumber = () => {
    // Define the regex pattern for Lebanese phone numbers
    const phoneNumberRegex = /^(?:\+?961|0)?(?:(?:3|70|71|76|78|79|81|81|82|83|84|85|96|99)[\d]{6}|(?:70|71|76|78|79|81|82|83|84|85|96|99)[\d]{6})$/;
    const isValid = phoneNumberRegex.test(phoneNumber);
    setIsValidPhoneNumber(isValid);
  };

  const validateEmail = () => {
    // Define the regex pattern for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsValidEmail(isValid);
  };

  const phoneAndEmailIsOk = () => {
    // Validate phone number
    if (!phoneNumber || !isValidPhoneNumber ) {
      setIsValidPhoneNumber(false);
      if (!email || !isValidEmail) {
        setIsValidEmail(false);
        return false;
      }
      return false;
    }
    //Validate email
    if (!email || !isValidEmail) {
      setIsValidEmail(false);
      if (!phoneNumber || !isValidPhoneNumber ) {
        setIsValidPhoneNumber(false);
        
        return false;
      }
      return false;
    }
    return true;
  }

  const handleLinkPress = () => {
    // Replace the URL with website agreement page URL
    Linking.openURL('https://www.example.com/main-services-agreement');
  };

  const validatePassword = (password) => {
    // Define the regex pattern for password validation
    const regexPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+-=,.<>/?;:'"{[}\]|\\])(?=.*[^\s])\S{8,}$/;
    
    // Test the password against the regex pattern
    const isValid = regexPattern.test(password);
    
    // Return true if the password is valid, false otherwise
    setIsValidPassword(isValid);
    return isValid;
  };
  
  


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="First Name"
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          maxLength={20}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          maxLength={20}
        />

        <View style={styles.genderContainer}>
          <Text style={styles.genderText}>Gender:</Text>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === 'male' && styles.genderButtonActive,
            ]}
            onPress={() => setGender('male')}>
            <Text style={styles.genderButtonText}>M</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === 'female' && styles.genderButtonActive,
            ]}
            onPress={() => setGender('female')}>
            <Text style={styles.genderButtonText}>F</Text>
          </TouchableOpacity>
        </View>

          <TextInput
            placeholder="Email"
            style={[styles.input, !isValidEmail && styles.inputError]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            onBlur={validateEmail} // onBlur event for email validation
          />
          {!isValidEmail && <Text style={styles.errorTextEmail}>    Please enter a valid email address</Text>}
        
        

            
              <View style={styles2.passwordContainer}>
                <TextInput
                  style={[styles2.input, !isValidPassword && styles.inputError]}
                  secureTextEntry={!isPasswordVisible}
                  placeholder="Password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  onBlur={validatePassword}
                />
                <TouchableOpacity
                  style={styles2.eyeIconContainer}
                  onPress={handleTogglePasswordVisibility}
                >
                  <Icon
                    name={isPasswordVisible ? 'eye-slash' : 'eye'}
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
          
          {!isValidPassword && <Text style={styles.errorText}>{'\t\t'}Please enter a strong password (length: 8+, {'\n\t\t'}contains uppercase and lowercase letters, {'\n\t\t'}digits, and a special character)</Text>}

         

        <View style={styles.container}>
              <TextInput
                placeholder="Phone Number"
                style={[styles.inputPhone, !isValidPhoneNumber && styles.inputError]}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                onBlur={validatePhoneNumber}
              />
              {!isValidPhoneNumber && <Text style={styles.errorText}>Please enter a valid Lebanese phone number</Text>}
              
        </View>
        <Text style={styles.countryText}>Lebanon</Text>
          
          
        <TextInput
          placeholder="City"
          style={styles.input}
          value={city}
          onChangeText={setCity}
          maxLength={20}
        />
        <TextInput
          placeholder="Building"
          style={styles.input}
          value={building}
          onChangeText={setBuilding}
          maxLength={100}
        />

        <View style={styles.agreementContainer}>
          <TouchableOpacity
            style={styles.agreementBox}
            onPress={() => setAgreement(!agreement)}>
            {agreement && <View style={styles.agreementBoxChecked} />}
          </TouchableOpacity>
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={styles.agreementText}>
                I agree to the {' '}
              </Text>
              <TouchableOpacity onPress={handleLinkPress}>
                <Text style={styles.linkText}>main services agreement</Text>
              </TouchableOpacity>
            </View>
          
          </View>
        </View>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingVertical: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#3274cb',
    },
    form: {
      width: '80%',
    },
    input: {
      
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    genderContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    genderText: {
      marginRight: 10,
    },
    genderButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
    },
    genderButtonActive: {
      backgroundColor: '#3274cb',
      borderColor: '#3274cb',
    },
    genderButtonText: {
      fontSize: 20,
      color: '#ccc',
    },
    agreementContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    agreementBox: {
      width: 20,
      height: 20,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: '#ccc',
      marginRight: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    agreementBoxChecked: {
      width: 10,
      height: 10,
      borderRadius: 2,
      backgroundColor: '#3274cb',
    },
    agreementText: {
      color: '#666',
    },
    registerButton: {
      backgroundColor: '#3274cb',
      paddingVertical: 10,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    registerButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    countryText: {
      textAlignVertical: 'center',
      fontWeight: 'bold',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    inputPhone: {
      height: 50,
      width: '100%',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    inputError: {
      borderColor: 'red',
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
    },
    inputErrorEmail: {
      borderColor: 'red',
    },
    errorTextEmail: {
      color: 'red',
      marginBottom: 10,
    },
    textContainer: {
      flexDirection: 'row', // Arrange text in a row
      alignItems: 'center', // Vertically align text in the middle
    },
    agreementText: {
      // Your styles for the main text here
    },
    linkText: {
      color: 'blue', // Change to your desired link color
      textDecorationLine: 'underline', // underline style to indicate link
    },
    urlText: {
      marginTop: 10, // Add margin to separate URL from text
    },
    passwordContainer: {
      flexDirection: 'row', // Make sure the text input and icon are in a row
      width: '100%', // Take up full width of the container
      paddingHorizontal: 16, // Add horizontal padding for spacing
    },
    eyeIconContainer: {
      marginLeft: 10,
      justifyContent: 'center',
    },
  });

  const styles2 = StyleSheet.create({
    //styles for password input
    passwordContainer: {
      flexDirection: 'row', // Make sure the text input and icon are in a row
      alignItems: 'center', // Align items vertically in the center
      width: '100%', // Take up full width of the container
      paddingHorizontal: 0, // Add horizontal padding for spacing
    },
    input: {
      flex: 1, // Take up remaining space in the row
      height: 50, // Set desired height for the text input
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10, // Add horizontal padding for spacing
      ///
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10,
    },
    inputError: {
      borderColor: 'red', // Update border color for invalid password
    },
    eyeIconContainer: {
      marginLeft: 10, // Add left margin for spacing between text input and icon
      marginBottom: 10,
    },
  });
  
  
  export default RegisterScreen;



