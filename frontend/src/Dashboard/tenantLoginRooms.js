import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TenantsLoginRooms = () => {
  const { pgId } = useParams(); 
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/rooms/${pgId}`); 
        const data = await response.json();
        console.log("API Response:", data); 

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

  return (
    <div className="container mt-4">
      <h2 className="text-primary text-center mb-4">Rooms Available</h2>
      {error && <p className="text-danger text-center">{error}</p>}

      <div className="row">
        {rooms.length > 0
          ? rooms.map((room) => (
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
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        navigate(`/tenant/payments/${room.id}`, {
                          state: { roomId: room.id, price: room.price },
                        })
                      }
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          : !error && (
              <p className="text-center text-muted">No rooms available.</p>
            )}
      </div>
    </div>
  );
};

export default TenantsLoginRooms;
