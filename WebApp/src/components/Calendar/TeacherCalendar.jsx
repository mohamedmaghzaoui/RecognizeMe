import { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

export const TeacherCalendar = () => {
  const [courses, setCourses] = useState([]);
  const [newSession, setNewSession] = useState({
    subject: '',
    date: '',
    start_time: '',
    end_time: '',
  });
  const calendarRef = useRef(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/sessions`, {
      withCredentials: true,
    })
      .then(response => {
        const sessionData = response.data.map(session => ({
          id: session.id,
          title: session.subject,
          start: session.date + 'T' + session.start_time,
          end: session.date + 'T' + session.end_time,
        }));
        setCourses(sessionData);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des sessions !', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'start') {
      const [date, time] = value.split('T');
      setNewSession(prev => ({
        ...prev,
        date: date,
        start_time: time,
      }));
    } else if (name === 'end') {
      const [, time] = value.split('T');
      setNewSession(prev => ({
        ...prev,
        end_time: time,
      }));
    } else {
      setNewSession(prev => ({
        ...prev,
        subject: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${import.meta.env.VITE_API_URL}/sessions/`, newSession, {
      withCredentials: true,
    })
      .then(response => {
        const newSessionData = {
          id: response.data.id,
          title: response.data.subject,
          start: response.data.date + 'T' + response.data.start_time,
          end: response.data.date + 'T' + response.data.end_time,
        };
        setCourses([...courses, newSessionData]);
      })
      .catch(error => {
        console.error('Erreur lors de la création de la session !', error);
      });
  };

  const handleDelete = (eventId) => {
    axios.delete(`${import.meta.env.VITE_API_URL}/sessions/${eventId}`, {
      withCredentials: true,
    })
      .then(() => {
        setCourses(prevCourses => prevCourses.filter(course => course.id != eventId));
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de la session !', error);
      });
  };

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
        eventClick={(info) => {
          const isConfirmed = window.confirm(`Voulez-vous vraiment supprimer la session "${info.event.title}" ?`);
          if (isConfirmed) {
            handleDelete(info.event.id);
          }
        }}
        eventDidMount={(info) => {
          const now = new Date();
          const eventDate = new Date(info.event.start);
          const isSameDay = (
            now.getFullYear() === eventDate.getFullYear() &&
            now.getMonth() === eventDate.getMonth() &&
            now.getDate() === eventDate.getDate()
          );

          if (eventDate < now && !isSameDay) {
            info.el.style.backgroundColor = '#d9534f'; // rouge
          } else if (isSameDay) {
            info.el.style.backgroundColor = '#f0ad4e'; // orange
          } else {
            info.el.style.backgroundColor = '#5cb85c'; // vert
          }

          info.el.style.color = 'white';
        }}
      />

      <h3 className="mt-4">Ajouter une nouvelle session</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='form-label' htmlFor="subject">Titre de la session :</label>
          <input
            className='form-control w-25'
            type="text"
            id="subject"
            name="subject"
            value={newSession.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className='form-label' htmlFor="start">Heure de début :</label>
          <input
            className='form-control w-25'
            type="datetime-local"
            id="start"
            name="start"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className='form-label' htmlFor="end">Heure de fin :</label>
          <input
            className='form-control w-25'
            type="datetime-local"
            id="end"
            name="end"
            onChange={handleChange}
            required
          />
        </div>
        <button className='btn btn-primary my-3' type="submit">Ajouter la session</button>
      </form>
    </div>
  );
};
