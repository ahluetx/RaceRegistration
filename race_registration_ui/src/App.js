// src/App.js
/*import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes , Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import LoginForm from './components/LoginForm';
import UserProfile from './components/UserProfile';
import RegistrationForm from './components/RegistrationForm';
import NavBar from './components/NavBar';
import { AuthContext } from './context/AuthContext';
//import Footer from './components/Footer';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState('');
  
  //const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('token', userData.token);
    setUser({ userId: userData.userId });
    fetchUserProfile(); // Fetch user profile after login
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    //navigate('/login');
  };

  const fetchUserProfile = async (token) => {
    try {
        const response = await fetch('/api/users/profile', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }
        const userData = await response.json();
        if (userData && userData._id) { // Check if the userData contains a valid user ID
          setUser(userData);
          if (userData.profilePicture) {
            setProfilePic(userData.profilePicture);
          }
        }
      } catch (error) {
        console.error('Profile Fetch Error:', error);
        // Handle error, e.g., redirect to login
      }
};

  return (
    <AuthProvider>
    <Router>
      <div className="app-container">
        <NavBar onLogout={handleLogout}/>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
            <Route path="/register" element={<RegistrationForm />} />
            {/* Define other routes here }
          </Routes>
        </main>
        
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
*/
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginForm from './components/LoginForm';
import UserProfile from './components/UserProfile';
import RegistrationForm from './components/RegistrationForm';
import EventCalendarPage from './pages/EventCalendarPage';
import NavBar from './components/NavBar';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  //const navigate = useNavigate();
  return (
    // Wrap your application with the AuthProvider
    <AuthProvider>
      <Router>
        <div className="app-container">
          <NavBar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/profile/:userId" element={<UserProfile />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/events" element={<EventCalendarPage />} />
              {/* Define other routes here */}
            </Routes>
          </main>
          {/* <Footer /> Uncomment if you have a footer */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
