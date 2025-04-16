import { useState } from "react";

export const SignForm=({setIsSignUp,role})=>{
    
        const [formData, setFormData] = useState({
        role:role,
        email: "",
        password: "",
        password2: "",
        school: "",
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSignUp = (e) => {
        e.preventDefault(); // prevent page refresh
        console.log("Form Data:", formData);
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
              <form className="col" onSubmit={handleSignUp}>
              {/*  hide sign up pop up*/}
                <button onClick={()=>setIsSignUp(false)} type="button" className="btn btn-danger col-3 offset-9">
                  Close
                </button>
                <div className="row">
                  <h1 className="text-center text-success my-3 col">Inscription</h1>
                </div>
    
                <div className="mb-3">
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
    
                <div className="mb-3">
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
    
                <div className="mb-3">
                  <label className="form-label">Repeat Password</label>
                  <input
                    type="text"
                    className="form-control"
                    name="password2"
                    placeholder="Repeat Password"
                    value={formData.password2}
                    onChange={handleChange}
                  />
                </div>
    
                <div className="mb-3">
                  <label className="form-label">School</label>
                  <input
                    type="text"
                    className="form-control"
                    name="school"
                    placeholder="Last Name"
                    value={formData.school}
                    onChange={handleChange}
                  />
                </div>
              
    
                <button type="submit" className="btn btn-success col-10 offset-1">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>)
}