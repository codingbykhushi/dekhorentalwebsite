import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import logo from "../img/logoroom.png";

function MyNavbar({ onLogout, role }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <React.Fragment>
      <nav className="header-container">
        {/* Hamburger Menu Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? "✖" : "☰"}
        </div>

        {/* Logo */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <img src={logo} alt="Logo" width="150" height="100" className="me-2" />
        </Link>

        {/* Links Container - Toggle Class Based on State */}
        <div className={`links-container ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="header-link"><small>Home</small></Link>
          <Link to="/about" className="header-link"><small>About Us</small></Link>
          <Link to="/services" className="header-link"><small>Services</small></Link>
          <Link to="/rooms" className="header-link"><small>Rooms</small></Link>
          <Link to="/contact" className="header-link"><small>Contact Us</small></Link>
          <Link to="/signIn" className="header-link"><small>SignIn</small></Link>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default MyNavbar;
