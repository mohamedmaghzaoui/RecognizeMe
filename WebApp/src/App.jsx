import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbars/Navbar.jsx';
import { Home } from "./pages/home/home.jsx";
import { Profile } from './pages/profile/profile.jsx';
import { Tarif } from './pages/static/tarif.jsx';
import { Why } from './pages/static/why.jsx';
import { Contact } from './pages/static/contact.jsx';
import { UserProvider } from './context/context.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainCalendar } from './components/Calendar/MainCalendar.jsx';
import { Predict } from './pages/predict/predict.jsx';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router> {/* Router OUTSIDE UserProvider */}
        <UserProvider> {/* Now UserProvider is inside Router */}
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tarif" element={<Tarif />} />
            <Route path="/why" element={<Why />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/calendar" element={<MainCalendar />} />
            <Route path="/predict" element={<Predict />} />
          </Routes>
        </UserProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
