import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/complaints/getAllCom")
      .then((res) => {
        console.log("API Response:", res.data); 
        console.log("Complaints Data:", res.data);
        setComplaints(res.data.complaints || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching complaints:", err);
        setError("Failed to fetch complaints. Please try again.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center">Loading complaints...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  if (!complaints || complaints.length === 0) {
    return <p className="text-center">No complaints found.</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-3">All Complaints</h2>
      <table className="table table-bordered">
        <thead className="table-dark">
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
    </div>
  );
};

export default EmployeeComplaint;