import React, { useEffect, useState } from "react";
import axios from "axios";
import downlodcomplaintprouf from "./DownloadComplaintProuf.js";

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tenantId, setTenantId] = useState("");

  useEffect(() => {
    const tenantData = JSON.parse(localStorage.getItem("tenantData"));
    if (tenantData && tenantData.id) {
      setTenantId(tenantData.id);
    }
  }, []);

  useEffect(() => {
    if (tenantId) {
      axios
        .get(`http://localhost:3001/api/complaints/getByTenant/${tenantId}`)
        .then((res) => {
          setComplaints(res.data.complaints || []);
          console.log("Complaints:", res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching complaints:", err);
          setError("Error fetching complaints");
          setLoading(false);
        });
    }
  }, [tenantId]); // Dependency array me tenantId rakho

  if (loading) return <p className="text-center">Loading complaints...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;
  if (!complaints.length) return <p className="text-center">No complaints found.</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-3">My Complaints</h2>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Tenant ID</th>
            <th>Complaint ID</th>
            <th>PG Name</th>
            <th>Room Name</th>
            <th>Room No</th>
            <th>Complaint Type</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th> {/* Added header for actions column */}
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.id}>
              <td>{complaint.tenantId}</td>
              <td>{complaint.id}</td>
              <td>{complaint.RoomsAvailable?.PG?.name || "N/A"}</td>
              <td>{complaint.RoomsAvailable?.name || "N/A"}</td>
              <td>{complaint.RoomsAvailable?.roomNumber || "N/A"}</td>
              <td>{complaint.complaintType}</td>
              <td>{complaint.description}</td>
              <td>
                <span className={`badge ${complaint.status === "done" ? "bg-success" : "bg-warning"}`}>
                  {complaint.status?.toUpperCase() || "PENDING"}
                </span>
              </td>
              <td>
              <button className="btn btn-danger btn-sm" onClick={() => downlodcomplaintprouf(complaint)}>
  PDF
</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyComplaints;
