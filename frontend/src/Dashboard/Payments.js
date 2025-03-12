import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/Payment.css";

const Payments = () => {
  const { roomId } = useParams();
  const [rooms, setRoomDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/payments/room/${roomId}`);
        console.log("data",response.data)
        setRoomDetails(response.data);
      } catch (error) {
        console.error("Error fetching room details:", error);
        
      }
    };
    fetchRoomDetails();
  }, [roomId]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:3001/api/payments/pay", {
        roomId,
        userId: 1, // Replace with actual user ID
      });

      if (data.success) {
        window.location.href = data.paymentUrl;
      } else {
        alert("Payment Failed ❌");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Error in processing payment ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!rooms) return <p>Loading room details...</p>;

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Room Booking Payment</h2>
        <hr />
        <div className="room-info">
          <h3>PG: {rooms.pgName}</h3> {/* ✅ PG ka naam display kar diya */}
          <p><strong>Room Name:</strong> {rooms.roomName}</p> {/* ✅ Fixed */}
          <p><strong>Room No:</strong> {rooms.roomNo}</p> {/* ✅ Fixed */}
          <p><strong>Description:</strong> {rooms.description}</p>
          <p><strong>Total Rent:</strong> ₹{rooms.price}</p>
        </div>
        <hr />
        <p className="advance-text">Advance Payment: <span>₹{rooms.fixedAdvance}</span></p>
        <button className="pay-button" onClick={handlePayment} disabled={loading}>
          {loading ? "Processing..." : "Pay ₹1000 Now"}
        </button>
      </div>
    </div>
  );
};

export default Payments;
