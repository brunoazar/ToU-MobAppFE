import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ApplyAsTravelerScreen from './screens/ApplyAsTravelerScreen';
import SettingsScreen from './screens/SettingsScreen';
import SupportScreen from './screens/SupportScreen';


import PasteLinkScreen from './screens/Client Screens/PasteLinkScreen';
import ActiveOrdersScreen from './screens/Client Screens/ActiveOrdersScreen';
import PendingOrdersScreen from './screens/Client Screens/PendingOrdersScreen';
import ProductPage  from './screens/Client Screens/ProductPage';


import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ApplyAsTravelerScreen"
          component={ApplyAsTravelerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PasteLinkScreen"
          component={PasteLinkScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ActiveOrdersScreen"
          component={ActiveOrdersScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PendingOrdersScreen"
          component={PendingOrdersScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SupportScreen"
          component={SupportScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductPage"
          component={ProductPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
