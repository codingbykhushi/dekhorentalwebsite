import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/AdminOwnerList.css";
import { Card } from "react-bootstrap";
import { Pencil, Trash } from "lucide-react"; 
import {Button} from "react-bootstrap";

const AdminOwnerList = () => {
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editOwnerData, setEditOwnerData] = useState(null);
  const [isEditingOwner, setIsEditingOwner] = useState(false);

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3001/api/owners/Allowner", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOwners(response.data);
    } catch (error) {
      setError("Failed to fetch owners. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOwner = async (id) => {
    if (!window.confirm("Are you sure you want to delete this owner?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3001/api/owners/deleteowner/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOwners(owners.filter((item) => item.id !== id));
    } catch (error) {
      setError("Failed to delete owner. Please try again.");
    }
  };

  const handleEditOwner = (data) => {
    setEditOwnerData(data);
    setIsEditingOwner(true);
  };

  const handleUpdateOwner = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:3001/api/owners/${editOwnerData.id}`, editOwnerData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsEditingOwner(false);
      fetchOwners();
    } catch (error) {
      setError("Failed to update owner. Please try again.");
    }
  };

  return (
    <div className="admin-containerAd">
      <h1 className="admin-titleAd">Owner List</h1>
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
         
          <div className="card-containerAd">
            {owners.map((owner) => (
              <Card key={owner.id} className="cardAd">
                <Card.Body className="cardHov">
                  <h2>{owner.name}</h2>
                  <p><strong>Owner Id:</strong> {owner.id}</p>
                  <p><strong>Name:</strong> {owner.name}</p>
                  <p><strong>Email:</strong> {owner.email}</p>
                  <p><strong>PG Name:</strong> {owner.pgName}</p>
                  <p><strong>Aadhar Number:</strong> {owner.aadhaarNumber}</p>
                  <p><strong>Password:</strong> {owner.plainPassword ? owner.plainPassword : "Not Available"}</p>

                  <div className="cardAd-footer">
                    <Button onClick={() => handleEditOwner(owner)}><Pencil size={16} /> Edit</Button>
                    <Button onClick={() => handleDeleteOwner(owner.id)}><Trash size={16} /> Delete</Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>

          {isEditingOwner && (
            <div className="edit-modal">
              <h2>Edit Owner</h2>
              <input
                type="text"
                value={editOwnerData.name}
                onChange={(e) => setEditOwnerData({ ...editOwnerData, name: e.target.value })}
              />
              <input
                type="email"
                value={editOwnerData.email}
                onChange={(e) => setEditOwnerData({ ...editOwnerData, email: e.target.value })}
              />
              <Button onClick={handleUpdateOwner}>Update</Button>
              <Button onClick={() => setIsEditingOwner(false)}>Cancel</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminOwnerList;
