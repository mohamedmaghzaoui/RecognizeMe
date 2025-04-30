import { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

export const StudentCalendar = () => {
  const [courses, setCourses] = useState([]);
  const calendarRef = useRef(null);

  // Fetch sessions from the backend
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/sessions`, {
      withCredentials: true,
    })
      .then(response => {
        const sessionData = response.data.map(session => {
          const startDate = new Date(session.date + 'T' + session.start_time);
          const endDate = new Date(session.date + 'T' + session.end_time);
          const now = new Date();
          let backgroundColor = '';

          // Set background color based on event date
          if (startDate < now) {
            backgroundColor = '#9E2A2F'; // Dark red for past events
          } else if (startDate.toDateString() === now.toDateString()) {
            backgroundColor = '#D19A00'; // Dark yellow for today
          } else {
            backgroundColor = '#4C9A2A'; // Dark green for future events
          }

          return {
            id: session.id,
            title: session.subject,
            start: startDate,
            end: endDate,
            backgroundColor: backgroundColor, // Background color based on date
            borderColor: backgroundColor, // Ensure the border color matches the background
          };
        });
        setCourses(sessionData);
      })
      .catch(error => {
        console.error('Error fetching sessions:', error);
      });
  }, []);

  return (
    <div className="p-4">
      <h2>Emploi du temps</h2>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        allDaySlot={false}
        events={courses}
        locale="fr"
        height="auto"
        editable={false}  // Prevent editing of events
        droppable={false} // Prevent dragging of events
        selectable={false} // Prevent selecting events
        eventDidMount={(info) => {
          // Get the event's date and apply background color dynamically
          const eventDate = new Date(info.event.start);
          const now = new Date();

          const isSameDay = (
            now.getFullYear() === eventDate.getFullYear() &&
            now.getMonth() === eventDate.getMonth() &&
            now.getDate() === eventDate.getDate()
          );

          // Apply background color based on event's date
          if (eventDate < now && !isSameDay) {
            info.el.style.backgroundColor = '#9E2A2F'; // Dark red for past events
          } else if (isSameDay) {
            info.el.style.backgroundColor = '#D19A00'; // Dark yellow for today
          } else {
            info.el.style.backgroundColor = '#4C9A2A'; // Dark green for future events
          }

          info.el.style.color = 'white'; // Text color for events
        }}
      />
    </div>
  );
};
