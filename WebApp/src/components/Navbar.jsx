import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom';
export default function Navbar() {
    return (
        <>
            <nav className="navbar bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">RecognizeMe</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                <Link to={"/classes"}>Classes</Link>
                                </li>
                                <li className="nav-item">
                                <Link to={"/students"}>Etudiants</Link>
                                </li>
                                
                                <button className='btn btn-primary my-4'>Connexion</button>
                                <button className='btn btn-success'>Inscription</button>
                            </ul>
                        </div>
                    </div>
                    <a class="navbar-brand" href="#">RecognizeMe</a>
                </div>
            </nav>
        </>
    )
}
