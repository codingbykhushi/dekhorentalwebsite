import { useEffect, useState,} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import MyNavbar from "./Navbar";
import roombk from "../img/roomsback.jpg"

const RoomsDetails = () => {
  const { pgId } = useParams(); // ✅ PG ID get karo
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

 


  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/rooms/${pgId}`); // ✅ Correct URL
        const data = await response.json();
        console.log("API Response:", data); // ✅ Debugging ke liye


        if (response.ok) {
          setRooms(data);
        } else {
          setError(data.message || "Rooms not found");
        }
      } catch (err) {
        setError("Failed to fetch rooms.");
      }
    };

    if (pgId) {
      fetchRooms(); // ✅ Jab pgId mile tab API call karo
    }
  }, [pgId]);

  return (
    <div>
    <div
        style={{
          backgroundImage: `url(${roombk})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          height: "100vh",
          width: "100vw",
          margin: "0",
          padding: "0",
        }}
      >
        <MyNavbar/>
      </div>
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
                  <button className="btn btn-primary" onClick={() => navigate("/loginTenant")}>Book Now</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          !error && <p className="text-center">No rooms available.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default RoomsDetails;
