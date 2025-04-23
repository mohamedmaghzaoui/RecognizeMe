import { useState } from "react";
import axios from "axios";
import "./login.css";

export const LoginForm = ({ setIsLogin, role }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(false); // To manage the spinner visibility

  const loginUser = async (e) => {
    e.preventDefault(); // prevent form refresh

    const userData = { username, password, role };

    setLoading(true); // Show the spinner

    try {
      const response = await axios.post(
        `${apiUrl}/accounts/login`, // Use the API URL from the .env file
        userData,
        {
         
          withCredentials: true, // Include cookies for session authentication
        }
      );

      setLoading(false); // Hide the spinner once the request is complete

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        // Handle successful login (e.g., redirect or store authentication data)
      } else {
        console.error("Login failed:", response.data);
        // Handle login failure (e.g., show error message)
      }
    } catch (error) {
      setLoading(false); // Hide the spinner if an error occurs
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="overlay">
      <div className="content col-6">
        <div className="row">
          <div className="col-6">
            <img
              className="img-fluid w-100 h-100"
              src="https://img.freepik.com/vecteurs-premium/illustration-vectorielle-personnage-debout-devant-interface-utilisateur-ecran-mobile-qui-affiche-page-connexion_1108340-493.jpg?w=740"
              alt=""
            />
          </div>
          <form className="col" onSubmit={loginUser}>
            <button
              onClick={() => {
                setIsLogin(false);
              }}
              className="btn btn-danger col-3 offset-9"
            >
              Close
            </button>
            <div className="row">
              <h1 className="text-center text-primary my-3 col">Login</h1>
            </div>

            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                required
                type="text"
                className="form-control"
                placeholder="Username"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>

            <button type="submit" className="btn btn-primary col-10 offset-1">
              Login
            </button>
            
            {/* Displaying the loading spinner while waiting for the request */}
            {loading && (
              <div className="d-flex justify-content-center mt-3">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
