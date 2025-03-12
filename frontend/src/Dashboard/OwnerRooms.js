import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const OwnerRooms = () => {
  const { pgId } = useParams(); // ✅ PG ID get karo
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/rooms/${pgId}`); // ✅ Check API URL
        const data = await response.json();
        console.log("API Response:", data); // ✅ Debugging ke liye

        if (response.ok) {
          setRooms(data);
        } else {
          setRooms([]); // ✅ Reset rooms
          setError(data.message || "Rooms not found");
        }
      } catch (err) {
        setRooms([]); // ✅ Reset rooms
        setError("Failed to fetch rooms.");
      }
    };

    if (pgId) {
      fetchRooms(); // ✅ Jab pgId mile tab API call karo
    }
  }, [pgId]);

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
                 
                </div>
              </div>
            </div>
          ))
        ) : (
          !error && <p className="text-center text-muted">No rooms available.</p>
        )}
      </div>
    </div>
  );
};

export default OwnerRooms;
