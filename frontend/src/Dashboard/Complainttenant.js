import { useState } from "react";
import "../css/Complaint.css";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    name: "",
    phone: "",
    pgName: "",
    RoomName: "",
    roomNumber: "",
    complaintType: "",
    description: "",
    tenantId: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Input Change Handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Send OTP Function
  const sendOtp = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setMessage("OTP sent to your email.");
      } else {
        setMessage(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      setMessage("Error sending OTP.");
    }
  };

  // ✅ Verify OTP Function
  const verifyOtp = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: formData.otp }),
      });

      const data = await response.json();
      if (response.ok) {
        setOtpVerified(true);
        setMessage("OTP verified successfully. You can submit a complaint now.");
      } else {
        setMessage(data.message || "Invalid OTP.");
      }
    } catch (error) {
      setMessage("Error verifying OTP.");
    }
  };

  // ✅ Submit Complaint Function
  const handleSubmit = async (event) => {
    event.preventDefault(); // Page reload hone se rokta hai

    try {
      const response = await fetch("http://localhost:3001/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Complaint submitted successfully.");
        setFormData({
          email: "",
          otp: "",
          name: "",
          phone: "",
          pgName: "",
          RoomName: "",
          roomNumber: "",
          complaintType: "",
          description: "",
          tenantId: "",
        });
        setOtpSent(false);
        setOtpVerified(false);
      } else {
        setMessage(data.message || "Failed to submit complaint.");
      }
    } catch (error) {
      setMessage("Error submitting complaint.");
    }
  };

  return (
    <div className="complaint-container">
      <div className="complaint-form mt-4">
        <h2>Register Complaint</h2>
        {message && <p className="text-center text-success">{message}</p>}

        {!otpSent ? (
          <div className="shadow p-4 rounded">
            <label className="form-label">Enter your email</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
            <button className="btn btn-primary mt-2" onClick={sendOtp}>Send OTP</button>
          </div>
        ) : !otpVerified ? (
          <div className="shadow p-4 rounded">
            <label className="form-label">Enter OTP</label>
            <input type="text" name="otp" className="form-control" value={formData.otp} onChange={handleChange} required />
            <button className="btn btn-success mt-2" onClick={verifyOtp}>Verify OTP</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="shadow p-4 rounded">
            {/* Complaint Form Fields */}
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
        )}
      </div>
    </div>
  );
};

export default ComplaintForm;
