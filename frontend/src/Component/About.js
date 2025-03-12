import React from "react";
import aboutbg from "../img/aboutback.jpg";
import aboutbg2 from "../img/aboutimg.jpg"
import "../css/About.css";
import MyNavbar from "./Navbar";


function About() {
  return (
    <div>
     
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100vw",
          margin: "0",
          padding: "0",
        }}
      >
        <div
          style={{
            backgroundImage: `url(${aboutbg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            height: "100%",
            width: "100%",
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "0",
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: 1,
          }}
        ></div>
        <MyNavbar />

  
        <div
          style={{
            position: "relative",
            zIndex: 2,
            color: "white",
            textAlign: "center",
            paddingTop: "50px",
          }}
        >
          <div className="d-flex justify-content-center flex-column mt-5">
            <h1
              style={{ fontSize: "36px", fontWeight: "bold", color: "white" }}
            >
              About
            </h1>
            <h2
              style={{
                fontSize: "25px",
                fontWeight: "500",
                marginTop: "20px",
                color: "white",
              }}
            >
              Dekho Rentals provides comfortable, fully furnished rooms <br />
              that cater to your lifestyle and budget.
            </h2>
          </div>
        </div>
      </div>

 
      <div className="d-flex flex-column align-items-center text-center mt-5 px-3">
        <h1 style={{ color: "#C71585", fontSize: "32px", fontWeight: "bold" }}>
          About Us
        </h1>
        <h2 className="mt-3" style={{ fontSize: "28px", fontWeight: "500" }}>
          Dekho Rentals connects you to affordable, <br />
          fully furnished rooms tailored to your needs.
        </h2>

        <p
          className="mt-3"
          style={{
            maxWidth: "1000px",
            fontSize: "18px",
            lineHeight: "1.6",
            color: "#0A0A0A80",
          }}
        >
          At Dekho Rentals, we understand how important it is to find the right
          living space. That’s why we connect students, professionals, and
          families with fully furnished, affordable rooms that fit their needs
          and lifestyle.
          <br />
          <br />
          We are committed to making your rental experience seamless and
          stress-free. From finding the perfect room to handling all the
          necessary paperwork, we offer end-to-end support for a hassle-free
          stay.
          <br />
          With years of experience in property management, we ensure that all
          rooms meet high standards of quality, security, and comfort. Our
          transparent pricing and flexible options make it easy to find a home
          that suits your budget and preferences.
          <br />
          Let us help you find a place to call home—where comfort and
          convenience come together.
        </p>
      </div>

      {/* Vision & Mission Section */}
      <div className="container mt-5">
        <div className="row text-center">
          <div className="col-md-6">
            <h3
              style={{ color: "#C71585", fontSize: "26px", fontWeight: "bold" }}
            >
              Our Vision
            </h3>
            <h2
              className="mt-4"
              style={{ fontSize: "24px", fontWeight: "500", lineHeight: "1.6" }}
            >
              To provide affordable, high-quality living spaces <br />
              that meet the needs of every individual.
            </h2>
          </div>

          <div className="col-md-6">
            <h3
              style={{ color: "#C71585", fontSize: "26px", fontWeight: "bold" }}
            >
              Our Mission
            </h3>
            <h2
              className="mt-4"
              style={{ fontSize: "24px", fontWeight: "500", lineHeight: "1.6" }}
            >
              To offer accessible, well-maintained, and <br />
              affordable living spaces for everyone.
            </h2>
          </div>
        </div>

        {/* About Image */}
        <img
          src={aboutbg2}
          className="img-fluid rounded mt-3"
          alt="About Us"
          style={{ height: "500px", width: "100%" }}
        />
      </div>

      {/* Why Us Section */}
      <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-4">
            <h1 style={{ color: "#C71585", fontSize: "20px" }}>Why Us</h1>
            <h2
              style={{ fontSize: "26px", fontWeight: "500", lineHeight: "1.6" }}
            >
              Find your ideal room <br />
              with ease, anywhere and <br />
              anytime, with Dekho Rentals!
            </h2>
          </div>

          {/* Features Section */}
          <div className="col-md-4">
            <h3 style={{ fontSize: "24px", fontWeight: "bold" }}>
              <i
                className="fas fa-arrow-right"
                style={{ color: "#C71585", marginRight: "10px" }}
              ></i>
              Customized Living Spaces
            </h3>
            <p
              style={{
                fontSize: "18px",
                color: "#0A0A0A80",
                lineHeight: "1.6",
              }}
            >
              Our rooms are designed to cater to your unique lifestyle, offering
              a perfect blend of comfort and functionality.
            </p>

            <h3
              className="mt-3"
              style={{ fontSize: "24px", fontWeight: "bold" }}
            >
              <i
                className="fas fa-arrow-right"
                style={{ color: "#C71585", marginRight: "10px" }}
              ></i>
              Stay Anytime, Anywhere
            </h3>
            <p
              style={{
                fontSize: "18px",
                color: "#0A0A0A80",
                lineHeight: "1.6",
              }}
            >
              Whether you need a short-term or long-term stay, our flexible
              rental options let you find the perfect place.
            </p>
          </div>

          <div className="col-md-4">
            <h3 style={{ fontSize: "24px", fontWeight: "bold" }}>
              <i
                className="fas fa-arrow-right"
                style={{ color: "#C71585", marginRight: "10px" }}
              ></i>
              Expert Property Management
            </h3>
            <p
              style={{
                fontSize: "18px",
                color: "#0A0A0A80",
                lineHeight: "1.6",
              }}
            >
              Our team ensures your experience is seamless, with prompt
              maintenance and reliable support at every step.
            </p>

            <h3
              className="mt-3"
              style={{ fontSize: "24px", fontWeight: "bold" }}
            >
              <i
                className="fas fa-arrow-right"
                style={{ color: "#C71585", marginRight: "10px" }}
              ></i>
              Affordable Payment Plans
            </h3>
            <p
              style={{
                fontSize: "18px",
                color: "#0A0A0A80",
                lineHeight: "1.6",
              }}
            >
              We offer flexible, transparent pricing with no hidden charges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
