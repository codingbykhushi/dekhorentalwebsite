import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import { Pencil, Trash } from "lucide-react";
import "../css/AdminOwnerList.css";

const AdminOwnerList = () => {
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editOwnerData, setEditOwnerData] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
    setShowModal(true);
  };

  const handleUpdateOwner = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:3001/api/owners/${editOwnerData.id}`, editOwnerData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowModal(false);
      fetchOwners();
    } catch (error) {
      setError("Failed to update owner. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Owner List</h1>
      {error && <p className="text-danger">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-responsive">
         <table className="table table-bordered">
         <thead className="bg-dark text-white">

              <tr>
                <th>Owner ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>PG Name</th>
                <th>Aadhar Number</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {owners.map((owner) => (
                <tr key={owner.id}>
                  <td>{owner.id}</td>
                  <td>{owner.name}</td>
                  <td>{owner.email}</td>
                  <td>{owner.pgName}</td>
                  <td>{owner.aadhaarNumber}</td>
                  <td>{owner.plainPassword ? owner.plainPassword : "Not Available"}</td>
                  <td>
  <Button variant="warning" size="sm" onClick={() => handleEditOwner(owner)} className="me-2">
    <Pencil size={12} /> 
  </Button>
  <Button variant="danger" size="sm" onClick={() => handleDeleteOwner(owner.id)}>
    <Trash size={12} /> 
  </Button>
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Owner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editOwnerData?.name || ""}
                onChange={(e) => setEditOwnerData({ ...editOwnerData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editOwnerData?.email || ""}
                onChange={(e) => setEditOwnerData({ ...editOwnerData, email: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdateOwner}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminOwnerList;
