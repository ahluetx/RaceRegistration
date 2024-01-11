// src/components/NavBar.js
import './NavBar.css';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/events">Event Calendar</Link></li>
        <li><Link to="/register-event">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
