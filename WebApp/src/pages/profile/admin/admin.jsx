import { useUser } from "../../../context/context";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const fetchUsers = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/accounts/users`, {
    withCredentials: true,
  });
  return res.data;
};

const fetchClasses = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/classrooms`, {
    withCredentials: true,
  });
  return res.data;
};

const linkStudentToClass = async (studentId, classroomId) => {
  const response = await axios.patch(
    `${import.meta.env.VITE_API_URL}/accounts/assign-student/${studentId}/`,
    { classroom_id: classroomId },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const deleteUser = async (userId) => {
  const response = await axios.delete(`${import.meta.env.VITE_API_URL}/accounts/delete-user/${userId}/`, {
    withCredentials: true,
  });
  return response.data;
};

const deleteClass = async (classId) => {
  await axios.delete(`${import.meta.env.VITE_API_URL}/classrooms/${classId}/`, {
    withCredentials: true,
  });
};

export const Admin = () => {
  const [className, setClassName] = useState("");
  const [teacher, setTeacher] = useState("");  // Default teacher state
  const [selectedStudent, setSelectedStudent] = useState(""); // For linking students to a class
  const [selectedClassroom, setSelectedClassroom] = useState(""); // For selecting classroom
  const { user } = useUser();

  const { data: users = [], isLoading: isLoadingUsers, isError: isErrorUsers, refetch: refetchUsers } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const { data: classes = [], isLoading: isLoadingClasses, isError: isErrorClasses, refetch: refetchClasses } = useQuery({
    queryKey: ["classes"],
    queryFn: fetchClasses,
  });

  const teachers = users.filter((u) => u.role === "teacher");
  const students = users.filter((u) => u.role === "student");

  useEffect(() => {
    if (teachers.length > 0 && !teacher) {  // Only set default teacher if no teacher is selected
      setTeacher(teachers[0].id);  // Set the first teacher's id as default
    }
  }, [teachers, teacher]);

  const addClass = async (e) => {
    e.preventDefault(); // Prevent form refresh
    const classData = { name: className, teacher };
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/classrooms/`, classData, {
        withCredentials: true,
      });
      refetchClasses(); // Refetch classes after adding
    } catch (error) {
      console.error("Error adding class:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      refetchUsers(); // Refetch users after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleDeleteClass = async (classId) => {
    try {
      await deleteClass(classId);
      refetchClasses(); // Refetch classes after deletion
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  const handleLinkStudentToClass = async (e) => {
    e.preventDefault();  // Prevent form refresh
    try {
      await linkStudentToClass(selectedStudent, selectedClassroom);
      refetchUsers(); // Refetch users to show updated student info
      refetchClasses(); // Refetch classes after linking
    } catch (error) {
      console.error("Error linking student to class:", error);
    }
  };

  if (isLoadingUsers || isLoadingClasses) return <p className="p-4">Loading data...</p>;
  if (isErrorUsers || isErrorClasses) return <p className="p-4 text-danger">Failed to load data.</p>;

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Left: Admin Profile */}
        <div className="col-md-4">
          <div className="card shadow p-3">
            <h3 className="text-success">👨‍💼 Admin</h3>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>School:</strong> {user.school_name}</p>
            <p><strong>Address:</strong> {user.school_address}</p>
            <button className="btn btn-sm btn-success me-2 w-25"><FaEdit /></button>
          </div>

          {/* Add class */}
          <div className="card shadow p-3 my-5">
            <form onSubmit={addClass}>
              <div className="mb-2">
                <label className="form-label" htmlFor="className">Nom du classe</label>
                <input
                  required
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="Nom du classe"
                  className="form-control"
                  type="text"
                />
              </div>

              <div className="mb-2">
                <label className="form-label" htmlFor="teacher">Nom du Prof</label>
                <select
                  value={teacher}  // Use value instead of defaultValue for controlled component
                  onChange={(e) => setTeacher(e.target.value)}  // Update teacher on selection change
                  required
                  className="form-control"
                  name="teacher"
                  id="teacher"
                >
                  {teachers.map((teacherObj) => (
                    <option key={teacherObj.id} value={teacherObj.id}>
                      {teacherObj.username}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-primary mt-2">
                <FaPlus className="me-2" /> Ajouter une classe
              </button>
            </form>
          </div>

          {/* Link Student to Classroom */}
          <div className="card shadow p-3 my-5">
            <form onSubmit={handleLinkStudentToClass}>
              <div className="mb-2">
                <label className="form-label" htmlFor="student">Sélectionner un étudiant</label>
                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  required
                  className="form-control"
                  id="student"
                >
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.username}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-2">
                <label className="form-label" htmlFor="classroom">Sélectionner une classe</label>
                <select
                  value={selectedClassroom}
                  onChange={(e) => setSelectedClassroom(e.target.value)}
                  required
                  className="form-control"
                  id="classroom"
                >
                  {classes.map((classroom) => (
                    <option key={classroom.id} value={classroom.id}>
                      {classroom.name}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-primary mt-2">
                Lier l'étudiant à la classe
              </button>
            </form>
          </div>
        </div>

        {/* Right: Users List */}
        <div className="col-md-8">
          {/* Teachers */}
          <div className="card shadow mb-4 p-3">
            <h4 className="text-success">👩‍🏫 Profs</h4>
            {teachers.length === 0 ? (
              <p>No teachers found.</p>
            ) : (
              <ul className="list-group">
                {teachers.map((t) => (
                  <li key={t.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {t.username} ({t.email})
                    <div>
                      <button className="btn btn-sm btn-warning me-2"><FaEdit /></button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDeleteUser(t.id)}><FaTrash /></button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Students */}
          <div className="card shadow p-3 mb-4">
            <h4 className="text-success">🎓 Etudiants</h4>
            {students.length === 0 ? (
              <p>No students found.</p>
            ) : (
              <ul className="list-group">
                {students.map((s) => (
                  <li key={s.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {s.username} ({s.email})
                    <br />
                    {s.classroom_name}
                    <div>
                      <button className="btn btn-sm btn-warning me-2"><FaEdit /></button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDeleteUser(s.id)}><FaTrash /></button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Classes */}
          <div className="card shadow p-3 mb-4">
            <h4 className="text-success">🎓 Classes</h4>
            {classes.length === 0 ? (
              <p>No Class found.</p>
            ) : (
              <ul className="list-group">
                {classes.map((c) => {
                  const teacher = teachers.find((t) => t.id === c.teacher);  // Find teacher by ID
                  return (
                    <li key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
                      {c.name} ({teacher ? teacher.username : 'Unknown Teacher'})  {/* Display teacher's name */}
                      <div>
                        <button className="btn btn-sm btn-warning me-2"><FaEdit /></button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteClass(c.id)}><FaTrash /></button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
