import React, { useEffect, useState } from "react";
import axios from "axios";

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/complaints/getAllCom")
      .then((res) => {
        setComplaints(res.data.complaints || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching complaints:", err);
        setError("Error fetching complaints");
        setLoading(false);
      });
  }, []);

  const updateStatus = async (complaintId, newStatus) => {
    try {
      await axios.put(`http://localhost:3001/api/complaints/updateStatus/${complaintId}`, { status: newStatus });
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint.id === complaintId ? { ...complaint, status: newStatus } : complaint
        )
      );
    } catch (error) {
      console.error("Error updating complaint status:", error);
    }
  };

  if (loading) return <p className="text-center">Loading complaints...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;
  if (!complaints.length) return <p className="text-center">No complaints found.</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-3">Complaints List</h2>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Complaint Id</th>
            <th>Tenant Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>PG Name</th>
            <th>Room Name</th>
            <th>Room No</th>
            <th>Complaint Type</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.id}>
              <td>{complaint.id}</td>
              <td>{complaint.tenantId}</td>
                <td>{complaint.name}</td>
                <td>{complaint.email}</td>
                <td>{complaint.phone}</td>
                <td>{complaint.RoomsAvailable?.PG?.name || "N/A"}</td>
                <td>{complaint.RoomsAvailable?.name || "N/A"}</td>
                <td>{complaint.RoomsAvailable?.roomNumber || "N/A"}</td>
                <td>{complaint.complaintType}</td>
                <td>{complaint.description}</td>
              <td>
                <span className={`badge ${complaint.status === "done" ? "bg-success" : "bg-danger"}`}>
                  {complaint.status?.toUpperCase() || "PENDING"}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => updateStatus(complaint.id, "done")}
                >
                  Done
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => updateStatus(complaint.id, "pending")}
                >
                  Pending
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintsList;
