import React from "react";
import MyNavbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import "../css/Service.css"
import Service2 from "../img/service2.png";
import ser1 from "../img/1.png";
import ser2 from "../img/2.png";
import ser3 from "../img/3.png";
import ser4 from "../img/4.png";
import ser5 from "../img/5.png";
import ser6 from "../img/6.jpg";
import ser7 from "../img/7.jpg";
import ser8 from "../img/8.png";
import ser9 from "../img/9.webp";

function Services() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: `url(${Service2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          height: "100vh",
          width: "100vw",
          margin: "0",
          padding: "0",
        }}
      >
        <MyNavbar />
      </div>

      {/* Our Services Section */}
      <div className="service-hero">
        <h1 className="d-flex justify-content-center text-align-center mt-3">
          Our Services
        </h1>
        <p className="d-flex justify-content-center text-align-center mt-3">
          Find the best rental solutions tailored to your needs.
        </p>
      </div>

      {/* Service Cards */}
      <div className="container mt-5">
        <div className="row">
          {/* First Row */}
          <div className="col-md-4 text-center">
            <div className="service-card">
              <img src={ser1} alt="Room Listings" className="service-img" />
              <h3>Verified Room Listings</h3>
              <p>
                Explore a wide range of verified rental rooms with real images.
              </p>
            </div>
          </div>

          <div className="col-md-4 text-center">
            <div className="service-card">
              <img src={ser2} alt="Easy Booking" className="service-img" />
              <h3>Easy Booking</h3>
              <p>Book your desired room hassle-free with our secure system.</p>
            </div>
          </div>

          <div className="col-md-4 text-center">
            <div className="service-card">
              <img src={ser3} alt="24/7 Support" className="service-img" />
              <h3>24/7 Customer Support</h3>
              <p>Our support team is always available for your assistance.</p>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          {/* Second Row */}
          <div className="col-md-4 text-center">
            <div className="service-card">
              <img src={ser4} alt="Secure Payments" className="service-img" />
              <h3>Secure Payments</h3>
              <p>
                Make transactions with confidence using our payment gateway.
              </p>
            </div>
          </div>

          <div className="col-md-4 text-center">
            <div className="service-card">
              <img
                src={ser5}
                alt="Rental Assistance"
                className="service-img"
              />
              <h3>Rental Assistance</h3>
              <p>
                We help you find the best rental solution as per your needs.
              </p>
            </div>
          </div>

          <div className="col-md-4 text-center">
            <div className="service-card">
              <img
                src={ser6}
                alt="Affordable Pricing"
                className="service-img"
              />
              <h3>Affordable Pricing</h3>
              <p>Get the best deals on rental rooms within your budget.</p>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          {/* Third Row (New Services Added) */}
          <div className="col-md-4 text-center">
            <div className="service-card">
              <img
                src={ser7}
                alt="Instant Booking"
                className="service-img"
              />
              <h3>Instant Room Booking</h3>
              <p>Skip the waiting list and book your room instantly.</p>
            </div>
          </div>

          <div className="col-md-4 text-center">
            <div className="service-card">
              <img
                src={ser8}
                alt="User Reviews"
                className="service-img"
              />
              <h3>User Reviews & Ratings</h3>
              <p>Check honest reviews and ratings from previous tenants.</p>
            </div>
          </div>

          <div className="col-md-4 text-center">
            <div className="service-card">
              <img
                src={ser9}
                alt="Legal Agreement"
                className="service-img"
              />
              <h3>Legal Rental Agreements</h3>
              <p>
                Get legally documented rental agreements for hassle-free
                renting.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="cta-section text-center mt-5">
        <h2>Looking for a rental room?</h2>
        <p>Find your ideal home today!</p>

        <button
          onClick={() => navigate("/rooms")}
          className="btn btn-primary small-button"
          style={{ height: 50, width: 150 }}
        >
          Explore Now
        </button>
      </div>
    </div>
  );
}

export default Services;
