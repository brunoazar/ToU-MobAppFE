import React from 'react';
import { Platform, StatusBar} from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SettingsScreen = () => {
  // Function to handle settings item click
  const handleSettingsItemClick = (item) => {
    // Perform action based on selected item
    switch (item) {
      case 'Profile':
        // Handle profile click
        break;
      case 'Notifications':
        // Handle notifications click
        break;
      case 'Privacy':
        // Handle privacy click
        break;
      case 'About':
        // Handle about click
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      {/* Render list of settings items */}
      <TouchableOpacity
        style={styles.settingsItem}
        onPress={() => handleSettingsItemClick('Profile')}
      >
        <Text style={styles.settingsItemText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingsItem}
        onPress={() => handleSettingsItemClick('Notifications')}
      >
        <Text style={styles.settingsItemText}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingsItem}
        onPress={() => handleSettingsItemClick('Privacy')}
      >
        <Text style={styles.settingsItemText}>Privacy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingsItem}
        onPress={() => handleSettingsItemClick('About')}
      >
        <Text style={styles.settingsItemText}>About</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 ,
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  settingsItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 16,
  },
  settingsItemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default SettingsScreen;
