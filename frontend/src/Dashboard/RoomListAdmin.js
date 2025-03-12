import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RoomsDetailsAdmin = () => {
  const { pgId } = useParams(); // ✅ PG ID get karo
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const [editRoom, setEditRoom] = useState(null); // ✅ Edit ke liye room store karo

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/rooms/${pgId}`); // ✅ API URL check
        const data = await response.json();
        console.log("API Response:", data); // ✅ Debugging ke liye

        if (response.ok) {
          setRooms(data);
        } else {
          setRooms([]);
          setError(data.message || "Rooms not found");
        }
      } catch (err) {
        setRooms([]);
        setError("Failed to fetch rooms.");
      }
    };

    if (pgId) {
      fetchRooms();
    }
  }, [pgId]);

  // ✅ Delete Room
  const handleDelete = async (roomId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this room?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3001/api/rooms/deleteRoom/${roomId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setRooms(rooms.filter((room) => room.id !== roomId)); // ✅ UI se hatao
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete room");
      }
    } catch (error) {
      console.error("Error deleting room:", error);
      alert("Server Error: Unable to delete room");
    }
  };

  // ✅ Update Room (Open Edit Form)
  const handleEditClick = (room) => {
    setEditRoom(room);
  };

  // ✅ Save Updated Room
  const handleUpdate = async () => {
    if (!editRoom) return;

    try {
        const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/rooms/updateRoom/${editRoom.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editRoom),
      });

      const data = await response.json();

      if (response.ok) {
        setRooms(rooms.map((room) => (room.id === editRoom.id ? editRoom : room))); // ✅ Update UI
        setEditRoom(null);
      } else {
        alert(data.message || "Failed to update room");
      }
    } catch (error) {
      console.error("Error updating room:", error);
      alert("Server Error: Unable to update room");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-primary text-center mb-4">Rooms Available</h2>
      {error && <p className="text-danger text-center">{error}</p>}

      <div className="row">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div className="col-md-4 mb-3" key={room.id}>
              <div className="card shadow">
                <div className="card-body">
                  <p className="card-text">
                    <strong>Room No:</strong> {room.roomNumber}
                  </p>
                  <p className="card-text">
                    <strong>Room Name:</strong> {room.name}
                  </p>
                  <p className="card-text">
                    <strong>Description:</strong> {room.description}
                  </p>
                  <p className="card-text">
                    <strong>Size:</strong> {room.size}
                  </p>
                  <p className="card-text">
                    <strong>Price:</strong> ₹{room.price}
                  </p>
                  <p className="card-text">
                    <strong>Status:</strong> {room.status}
                  </p>

                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditClick(room)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(room.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          !error && <p className="text-center text-muted">No rooms available.</p>
        )}
      </div>

      {/* ✅ Edit Room Form */}
      {editRoom && (
        <div className="mt-4">
          <h3 className="text-center">Edit Room</h3>
          <div className="card p-3 shadow">
            <label>Room No:</label>
            <input
              type="text"
              className="form-control"
              value={editRoom.roomNumber}
              onChange={(e) => setEditRoom({ ...editRoom, roomNumber: e.target.value })}
            />
            <label>Room Name:</label>
            <input
              type="text"
              className="form-control"
              value={editRoom.name}
              onChange={(e) => setEditRoom({ ...editRoom, name: e.target.value })}
            />
            <label>Description:</label>
            <input
              type="text"
              className="form-control"
              value={editRoom.description}
              onChange={(e) => setEditRoom({ ...editRoom, description: e.target.value })}
            />
            <label>Size:</label>
            <input
              type="text"
              className="form-control"
              value={editRoom.size}
              onChange={(e) => setEditRoom({ ...editRoom, size: e.target.value })}
            />
            <label>Price:</label>
            <input
              type="number"
              className="form-control"
              value={editRoom.price}
              onChange={(e) => setEditRoom({ ...editRoom, price: e.target.value })}
            />
            <label>Status:</label>
            <select
              className="form-control"
              value={editRoom.status}
              onChange={(e) => setEditRoom({ ...editRoom, status: e.target.value })}
            >
              <option value="Vacant">Vacant</option>
              <option value="Booked">Booked</option>
            </select>

            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-success" onClick={handleUpdate}>
                Save Changes
              </button>
              <button className="btn btn-secondary" onClick={() => setEditRoom(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomsDetailsAdmin;
