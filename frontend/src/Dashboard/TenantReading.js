import { useState, useEffect } from "react";
import axios from "axios";
import '../css/TenantReadings.css'

const TenantReadings = () => {
  const [readings, setReadings] = useState([]);
  const tenantId = localStorage.getItem("tenantId"); // Tenant ID LocalStorage se le rahe hain

  useEffect(() => {
    if (!tenantId) {
      console.error("⚠️ No Tenant ID found!");
      return;
    }

    const fetchReadings = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/readings/tenant/${tenantId}`);
        setReadings(response.data);
      } catch (error) {
        console.error("❌ Error fetching tenant readings:", error.response?.data || error.message);
      }
    };

    fetchReadings();
  }, [tenantId]);

  return (
    <div className="tenant-readings-container">
      <h2>My Room Readings</h2>
      {readings.length === 0 ? (
        <p className="no-readings-message">No readings available.</p>
      ) : (
        <table className="tenant-readings-table">
          <thead>
            <tr>
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

export default TenantReadings;
