// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {Navbar} from "./components/Navbar.jsx"
import {Home} from "./pages/home/home.jsx"
import { Profile } from './pages/profile/profile.jsx';
import { Tarif } from './pages/static/tarif.jsx';
import { Why } from './pages/static/why.jsx';
import { Contact } from './pages/static/contact.jsx';
function App() {
  return (
    <Router>
    
      <Navbar />  
      {/* Define Routes here */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home component for the home page */}
        <Route path="/profile" element={<Profile />} /> {/* Home component for the home page */}
        <Route path="/tarif" element={<Tarif />} /> {/* Home component for the home page */}
        <Route path="/why" element={<Why />} /> {/* Home component for the home page */}
        <Route path="/contact" element={<Contact />} /> {/* Home component for the home page */}
      </Routes>
    </Router>
  );
}

export default App;
