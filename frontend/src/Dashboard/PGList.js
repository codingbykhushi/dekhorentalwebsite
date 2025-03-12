import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PGList = () => {
  const [pgs, setPgs] = useState([]);
  const [editPG, setEditPG] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchPGs();
  }, []);

  const fetchPGs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      const response = await fetch("http://localhost:3001/api/pgs/allPg", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

  const handleDelete = async (pgId) => {
    if (!window.confirm("Are you sure you want to delete this PG?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/pgs/deletePg/${pgId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete PG");
      }

      alert("PG deleted successfully!");
      setPgs(pgs.filter((pg) => pg.id !== pgId));
    } catch (error) {
      console.error("Error deleting PG:", error.message);
    }
  };

  const handleUpdate = async () => {
    if (!editPG) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/pgs/updatePg/${editPG}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      alert("PG updated successfully!");

      setPgs(pgs.map((pg) => (pg.id === editPG ? { ...pg, ...updatedData } : pg)));
      setEditPG(null);
      setUpdatedData({});
    } catch (error) {
      console.error("Error updating PG:", error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>PG List</h2>
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
                <p className="card-text"><strong>PG ID:</strong> {pg.id}</p>
                <p className="card-text"><strong>Owner ID:</strong> {pg.OwnerId}</p>
                <p className="card-text"><strong>PG Name:</strong> {pg.pgName}</p>
                <p className="card-text"><strong>Address:</strong> {pg.address}</p>
                <p className="card-text"><strong>Total Rooms:</strong> {pg.totalRooms}</p>

                <button className="btn btn-primary me-2" onClick={() => navigate(`rooms/${pg.id}`)}>
                  View Details
                </button>

                <button className="btn btn-warning me-2" onClick={() => setEditPG(pg.id)}>
                  Edit
                </button>

                <button className="btn btn-danger" onClick={() => handleDelete(pg.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editPG && (
        <div className="mt-4 p-3 border rounded">
          <h4>Edit PG</h4>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="PG Name"
            value={updatedData.pgName || ""}
            onChange={(e) => setUpdatedData({ ...updatedData, pgName: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Address"
            value={updatedData.address || ""}
            onChange={(e) => setUpdatedData({ ...updatedData, address: e.target.value })}
          />
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Total Rooms"
            value={updatedData.totalRooms || ""}
            onChange={(e) => setUpdatedData({ ...updatedData, totalRooms: e.target.value })}
          />
          <button className="btn btn-success me-2" onClick={handleUpdate}>Save Changes</button>
          <button className="btn btn-secondary" onClick={() => setEditPG(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default PGList;
