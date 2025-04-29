// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Navbar } from './components/navbars/Navbar.jsx';
import {Home} from "./pages/home/home.jsx"
import { Profile } from './pages/profile/profile.jsx';
import { Tarif } from './pages/static/tarif.jsx';
import { Why } from './pages/static/why.jsx';
import { Contact } from './pages/static/contact.jsx';
import { UserProvider } from './context/context.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainCalendar } from './components/Calendar/MainCalendar.jsx';
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <UserProvider>
    <Router>
      
      <Navbar />  

      <Routes>
        <Route path="/" element={<Home />} /> {/* Home component for the home page */}
        <Route path="/profile" element={<Profile />} /> {/* Home component for the home page */}
        <Route path="/tarif" element={<Tarif />} /> {/* Home component for the home page */}
        <Route path="/why" element={<Why />} /> {/* Home component for the home page */}
        <Route path="/contact" element={<Contact />} /> {/* Home component for the home page */}
        <Route path="/calendar" element={<MainCalendar />} /> {/* Home component for the home page */}
      </Routes>
    </Router>
    </UserProvider>
    </QueryClientProvider>
   
  );
}

export default App;
