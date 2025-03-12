import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TenantHome = () => {
  const [pgs, setPgs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPGs = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/pgs/allPg");
        const data = await response.json();
        setPgs(data);
      } catch (err) {
        console.error("Failed to fetch PGs:", err);
      }
    };
    fetchPGs();
  }, []);

  return (
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
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <div className="card-body">
                <p className="card-text"><strong>PG Name:</strong>{pg.pgName}</p>
                <p className="card-text"><strong>Address:</strong>{pg.address}</p>
                <p className="card-text"><strong>Total Rooms:</strong> {pg.totalRooms}</p>
                
                {/* ✅ View Details Button */}
                <button className="btn btn-primary" onClick={() => navigate(`rooms/${pg.id}`)}>
  View Details
</button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenantHome;
