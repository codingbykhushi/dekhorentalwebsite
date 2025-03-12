import { useState, useEffect } from "react";
import axios from "axios";
import "../css/OwnerReading.css"

const OwnerReadings = () => {
  const [readings, setReadings] = useState([]);
  const ownerId = localStorage.getItem("ownerId");

  console.log("📢 Owner ID from localStorage:", ownerId); // Debugging ke liye

  useEffect(() => {
    if (!ownerId) {
      console.error("⚠️ No owner ID found in localStorage!");
      return;
    }

    const fetchReadings = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/readings/owner/${ownerId}`);
        setReadings(response.data);
      } catch (error) {
        console.error("❌ Error fetching readings:", error.response?.data || error.message);
      }
    };

    fetchReadings();
  }, [ownerId]);

  return (
    <div className="owner-readings-container">
    <h2>Reading Details</h2>
    {readings.length === 0 ? (
      <p className="no-readings-message">No readings available.</p>
    ) : (
      <table className="owner-readings-table">
          <thead>
            <tr>
              <th>PG Name</th>
              <th>Room No</th>
              <th>Previous Reading</th>
              <th>Current Reading</th>
              <th>Total Units</th>
              <th>Bill Amount</th>
              <th>From Date</th>
              <th>To Date</th>
            </tr>
          </thead>
          <tbody>
            {readings.map((reading) => (
              <tr key={reading.id}>
                <td>{reading.pgName}</td>
                <td>{reading.roomNo}</td>
                <td>{reading.previousReading}</td>
                <td>{reading.currentReading}</td>
                <td>{reading.totalUnits}</td>
                <td>{reading.billAmount}</td>
                <td>{reading.fromDate}</td>
                <td>{reading.toDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OwnerReadings;
