// src/components/Footer.js
import { Link } from "react-router-dom";
import './Footer.css';
function Footer() {
    return (
      <footer>
        <div>
          <img src="/smileInc_logo.webp" alt="Site Logo" />
        </div>
        <div>
          <Link to="">Contact Us</Link>
          {/* Social media links */}
        </div>
      </footer>
    );
  }
  
  export default Footer;
  