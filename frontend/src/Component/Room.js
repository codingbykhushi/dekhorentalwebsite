import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Navigation ke liye
import MyNavbar from "./Navbar.js";
import roombk from "../img/roomsback.jpg";

const Rooms = () => {
  const [pgs, setPgs] = useState([]);
  const navigate = useNavigate(); // ✅ Navigation hook

  useEffect(() => {
    const fetchPGs = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/pgs/allPg", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPgs(data);
      } catch (error) {
        console.error("Error fetching PGs:", error.message);
      }
    };

    fetchPGs();
  }, []);

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${roombk})`,
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
      <div className="container mt-4">
        <h2>Available PG</h2>
        <div className="row">
          {pgs.map((pg) => (
            <div key={pg.id} className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <img
                  src={pg.img}
                  className="card-img-top"
                  alt={pg.pgName}
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                <div className="card-body">
                  <p className="card-text"><strong>PG Name:</strong> {pg.pgName}</p>
                  <p className="card-text"><strong>State:</strong> {pg.state}</p>
                  <p className="card-text"><strong>City:</strong> {pg.city}</p>
                  <p className="card-text"><strong>Address:</strong> {pg.address}</p>
                  <p className="card-text"><strong>Total Rooms:</strong> {pg.totalRooms}</p>
                  {/* <p className="card-text">
  <strong>Status:</strong>{" "}
  {pg.status ? (pg.status === "Vacant" ? "✅ Available" : "❌ Booked") : "N/A"}
</p> */}

                  {/* ✅ View Details Button */}
                  <button className="btn btn-primary" onClick={() => navigate(`/room-details/${pg.id}`)}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
