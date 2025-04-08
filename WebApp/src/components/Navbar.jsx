import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState } from 'react';
import { Login } from '../pages/login/login';
import { SignUp } from '../pages/signUp/signUp';
export const Navbar=()=>{
    //login and sign pop ups states
    const [isLogin,setIsLogin]= useState(false)
    const [isSignUp,setIsSignUp]=useState(false)
    
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid"> 
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <Link className='nav-link' to={"/"}>Accueil</Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link' to={"/profile"}>Profile</Link>
            </li>
            <li className="nav-item offset-10">
            <button onClick={()=>setIsLogin(true)} className='btn btn-primary '>Connexion</button>
            </li>
            <li onClick={()=>setIsSignUp(true)} className="nav-item mx-5">
            <button className='btn btn-success '>Inscription</button>
            </li>
          
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
      {isLogin && <Login setIsLogin={setIsLogin}/>}
      {isSignUp && <SignUp setIsSignUp={setIsSignUp}/>}
    </nav>
  );
}
