// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {Navbar} from "./components/Navbar.jsx"
import {Home} from "./pages/home/home.jsx"
function App() {
  return (
    <Router>
      <Navbar />  
      {/* Define Routes here */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home component for the home page */}
      </Routes>
    </Router>
  );
}

export default App;
