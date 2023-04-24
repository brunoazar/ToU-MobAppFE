import React, { useState, useRef } from 'react';
import { Platform, StatusBar, Modal} from 'react-native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import lbCities from '../data/lbCities.json';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {

  // Dummy data, replace with data from the backend
  const profileData = {
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '70123456',
    city: 'Beirut',
    gender: 'M',
    nationality: 'Lebanon',
  };


  const [phoneNumber, setPhoneNumber] = useState(profileData.phoneNumber);
  const [city, setCity] = useState(profileData.city);
  const [isChangesSaved, setIsChangesSaved] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);



  const [oldCity, setOldCity] = useState(profileData.city); // Ref for the old city, for validation

  function onBackPressed(){
    navigation.goBack()
  }

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
    setIsChangesSaved(false);
  }
  const scrollViewRef = useRef(); // Ref for ScrollView

  const handleCityChange = (text) => {
    if(oldCity !== text) {
      setCity(text);
      setIsChangesSaved(false);
      setModalVisible(false);
    }
  }

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => {
          AsyncStorage.removeItem('AccessToken');
          navigation.navigate('LoginScreen');
          // Perform API call to logout
        },
      },
    ]);
  }

  const handleSubmitChanges = () => {
    // Perform API call to submit changes to the backend
    // Assuming a successful API call, set isChangesSaved to true
    if(!isChangesSaved){
      setIsChangesSaved(true);
      Alert.alert('Changes Saved', 'Your changes have been saved successfully.');
      navigation.goBack();
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backContainer}>
        <View style={styles.backButtonContainer}>
          <Ionicons name="ios-close" size={28} color="#3274cb" />
        </View>
      </TouchableOpacity>
      <View style={styles.profileDataContainer}>
        <Text style={styles.label}>First Name:</Text>
        <Text style={styles.value}>{profileData.firstName}</Text>
        <Text style={styles.label}>Last Name:</Text>
        <Text style={styles.value}>{profileData.lastName}</Text>
        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.value}>{profileData.gender}</Text>
        <Text style={styles.label}>Nationality:</Text>
        <Text style={styles.value}>{profileData.nationality}</Text>
        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          maxLength={20}
        />
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>Lebanon</Text>
        <View style={styles.cityContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>
              {city ? city : "Select Your City"}
            </Text>
          </TouchableOpacity>

          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {/* Pass the ref to ScrollView */}
                <ScrollView ref={scrollViewRef}>
                  {lbCities.map((city) => (
                    <TouchableOpacity
                    key={city.city}
                      style={styles.cityItem}
                      onPress={() => handleCityChange(city.city)}
                    >
                      <Text style={styles.countryText}>{city.city}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleSubmitChanges}
        disabled={isChangesSaved}
      >
        <Text style={styles.registerButtonText}>Submit Changes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.registerButtonText}>Logout</Text>
      </TouchableOpacity>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 20,
  },
  button: {
    backgroundColor: '#ebebeb',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#3274cb',
    textAlign: 'center',
  },
  profileDataContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 20,
    minWidth: 200,
    maxWidth: 300,
  },
  cityItem: {
    paddingVertical: 10,
  },
  cityText: {
    fontSize: 16,
  },
  cityContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
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
  logoutButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
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

export default SettingsScreen;

