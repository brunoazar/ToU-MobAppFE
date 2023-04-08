import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const PendingOrdersScreen = ({ orders }) => {
  

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

export default PendingOrdersScreen;
