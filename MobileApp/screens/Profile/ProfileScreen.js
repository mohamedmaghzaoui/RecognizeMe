import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Stack = createNativeStackNavigator();

export default function ProfileScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Connexion" component={LoginForm} />
      <Stack.Screen name="Inscription" component={RegisterForm} />
    </Stack.Navigator>
  );
}
