import { useState } from "react";
import "./login.css";

export const Login = ({setIsLogin}) => { //props to show hide login popup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (e) => {
    e.preventDefault(); // prevent form refresh
    const userData = { email, password };
    console.log("Login Data:", userData);
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
          {/* hide login pop ups*/}
            <button  onClick={()=>{setIsLogin(false)}} className="btn btn-danger col-3 offset-9">
              Close
            </button>
            <div className="row">
              <h1 className="text-center text-primary my-3 col">Login</h1>
            </div>

            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                className="form-control"
                placeholder="Email"
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
          </form>
        </div>
      </div>
    </div>
  );
};
