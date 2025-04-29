import { useState } from "react";
import axios from "axios";
export const SignForm=({setIsSignUp})=>{
  const apiUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false); // To manage the spinner visibility

  const AddUser = async (e) => {
    
    e.preventDefault(); // prevent form refresh

    console.log(formData)

    setLoading(true); // Show the spinner

    try {
      const response = await axios.post(
        `${apiUrl}/accounts/register`, // Use the API URL from the .env file
        formData,
        {
         
          withCredentials: true, // Include cookies for session authentication
        }
      );

      

      if (response.status >= 200 && response.status < 300) {

        console.log("Register user successful:", response.data);
        setIsSignUp(false); // Hide login only after successful login
      }
      else {
        console.error("Register failed:", response.data);
        // Handle login failure (e.g., show error message)
      }
    } catch (error) {
      setLoading(false); // Hide the spinner if an error occurs
      console.error("An error occurred:", error);
    }
  };
    
        const [formData, setFormData] = useState({
        role:"",
        username:"",
        email: "",
        password: "",
        first_name:"",
        last_name:"",
      });

    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSignUp = (e) => {
        e.preventDefault(); // prevent page refresh
        AddUser(e)
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
              <form  className="col" onSubmit={handleSignUp}>
              {/*  hide sign up pop up*/}
                <button onClick={()=>setIsSignUp(false)} type="button" className="btn btn-danger col-3 offset-9">
                  Close
                </button>
                <div className="row">
                  <h1 className="text-center text-success my-3 col">Ajouter un utilisateur</h1>
                </div>
    
                <div className="mb-1">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>
    
                <div className="mb-1">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
    
             
    
                <div className="mb-2">
  <label className="form-label">Role</label>
  <select
    value={formData.role}
    className="form-control"
    name="role"
    id="role"
    onChange={handleChange} // <-- Fix here
  >
    <option value="">Sélectionnez un rôle</option>
    <option value="student">Etudiant</option>
    <option value="teacher">Prof</option>
  </select>
</div>
              
    
                <button type="submit"  className="btn btn-success col-10 offset-1">
                  Ajouter 
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
        </div>)
}