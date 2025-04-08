import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // pour drag/drop ou clics

export const Calendar=()=> {
  const courses = [
    {
      title: 'Mathématiques',
      start: '2025-04-10T09:00:00',
      end: '2025-04-10T10:30:00'
    },
    {
      title: 'Physique',
      start: '2025-04-11T14:00:00',
      end: '2025-04-11T15:30:00'
    },
    {
      title: 'Informatique',
      start: '2025-04-12T08:00:00',
      end: '2025-04-12T10:00:00'
    }
  ];

  return (
    <div className="p-4">
      <h2>Emploi du temps</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth" 
        headerToolbar={{
        start: "prev,next today",
        center: "title",
        end: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
        allDaySlot={false}
        events={courses}
        locale="fr"
        height="auto"
      />
    </div>
  );
}
