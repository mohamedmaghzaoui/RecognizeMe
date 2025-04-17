import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';  // Importation des styles depuis 'styles.js'

export default function ScanScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Page de Scan</Text>
    </View>
  );
}
