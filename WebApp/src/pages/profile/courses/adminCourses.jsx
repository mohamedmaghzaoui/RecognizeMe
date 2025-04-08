import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export const AdminCourses = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Cours de React",
      professor: "Prof. Claire",
      class: "B1",
      domain: "Développement Web",
      level: "B1",
      startDate: "2025-04-05",
      endDate: "2025-04-05",
      students: [
        { id: 1, name: "Étudiant A", isPresent: true, date: "2025-04-08" },
        { id: 2, name: "Étudiant B", isPresent: false, date: "2025-04-08" },
      ],
    },
    {
      id: 2,
      name: "Cours de JavaScript",
      professor: "Prof. Denis",
      class: "B2",
      domain: "Développement Web",
      level: "B2",
      startDate: "2025-04-08",
      endDate: "2025-04-08",
      students: [
        { id: 3, name: "Étudiant C", isPresent: true, date: "2025-04-08" },
        { id: 4, name: "Étudiant D", isPresent: false, date: "2025-04-08" },
      ],
    },
  ]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, "0")}-${selectedDate.getDate().toString().padStart(2, "0")}`;

  const filteredCourses = courses.filter(
    (course) => course.startDate === formattedDate || course.endDate === formattedDate
  );

  return (
    <div>
      <div>
        <label>Date de sélection:</label>
        <input
          type="text"
          value={formattedDate}
          onFocus={() => setShowCalendar(true)}
          readOnly
        />
        {showCalendar && (
          <div className="calendar-container">
            <Calendar onChange={handleDateChange} value={selectedDate} />
          </div>
        )}
      </div>

      <div className="courses">
        <h3>Cours pour le {formattedDate}</h3>
        {filteredCourses.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Cours</th>
                <th>Professeur</th>
                <th>Classe</th>
                <th>Domain</th>
                <th>Présence des étudiants</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id}>
                  <td>{course.name}</td>
                  <td>{course.professor}</td>
                  <td>{course.class}</td>
                  <td>{course.domain}</td>
                  <td>
                    {course.students.map((student) => (
                      <div key={student.id}>
                        {student.name} : {student.isPresent ? "Présent" : "Absent"}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aucun cours trouvé pour cette date.</p>
        )}
      </div>
    </div>
  );
};


