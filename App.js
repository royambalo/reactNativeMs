import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper'

import  * as firebase from 'firebase'
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard'
import {firebaseConfig} from './core/environment'
const Stack = createStackNavigator();
firebase.initializeApp(firebaseConfig);
function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#3740FE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ title: 'Signup' }}
      />       
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={
          {title: 'Login'},
          {headerLeft: null} 
        }
      />
      <Stack.Screen 
       name="Dashboard" 
       component={Dashboard} 
       options={
         {title: 'Employee Managment'},
         {headerLeft: null} 
       }
      />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <PaperProvider>
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
    </PaperProvider>
  )
}

