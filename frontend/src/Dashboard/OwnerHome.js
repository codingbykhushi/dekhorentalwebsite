import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Navigate function ke liye
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/MyPGs.css'


const OwnerHome = () => {
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ✅ useNavigate hook ka use kiya

  const fetchOwnerRooms = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.get(
        "http://localhost:3001/api/pgs/ownerPg",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPgs(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching owner rooms:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnerRooms();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center my-4">My PGs</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : (
        <div className="container mt-4">
          <div className="row">
            {pgs.map((pg) => (
              <div key={pg.id} className="col-md-4">
                <div className="card mb-4 shadow-sm">
                  <img
                    src={pg.img}
                    className="card-img-top"
                    alt={pg.pgName}
                    style={{ height: "200px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <div className="card-body">
                  <p className="card-text"><strong>PG Name:</strong> {pg.pgName}</p>
                <p className="card-text"><strong>Address:</strong>{pg.address}</p>
                <p className="card-text"><strong>Total Rooms:</strong> {pg.totalRooms}</p>
                

                    {/* ✅ View Details Button */}
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`rooms/${pg.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerHome;
