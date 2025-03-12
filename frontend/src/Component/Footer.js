import React from "react";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaFacebookF,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6"; // X (New Twitter Icon)
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h5>About Us</h5>
          <ul>
            <li><a href="/about">How it Works</a></li>
            <li><a href="/rooms">Rooms</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/services">Our Service</a></li>
            <li><a href="/contact">Become a Partner</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h5>Follow Us</h5>
          <div className="social-icons mt-3">
            <a href="https://facebook.com"><FaFacebookF size={20} color="blue" /></a>
            <a href="https://twitter.com"><FaX size={20} color="black" /></a> {/* Updated Icon */}
            <a href="https://youtube.com"><FaYoutube size={20} color="red" /></a>
            <a href="https://www.instagram.com/dekho_rentals?igsh=NXVwcXNndG1zMjAz"><FaInstagram size={20} color="#E1306C" /></a>
          </div>
        </div>

        <div className="footer-section">
          <h5>Contact</h5>
          <p>+91 98159 78955</p>
          <p>Dekho Rentals, Near Ashiana Pg,<br /> Punjab, IND</p>
        </div>

        <div className="footer-section">
          <h5>Support</h5>
          <p>
            Need any help? <a href="mailto:contact@info.com"><br />dekhorentals@gmail.com</a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; 2025 Dekho Rentals. All Rights Reserved.
      </div>

      <div className="whatsapp-icon">
        <a href="https://wa.me/919815978955" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp size={30} />
        </a>
      </div>

      <div className="call-icon">
        <a href="tel:+919815978955">
          <FaPhoneAlt size={30} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
