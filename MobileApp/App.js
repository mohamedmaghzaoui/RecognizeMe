import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/Home/HomeScreen';
import ScanScreen from './screens/Scan/ScanScreen';
import CalendarScreen from './screens/Calendar/CalendarScreen';
import SettingsScreen from './screens/Settings/SettingsScreen';
import ProfileScreen from './screens/Profile/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Accueil':
                iconName = 'home-outline';
                break;
              case 'Scan':
                iconName = 'scan-outline';
                break;
              case 'Calendrier':
                iconName = 'calendar-outline';
                break;
              case 'Profil':
                iconName = 'person-outline';
                break;
              case 'Settings':
                iconName = 'settings-outline';
                break;
              default:
                iconName = 'ellipse-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#1A3D2F',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Accueil" component={HomeScreen} />
        <Tab.Screen name="Scan" component={ScanScreen} />
        <Tab.Screen name="Calendrier" component={CalendarScreen} />
        <Tab.Screen name="Profil" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
