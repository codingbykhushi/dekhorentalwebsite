


import { useContext } from "react";
import { OffersContext } from "./context/OfferContext";
import "../css/UserHome.css";
import bgimg from "../img/backgroundimg.jpg";
import bookingirl from "../img/booking girl.png";
import MyNavbar from "./Navbar";
import "../css/Home.css";
import bengluruImg from "../img/bangluru.jpeg"
import bhubneshwarImg from "../img/bhubneshware.jpeg"
import chennaiImg from "../img/chennai.jpeg"
import coimbtore from "../img/coimbatore.jpg";
import gurgaonImg from "../img/gurgoan.jpg"
import HydrabadImg from "../img/hydrabad.jpeg"
import IndorImg from "../img/indore.jpeg"
import MumbaiImg from "../img/mumbai.jpeg"
import NewDehliImg from "../img/newdehli.jpeg"
import noidaimg from "../img/noida.jpg"
import puneImg from "../img/pune.jpeg"
import panjabImg from "../img/panjab.jpg"
import { useNavigate } from "react-router-dom";



const cities = [
  { name: "Bengaluru", img: bengluruImg },
  { name: "Bhubaneswar", img: bhubneshwarImg },
  { name: "Chennai", img:chennaiImg },
  { name: "Coimbatore", img: coimbtore},
  { name: "Gurgaon", img: gurgaonImg },
  { name: "Hyderabad", img: HydrabadImg },
  { name: "Indore", img: IndorImg},
  { name: "Mumbai", img: MumbaiImg },
  { name: "New Delhi", img:NewDehliImg},
  { name: "Noida", img:noidaimg },
  { name: "Pune", img: puneImg },
  { name: "Panjab", img:panjabImg },
];

