import { useEffect, useState } from "react";
import axios from "axios";
import "./Predict.css"; // CSS Animations

export const Predict = () => {
  const [students, setStudents] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/accounts/users`,
          { withCredentials: true }
        );

        const filtered = res.data.filter(
          (user) => user.role === "student" && user.classroom_name
        );

        setStudents(filtered);
      } catch (err) {
        setError("Failed to load students.");
      }
    };

    fetchUsers();
  }, []);

  const handlePredict = async () => {
    if (!selectedId) return;

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/attendance/predict/${selectedId}`,
        { withCredentials: true }
      );
      setResult(res.data);
    } catch (err) {
      setError("Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">📊 Predict Attendance & Behavior</h2>

      {/* Select Student */}
      <div className="mb-3">
        <label className="form-label">Select a Student</label>
        <select
          className="form-select"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          <option value="">-- Choose Student --</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.username} 
            </option>
          ))}
        </select>
      </div>

      {/* Predict Button */}
      <button
        className="btn btn-primary w-100"
        onClick={handlePredict}
        disabled={!selectedId || loading}
      >
        {loading ? (
          <span className="spinner-border spinner-border-sm me-2" />
        ) : (
          "Predict"
        )}
        {loading ? "Analyzing..." : "Get Prediction"}
      </button>

      {/* Result */}
      {result && (
        <div className="mt-4 result-box fade-in">
          <h5>✅ Results</h5>
          <p><strong>Presence:</strong> {result.presence_prediction}</p>
          <p><strong>Behavior:</strong> {result.behavior_analysis}</p>
          <p><strong>Cluster Insight:</strong> {result.behavior_cluster}</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};
