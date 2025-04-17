import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';  // Importation des styles depuis le fichier styles.js

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="cube-scan" size={80} color="black" />
      <Text style={styles.text}>Passez votre appareil sur la boîte d’émargement</Text>
    </View>
  );
}
