import React from 'react';
import { Platform, StatusBar, TouchableOpacity} from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const SupportScreen = ({ navigation }) => {
  const route = useRoute();
  const email = route.params.email;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Support Screen</Text>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backContainer}>
        <View style={styles.backButtonContainer}>
          <Ionicons name="ios-close" size={28} color="#3274cb" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
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

export default SupportScreen;
