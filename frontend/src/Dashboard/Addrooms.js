import { useState, useEffect } from "react";
import axios from "axios";
import backgroundImage from "../img/signbg.jpeg";
import pgImage from "../img/button3.png";     
import roomImage from "../img/button4.png";   

const AddRoom = () => {
  // State for PG form
  const [formData, setFormData] = useState({
    name: "",
    address: "",  
    ownerId: "",
    totalRooms: "",
    image: null,
  });

  // State for Room form
  const [pgs, setPgs] = useState([]);
  const [roomNumber, setRoomNumber] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Vacant");
  const [pgId, setPgId] = useState("");
  const [message, setMessage] = useState("");

  // State to control which form to display: null, 'pg', or 'room'
  const [activeForm, setActiveForm] = useState(null);

  // Handler for PG form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/pgs/addPg", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("PG added successfully!");
      setFormData({ name: "", address: "", ownerId: "", totalRooms: "", image: null });
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  // Handler for Room form submission
  const handleSubmitt = async (e) => {
    e.preventDefault();
    if (!name || !price || !pgId || !roomNumber) {
      setMessage("All fields are required!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3001/api/rooms/addroom", {
        roomNumber,
        name,
        description,
        size,
        price,
        status,
        pgId,
      });
      setMessage(response.data.message);
      setRoomNumber("");
      setName("");
      setDescription("");
      setSize("");
      setPrice("");
      setStatus("Vacant");
      setPgId("");
    } catch (error) {
      console.error("Error adding room:", error);
      setMessage("Failed to add room!");
    }
  };

  // Fetch PG list for the dropdown in Room form
  useEffect(() => {
    const fetchPGs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/pgs/allPg");
        setPgs(response.data);
      } catch (error) {
        console.error("Error fetching PGs:", error);
      }
    };
    fetchPGs();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
        padding: "20px",
      }}
    >
      {activeForm === null ? (
        // Option Cards Section
        <div className="container mt-4">
          <div
            className="option-container"
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {/* Add PG Card */}
            <div
              className="option-card"
              onClick={() => setActiveForm("pg")}
              style={{
                width: "300px",
                height: "200px",
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                cursor: "pointer",
                backgroundImage: `url(${pgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className="card-overlay"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0.4)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  fontSize: "2rem",
                  textTransform: "uppercase",
                }}
              >
                Add PG
              </div>
            </div>
            {/* Add Room Card */}
            <div
              className="option-card"
              onClick={() => setActiveForm("room")}
              style={{
                width: "300px",
                height: "200px",
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                cursor: "pointer",
                backgroundImage: `url(${roomImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className="card-overlay"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0.4)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  fontSize: "2rem",
                  textTransform: "uppercase",
                }}
              >
                Add Room
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Render selected form with a back button
        <div className="container mt-4">
          <button
            onClick={() => setActiveForm(null)}
            className="btn btn-secondary mb-3"
          >
            Back
          </button>
          {activeForm === "pg" ? (
            <div>
              <h2>Add a PG</h2>
              <div>
              <form onSubmit={handleSubmit} className="p-3 border rounded shadow">
              <div className="mb-3">
              <label className="form-label">PG Name:</label>
                <input
                  type="text"
                   className="form-control"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
                 </div>
                 <div className="mb-3">
                 <label className="form-label">Address:</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  required
                />
                </div>
                <div className="mb-3">
                <label className="form-label">Owner Id:</label>
                <input
                  type="text"
                   className="form-control"
                  value={formData.ownerId}
                  onChange={(e) =>
                    setFormData({ ...formData, ownerId: e.target.value })
                  }
                  required
                />
                </div>
                <div className="mb-3">
                <label className="form-label">Total Rooms:</label>
                <input
                  type="number"
                   className="form-control"
                  value={formData.totalRooms}
                  onChange={(e) =>
                    setFormData({ ...formData, totalRooms: e.target.value })
                  }
                  required
                />
                </div>
                <div className="mb-3">
                <label className="form-label">PG img:</label>
                <input
                  type="file"
                   className="form-control"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
                  required
                />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add PG
                </button>
              </form>
            </div>
            </div>
          
          ) : (
            <div>
              <h2>Add Room</h2>
              {message && <p className="alert alert-info">{message}</p>}
              <form onSubmit={handleSubmitt} className="p-3 border rounded shadow">
                <div className="mb-3">
                  <label className="form-label">Room No:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Room Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Size:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div>
                  <label>Status:</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Vacant">Vacant</option>
                    <option value="Booked">Booked</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">PG Id:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={pgId}
                    onChange={(e) => setPgId(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Select PG:</label>
                  <select
                    className="form-select"
                    value={pgId}
                    onChange={(e) => setPgId(e.target.value)}
                  >
                    <option value="">Select PG</option>
                    {pgs.map((pg) => (
                      <option key={pg.id} value={pg.id}>
                        {pg.pgName} - {pg.address}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Room
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddRoom;

