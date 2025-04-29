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
  const calendarRef = useRef(null);  // Ref for FullCalendar instance

  // Récupérer les sessions du backend
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/sessions`, {
      withCredentials: true,
    })
      .then(response => {
        const sessionData = response.data.map(session => ({
          id: session.id,  // Assuming each session has an id
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

  // Gestion des champs du formulaire
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

  // Envoi du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${import.meta.env.VITE_API_URL}/sessions/`, newSession, {
      withCredentials: true,
    })
      .then(response => {
        const newSessionData = {
          id: response.data.id,  // Assuming the response contains the session ID
          title: response.data.subject,
          start: response.data.date + 'T' + response.data.start_time,
          end: response.data.date + 'T' + response.data.end_time,
        };
        setCourses([...courses, newSessionData]);  // Update state without re-fetching
      })
      .catch(error => {
        console.error('Erreur lors de la création de la session !', error);
      });
  };

  // Supprimer une session
  const handleDelete = (eventId) => {
    axios.delete(`${import.meta.env.VITE_API_URL}/sessions/${eventId}`, {
      withCredentials: true,
    })
      .then(() => {
        // Just update the state — FullCalendar will re-render based on updated props
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
        ref={calendarRef}  // Attach the ref to the FullCalendar component
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
          // Ask for confirmation before deleting the event
          const isConfirmed = window.confirm(`Voulez-vous vraiment supprimer la session "${info.event.title}" ?`);
          if (isConfirmed) {
            handleDelete(info.event.id);  // Delete the session and update the state without reload
          }
        }}
      />

      <h3>Ajouter une nouvelle session</h3>
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
