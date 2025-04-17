import React, { useState } from 'react';
import { View, Button, TextInput, Modal, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import styles from './styles';

export default function CalendarScreen() {
  const [events, setEvents] = useState([
    {
      title: 'Exemple : réunion',
      start: new Date(),
      end: new Date(new Date().getTime() + 60 * 60 * 1000),
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week');

  const handlePressCell = (date) => {
    setSelectedDate(date);
    setModalVisible(true);
  };

  const handleAddEvent = () => {
    const newEvent = {
      title: eventTitle,
      start: selectedDate,
      end: new Date(selectedDate.getTime() + 60 * 60 * 1000),
    };
    setEvents([...events, newEvent]);
    setEventTitle('');
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <View style={styles.viewSelector}>
        <TouchableOpacity
          style={[styles.viewButton, viewMode === 'day' && styles.activeButton]}
          onPress={() => setViewMode('day')}
        >
          <Text style={styles.viewText}>Jour</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.viewButton, viewMode === 'week' && styles.activeButton]}
          onPress={() => setViewMode('week')}
        >
          <Text style={styles.viewText}>Semaine</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.viewButton, viewMode === 'month' && styles.activeButton]}
          onPress={() => setViewMode('month')}
        >
          <Text style={styles.viewText}>Mois</Text>
        </TouchableOpacity>
      </View>

      <Calendar
        events={events}
        height={600}
        mode={viewMode}
        onPressCell={handlePressCell}
        weekStartsOn={1}
        locale="fr"
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Ajouter un événement</Text>
          <TextInput
            placeholder="Titre de l'événement"
            value={eventTitle}
            onChangeText={setEventTitle}
            style={styles.input}
          />
          <Button title="Ajouter" onPress={handleAddEvent} />
          <View style={{ height: 10 }} />
          <Button title="Annuler" color="red" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}
