import { Link } from 'react-router-dom';

import { useState } from 'react';
import { Login } from '../pages/login/login';
import { SignUpPopUp } from '../pages/signUp/signPopUp';
export const Navbar=()=>{
    //login and sign pop ups states
    const [isLogin,setIsLogin]= useState(false)
    // const [isSignUp,setIsSignUp]=useState(false)
    
    
  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark" >
  <div className="container-fluid">
    <a className="navbar-brand text-blue-600" href="#">RecognizeMe</a> {/* Tailwind utility for text color */}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-5">
        <li className="nav-item mx-2">
          <Link className='nav-link' to={"/"}>Accueil</Link>
        </li>
        <li className="nav-item mx-2">
          <Link className='nav-link' to={"/tarif"}>Tarifs</Link>
        </li>
        <li className="nav-item mx-2">
          <Link className='nav-link' to={"/why"}>Pourquoi</Link>
        </li>
        <li className="nav-item mx-2">
          <Link className='nav-link' to={"/contact"}>Contact</Link>
        </li>
        <li className="nav-item offset-10">
          <button onClick={() => setIsLogin(true)} className='btn btn-success'>Connexion</button>
        </li>
        <li className="nav-item ms-5">
          <button onClick={() => setIsLogin(true)} className='btn btn-primary'>Aide</button>
        </li>
        {/* <li onClick={() => setIsSignUp(true)} className="nav-item mx-5">
          <button className='btn btn-success'>Inscription</button>
        </li> */}
      </ul>
      
    </div>
  </div>
  {isLogin && <Login setIsLogin={setIsLogin} />}
  {/* {isSignUp && <SignUpPopUp setIsSignUp={setIsSignUp} />} */}
</nav>

  );
}
