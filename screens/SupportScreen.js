import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

const SupportScreen = ({ navigation }) => {
  const route = useRoute();
  const email = route.params.email;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Active Orders</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default SupportScreen;
