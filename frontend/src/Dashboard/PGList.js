import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";

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
    <Container className="mt-4">
      <h2 className="text-center mb-4">PG Listings</h2>
      <Row>
        {pgs.map((pg) => (
          <Col key={pg.id} md={4} className="mb-4">
            <Card className="shadow-sm border-0 rounded">
              <Card.Img
                variant="top"
                src={pg.img}
                alt={pg.pgName}
                style={{ height: "200px", objectFit: "cover", borderRadius: "10px 10px 0 0" }}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/200"; // Default image
                }}
              />
              <Card.Body>
                <Card.Title className="text-primary">{pg.pgName}</Card.Title>
                <Card.Text>
                <strong>Owner Name:</strong> {pg.name} <br />
                  <strong>Owner ID:</strong> {pg.OwnerId} <br />
                  <strong>Address:</strong> {pg.address} <br />
                  <strong>Total Rooms:</strong> {pg.totalRooms}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="info" onClick={() => navigate(`rooms/${pg.id}`)}>
                    View Details
                  </Button>
                  <Button variant="warning" onClick={() => setEditPG(pg.id)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(pg.id)}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {editPG && (
        <div className="mt-4 p-4 border rounded bg-light shadow">
          <h4>Edit PG</h4>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>PG Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="PG Name"
                value={updatedData.pgName || ""}
                onChange={(e) => setUpdatedData({ ...updatedData, pgName: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                value={updatedData.address || ""}
                onChange={(e) => setUpdatedData({ ...updatedData, address: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Total Rooms</Form.Label>
              <Form.Control
                type="number"
                placeholder="Total Rooms"
                value={updatedData.totalRooms || ""}
                onChange={(e) => setUpdatedData({ ...updatedData, totalRooms: e.target.value })}
              />
            </Form.Group>

            <Button variant="success" className="me-2" onClick={handleUpdate}>
              Save Changes
            </Button>
            <Button variant="secondary" onClick={() => setEditPG(null)}>
              Cancel
            </Button>
          </Form>
        </div>
      )}
    </Container>
  );
};

export default PGList;