function HomePage() {
  const { offers } = useContext(OffersContext);
  const navigate = useNavigate();

  const handleCityClick = (cityName) => {
    navigate(`/pgs/filterPg/${cityName}`); // ✅ URL Params se bhejna
};
  
  return (
    <div>
      {/* Background Section */}
      <div
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          height: "100vh",
          width: "100vw",
          position: "relative",
          margin: "0",
          padding: "0",
        }}
      >
        <MyNavbar />

        <div className="Container_city mt-5">
      <div className="Maincontainer">
      {/* Title Section */}
      <h1 className="title">Book My PG</h1>
      <p className="subtitle">
        India's Largest PG Network to Book your PG Online
      </p>

      {/* Search Box
      <div className="serchcontainer">
        <div className="subcontainer">
          <input
            type="text"
            placeholder="Enter city name, area etc..."
            className=""
          />
          <button className="btn">
            🔍
          </button>
          <button className="btn2">
            📍 Near
          </button>
        </div>
      </div> */}

      {/* Cities Grid */}
      <div className="cities-container">
        {cities.map((city, index) => (
          <div key={index} className="city-card" onClick={() => handleCityClick(city.name)} // ✅ Click pe redirect karega
          style={{ cursor: "pointer" }}>
            <img
              src={city.img}
              alt={city.name}
              className="text"
            />
            <p className="text">{city.name}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
        
        <div className="bhawna  d-flex">
          {offers.map((offer) => (
            <div 
              key={offer.id}
           >
        <div className="offers-card">
      <div className="offers-container">
        
               
            <div className="offers-details fw-bold">
            <h5 >{offer.title}</h5>
              <p >{offer.description}</p>
              <p><span>{offer.discount}</span></p>
             
            </div>
            </div>
           
        </div>
      </div>
          ))}
          </div>
      </div>
     
      



      {/* Rest of the content */}
      <div className="container" style={{ marginTop: "250px" }}>
        <div
          className="row align-items-center"
          style={{ backgroundColor: "rgb(216, 237, 241)" }}
        >
          {/* Steps Section */}
          <div className="col-md-4 text-left">
            <div className="mb-4">
              <div className="d-flex">
                <div className="homeBtn">
                  <h3>1</h3>
                </div>
                <h4 className="mt-2 ms-3">Explore Options</h4>
              </div>
              <p style={{ marginLeft: "65px" }}>
                Browse through our available rooms and discover the one that
                fits your needs and preferences.
              </p>
            </div>

            <div className="mb-4">
              <div className="d-flex">
                <div className="homeBtn">
                  <h3>2</h3>
                </div>
                <h4 className="mt-2 ms-3">Contact Us</h4>
              </div>
              <p style={{ marginLeft: "65px" }}>
                Reach out via call, email, or WhatsApp to inquire about
                availability and schedule a viewing.
              </p>
            </div>

            <div className="mb-4">
              <div className="d-flex">
                <div className="homeBtn">
                  <h3>3</h3>
                </div>
                <h4 className="mt-2 ms-3">Book Your Room</h4>
              </div>
              <p style={{ marginLeft: "65px" }}>
                Once you're satisfied, complete the booking process with ease.
              </p>
            </div>
          </div>

          {/* Middle Image */}
          <div className="col-md-3 text-center">
            <img
              src={bookingirl}
              alt="How It Works"
              className="img-fluid rounded shadow"
            />
          </div>

          <div className="col-md-4 text-left">
            <h1 className="text-dark fw-bold">How It All Works</h1>
            <h5 className="mt-5">
              Finding your perfect rental room with Dekho Rentals is simple and
              hassle-free!
            </h5>
            <hr />
          </div>
        </div>
      </div>
      <div className="container my-5">
        <div className="row align-items-center">
          {/* Left Section - About Us */}
          <div className="col-md-6 p-4">
            <h5 className="fw-bold" style={{ color: "#c71585" }}>
              {" "}
              About Us
            </h5>
            <h1 className="mt-3 fw-bold text-dark">
              Find Your Perfect Rental Space with Dekho Rentals!
            </h1>
            <p className="mt-3 text-muted">
              At Dekho Rentals, we don’t just offer a room—we provide a home.
              Our mission is to create a stress-free rental experience with
              top-quality service and premium amenities, ensuring your comfort
              and satisfaction.
            </p>

            {/* Features List */}
            <div className="mt-4">
              <h5 className="feature-heading">
                <i className="fas fa-check-circle me-2"></i>
                Tailored to Your Needs
              </h5>
              <p className="text-muted">
                Choose from a variety of rental options that suit your budget
                and preferences.
              </p>

              <h5 className="feature-heading">
                <i className="fas fa-check-circle me-2"></i>
                Personalized Support
              </h5>
              <p className="text-muted">
                Our team is here to guide you through every step, making your
                move seamless.
              </p>

              <h5 className="feature-heading">
                <i className="fas fa-check-circle me-2"></i>
                Hassle-Free Booking
              </h5>
              <p className="text-muted">
                Secure and easy online booking, so you can find your dream
                rental in minutes.
              </p>
            </div>
          </div>

          {/* Right Section - Why Choose Us */}
          <div className="col-md-6 p-4 bg-light rounded shadow">
            <h5 className="fw-bold" style={{ color: "#c71585" }}>
              Why Choose Us?
            </h5>{" "}
            {/* Fixed Color */}{" "}
            <h2 className="mt-3 fw-bold text-dark">
              "Find a space that feels like home"
            </h2>
            {/* Bullet Points List */}{" "}
            <ul className="mt-3 list-unstyled">
              <li className="mb-2">
                <i className="fas fa-star text-warning me-2"></i>
                <b>Verified Listings</b> – 100% genuine and secure properties.
              </li>
              <li className="mb-2">
                <i className="fas fa-lock text-success me-2"></i>
                <b>Secure Payments</b> – Reliable transactions for your safety.
              </li>
              <li className="mb-2">
                <i className="fas fa-headset text-primary me-2"></i>
                <b>24/7 Support</b> – We’re always available for assistance.
              </li>
              <li className="mb-2">
                <i className="fas fa-clock text-danger me-2"></i>
                <b>Instant Booking</b> – Book your rental in just a few clicks.
              </li>
              <li className="mb-2">
                <i className="fas fa-tags text-info me-2"></i>
                <b>Best Deals</b> – Affordable prices tailored for you.
              </li>
            </ul>
            <p className="mt-4 text-muted">
              We make renting easier by offering flexible solutions that fit
              your needs. Whether you’re a student, a professional, or a family,
              we have the perfect place waiting for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;





// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { OffersContext } from "./context/OfferContext";
// import "../css/UserHome.css";
// import bgimg from "../img/backgroundimg.jpg";
// import bookingirl from "../img/booking girl.png";
// import MyNavbar from "./Navbar";
// import "../css/Home.css";
// import gift from "../img/gift.png";
// import bengluruImg from "../img/bangluru.jpeg"
// import bhubneshwarImg from "../img/bhubneshware.jpeg"
// import chennaiImg from "../img/chennai.jpeg"
// import coimbtore from "../img/coimbatore.jpg";
// import gurgaonImg from "../img/gurgoan.jpg"
// import HydrabadImg from "../img/hydrabad.jpeg"
// import IndorImg from "../img/indore.jpeg"
// import MumbaiImg from "../img/mumbai.jpeg"
// import NewDehliImg from "../img/newdehli.jpeg"
// import noidaimg from "../img/noida.jpg"
// import puneImg from "../img/pune.jpeg"
// import panjabImg from "../img/panjab.jpg"
// import { useNavigate } from "react-router-dom";
// import bookbg from "../img/book.jpg"



// const cities = [
//   { name: "Bengaluru", img: bengluruImg },
//   { name: "Bhubaneswar", img: bhubneshwarImg },
//   { name: "Chennai", img:chennaiImg },
//   { name: "Coimbatore", img: coimbtore},
//   { name: "Gurgaon", img: gurgaonImg },
//   { name: "Hyderabad", img: HydrabadImg },
//   { name: "Indore", img: IndorImg},
//   { name: "Mumbai", img: MumbaiImg },
//   { name: "New Delhi", img:NewDehliImg},
//   { name: "Noida", img:noidaimg },
//   { name: "Pune", img: puneImg },
//   { name: "Panjab", img:panjabImg },
// ];

// function HomePage() {
//   const { offers } = useContext(OffersContext);
//   const navigate = useNavigate();

//   const handleCityClick = (cityName) => {
//     navigate(`/pgs/filterPg/${cityName}`); // ✅ URL Params se bhejna
// };
  
//   return (
//     <div>
//       {/* Background Section */}
//       <div
//         style={{
//           backgroundImage: `url(${bookbg})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundAttachment: "fixed",
//           height: "100vh",
//           width: "100vw",
//           position: "relative",
//           margin: "0",
//           padding: "0",
//         }}
//       >
//         <MyNavbar />
//         <div className="Container_city mt-5">
//       <div className="Maincontainer">
//       {/* Title Section */}
//       <h1 className="title">Book My PG</h1>
//       <p className="subtitle">
//         India's Largest PG Network to Book your PG Online
//       </p>

//       {/* Search Box */}
//       <div className="serchcontainer">
//         <div className="subcontainer">
//           <input
//             type="text"
//             placeholder="Enter city name, area etc..."
//             className=""
//           />
//           <button className="btn">
//             🔍
//           </button>
//           <button className="btn2">
//             📍 Near me
//           </button>
//         </div>
//       </div>

//       {/* Cities Grid */}
//       <div className="cities-container">
//         {cities.map((city, index) => (
//           <div key={index} className="city-card" onClick={() => handleCityClick(city.name)} // ✅ Click pe redirect karega
//           style={{ cursor: "pointer" }}>
//             <img
//               src={city.img}
//               alt={city.name}
//               className=""
//             />
//             <p className="">{city.name}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//     </div>

//         <div className="d-flex justify-content-center flex-wrap gap-4 m-3">
//           {offers.map((offer) => (
//             <div
//               key={offer.id}
//               className="text-center"
//               style={{
//                 width: "300px",
//                 backgroundColor: "white",
//                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//                 padding: "20px",
//                 borderRadius: "10px",
//               }}
//             >
//                <div className="d-flex">
//                 <img src={gift} style={{width:"50px", height:"40px"}} />
//             <h3 className="mt-2">{offer.title}</h3>
//             </div>
             
//               <p className="text-muted">{offer.description}</p>
//               <span>{offer.discount}</span>
             
//             </div>
//           ))}
//         </div>
//       </div>


//       {/* Rest of the content */}
//       <div className="container" style={{ marginTop: "65px" }}>
//         <div
//           className="row align-items-center"
//           style={{ backgroundColor: "rgb(216, 237, 241)" }}
//         >
//           {/* Steps Section */}
//           <div className="col-md-4 text-left">
//             <div className="mb-4">
//               <div className="d-flex">
//                 <div className="homeBtn">
//                   <h3>1</h3>
//                 </div>
//                 <h4 className="mt-2 ms-3">Explore Options</h4>
//               </div>
//               <p style={{ marginLeft: "65px" }}>
//                 Browse through our available rooms and discover the one that
//                 fits your needs and preferences.
//               </p>
//             </div>

//             <div className="mb-4">
//               <div className="d-flex">
//                 <div className="homeBtn">
//                   <h3>2</h3>
//                 </div>
//                 <h4 className="mt-2 ms-3">Contact Us</h4>
//               </div>
//               <p style={{ marginLeft: "65px" }}>
//                 Reach out via call, email, or WhatsApp to inquire about
//                 availability and schedule a viewing.
//               </p>
//             </div>

//             <div className="mb-4">
//               <div className="d-flex">
//                 <div className="homeBtn">
//                   <h3>3</h3>
//                 </div>
//                 <h4 className="mt-2 ms-3">Book Your Room</h4>
//               </div>
//               <p style={{ marginLeft: "65px" }}>
//                 Once you're satisfied, complete the booking process with ease.
//               </p>
//             </div>
//           </div>

//           {/* Middle Image */}
//           <div className="col-md-3 text-center">
//             <img
//               src={bookingirl}
//               alt="How It Works"
//               className="img-fluid rounded shadow"
//             />
//           </div>

//           <div className="col-md-4 text-left">
//             <h1 className="text-dark fw-bold">How It All Works</h1>
//             <h5 className="mt-5">
//               Finding your perfect rental room with Dekho Rentals is simple and
//               hassle-free!
//             </h5>
//             <hr />
//           </div>
//         </div>
//       </div>
//       <div className="container my-5">
//         <div className="row align-items-center">
//           {/* Left Section - About Us */}
//           <div className="col-md-6 p-4">
//             <h5 className="fw-bold" style={{ color: "#c71585" }}>
//               {" "}
//               About Us
//             </h5>
//             <h1 className="mt-3 fw-bold text-dark">
//               Find Your Perfect Rental Space with Dekho Rentals!
//             </h1>
//             <p className="mt-3 text-muted">
//               At Dekho Rentals, we don’t just offer a room—we provide a home.
//               Our mission is to create a stress-free rental experience with
//               top-quality service and premium amenities, ensuring your comfort
//               and satisfaction.
//             </p>

//             {/* Features List */}
//             <div className="mt-4">
//               <h5 className="feature-heading">
//                 <i className="fas fa-check-circle me-2"></i>
//                 Tailored to Your Needs
//               </h5>
//               <p className="text-muted">
//                 Choose from a variety of rental options that suit your budget
//                 and preferences.
//               </p>

//               <h5 className="feature-heading">
//                 <i className="fas fa-check-circle me-2"></i>
//                 Personalized Support
//               </h5>
//               <p className="text-muted">
//                 Our team is here to guide you through every step, making your
//                 move seamless.
//               </p>

//               <h5 className="feature-heading">
//                 <i className="fas fa-check-circle me-2"></i>
//                 Hassle-Free Booking
//               </h5>
//               <p className="text-muted">
//                 Secure and easy online booking, so you can find your dream
//                 rental in minutes.
//               </p>
//             </div>
//           </div>

//           {/* Right Section - Why Choose Us */}
//           <div className="col-md-6 p-4 bg-light rounded shadow">
//             <h5 className="fw-bold" style={{ color: "#c71585" }}>
//               Why Choose Us?
//             </h5>{" "}
//             {/* Fixed Color */}{" "}
//             <h2 className="mt-3 fw-bold text-dark">
//               "Find a space that feels like home"
//             </h2>
//             {/* Bullet Points List */}{" "}
//             <ul className="mt-3 list-unstyled">
//               <li className="mb-2">
//                 <i className="fas fa-star text-warning me-2"></i>
//                 <b>Verified Listings</b> – 100% genuine and secure properties.
//               </li>
//               <li className="mb-2">
//                 <i className="fas fa-lock text-success me-2"></i>
//                 <b>Secure Payments</b> – Reliable transactions for your safety.
//               </li>
//               <li className="mb-2">
//                 <i className="fas fa-headset text-primary me-2"></i>
//                 <b>24/7 Support</b> – We’re always available for assistance.
//               </li>
//               <li className="mb-2">
//                 <i className="fas fa-clock text-danger me-2"></i>
//                 <b>Instant Booking</b> – Book your rental in just a few clicks.
//               </li>
//               <li className="mb-2">
//                 <i className="fas fa-tags text-info me-2"></i>
//                 <b>Best Deals</b> – Affordable prices tailored for you.
//               </li>
//             </ul>
//             <p className="mt-4 text-muted">
//               We make renting easier by offering flexible solutions that fit
//               your needs. Whether you’re a student, a professional, or a family,
//               we have the perfect place waiting for you.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePage;
