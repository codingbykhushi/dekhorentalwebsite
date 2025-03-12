import { useState } from "react";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pgName: "",
    RoomName: "",
    roomNumber: "",
    complaintType: "",
    description: "",
    tenantId:"",
  });

  const [message, setMessage] = useState("");

  // ✅ Input Change Handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:3001/api/complaints/createCom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Complaint submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          pgName: "",
          RoomName: "",
          roomNumber: "",
          complaintType: "",
          description: "",
          tenantId:"",
        });
      } else {
        setMessage(data.message || "Something went wrong!");
      }
    } catch (error) {
      setMessage("Failed to submit complaint.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-3">Register Complaint</h2>

      {message && <p className="text-center text-success">{message}</p>}

      <form onSubmit={handleSubmit} className="shadow p-4 rounded">
        <div className="row">
        <div className="col-md-6 mb-3">
            <label className="form-label">Tenant Id</label>
            <input type="text" name="tenantId" className="form-control" value={formData.tenantId} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Phone</label>
            <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">PG Name</label>
            <input type="text" name="pgName" className="form-control" value={formData.pgName} onChange={handleChange} required />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Room Name</label>
            <input type="text" name="RoomName" className="form-control" value={formData.RoomName} onChange={handleChange} required />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Room Number</label>
            <input type="text" name="roomNumber" className="form-control" value={formData.roomNumber} onChange={handleChange} required />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Complaint Type</label>
            <select name="complaintType" className="form-control" value={formData.complaintType} onChange={handleChange} required>
              <option value="">Select Type</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Cleanliness">Cleanliness</option>
              <option value="Electricity Issue">Electricity Issue</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="col-md-12 mb-3">
            <label className="form-label">Description</label>
            <textarea name="description" className="form-control" value={formData.description} onChange={handleChange} rows="3" required></textarea>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary px-4">Submit</button>
          </div>
        </div>
      </form>
     
    </div>
    
  );
};

export default ComplaintForm;
