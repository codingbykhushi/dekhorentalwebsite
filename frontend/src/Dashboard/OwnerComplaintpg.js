import React, { useEffect, useState } from "react";
import axios from "axios";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3001/api/complaints/getOwnerComplaint", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log("API Response:", response.data); // ✅ Debugging ke liye print karein
  
        // Ensure response is an array
        setComplaints(response.data.data || []);
      } catch (error) {
        setError("Failed to fetch complaints. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchComplaints();
  }, []);
  

  return (
    <div className="container">
      <h2>Owner Complaints</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
            <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>PG Name</th>
              <th>Room Name</th>
              <th>Room No</th>
              <th>Complaint Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
  {complaints.map((complaint) => (
    <tr key={complaint.id}>
      <td>{complaint.id}</td>
      <td>{complaint.name}</td>
      <td>{complaint.email}</td>
      <td>{complaint.phone}</td>
      <td>{complaint.RoomsAvailable?.PG?.name || "N/A"}</td>
      <td>{complaint.RoomsAvailable?.name || "N/A"}</td>
      <td>{complaint.RoomsAvailable?.roomNumber || "N/A"}</td>
      <td>{complaint.complaintType}</td>
      <td>{complaint.description}</td>
    </tr>
  ))}
</tbody>
        </table>
      )}
    </div>
  );
};

export default ComplaintList;
