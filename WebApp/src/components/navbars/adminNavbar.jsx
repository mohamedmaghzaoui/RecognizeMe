import { Link } from 'react-router-dom';

import { useState } from 'react';
import {SignUpPopUp} from "../../pages/signUp/signPopUp" 
export const AdminNavbar=({logout})=>{
    
    const [isSignUp,setIsSignUp]=useState(false)
    
    
  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark" >
  <div className="container-fluid">
    <a className="navbar-brand text-blue-600" href="#">RecognizeMe</a> {/* Tailwind utility for text color */}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-5">
        <li className="nav-item mx-5">
          <Link className='nav-link' to={"/profile"}>Profile</Link>
        </li>
        
        <li className="nav-item offset-10 col-5">
          <button onClick={() => setIsSignUp(true)} className='btn btn-success '>Ajouter un utilisateur</button>
        </li>
        <li className="nav-item offset-10 ">
          <button onClick={() => logout()} className='btn btn-danger'>deconnexion</button>
        </li>
    
    
      </ul>
      
    </div>
  </div>
  
  {isSignUp && <SignUpPopUp setIsSignUp={setIsSignUp} />}
</nav>

  );
}
