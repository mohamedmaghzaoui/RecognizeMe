// screens/Settings/SettingsScreen.js
import React from 'react';
import { View, Text, Switch } from 'react-native';
import styles from './styles';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paramètres</Text>

      <View style={styles.option}>
        <Text style={styles.label}>Notifications</Text>
        <Switch />
      </View>

      <View style={styles.option}>
        <Text style={styles.label}>Mode Sombre</Text>
        <Switch />
      </View>
    </View>
  );
}
