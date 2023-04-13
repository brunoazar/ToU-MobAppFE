import React from 'react';
import { Platform, StatusBar} from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const SupportScreen = ({ navigation }) => {
  const route = useRoute();
  const email = route.params.email;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Support Screen</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
});

export default SupportScreen;
