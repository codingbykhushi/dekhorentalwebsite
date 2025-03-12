import React, { useState } from "react";
import contactbg from "../img/contactroom.png"
import axios from "axios";
import MyNavbar from "./Navbar.js";
import "../css/Contact.css";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = "http://localhost:3001/api/contacts/submit";
    
    try {
      const response = await axios.post(apiUrl, formData);
      console.log(response, "Response from API");
      
      if (response.status === 201) {
        setSuccess(true);
        setError("");
        setFormData({ name: "", contact: "", email: "", message: "" });
      }
    } catch (err) {
      setSuccess(false);
      setError("Failed to send message. Please try again later.");
    }
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${contactbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          height: "84vh",
          width: "100vw",
          margin: "0",
          padding: "0",
        }}
      >
        <MyNavbar />
      </div>

      <div className="contact-container">
        <div className="contact-form-section">
          <h2>Contact Us</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>Name <span>*</span></label>
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />

            <label>Email <span>*</span></label>
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />

            <label>Phone Number <span>*</span></label>
            <input type="text" name="contact" placeholder="Your Phone Number" value={formData.contact} onChange={handleChange} required />

            <label>Message <span>*</span></label>
            <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required></textarea>

            <button type="submit">Send Message</button>
          </form>

          {success && <p className="success-message">Message sent successfully!</p>}
          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="contact-info-section">
          <div className="map-container">
            <h3>Find Us Here</h3>
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.065283086247!2d75.6945853!3d31.2529053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5f00116d42d7%3A0x7ce8950d5cf2e2ae!2sDekho%20Rentals!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          <div className="meet-us">
            <h3>Meet Us</h3>
            <p><strong>Address:</strong> Dekho Rentals, Near Ashiana PG, Law Gate, LPU, Phagwara, Punjab,INDIA</p>
            <p><strong>Email:</strong> dekhorentals@gmail.com</p>
            <p><strong>Phone:</strong> +91 9876543210</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
