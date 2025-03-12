import React, { useState } from "react";
import axios from "axios";
import '../css/ReadingForm.css'

const ReadingForm = () => {
  const [formData, setFormData] = useState({
    pgName: "",
    roomNo: "",
    previousReading: "",
    currentReading: "",
    ratePerUnit: "",
    fromDate: "",
    toDate: "",
    ownerId: "",
    tenantId: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); 
      if (!token) {
        console.error("No token found! Please login.");
        return;
      }

      const response = await axios.post(
        "http://localhost:3001/api/readings/addreading",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      console.log("Reading added successfully:", response.data);
      
      setFormData({
        pgName: "",
        roomNo: "",
        previousReading: "",
        currentReading: "",
        ratePerUnit: "",
        fromDate: "",
        toDate: "",
        ownerId: "",
        tenantId: "",
      });

      alert("Reading added successfully!");

    } catch (error) {
      console.error("Error adding reading:", error.response?.data || error.message);
    }
  };

  return (
    <div className="reading-container">
      <div className="reading-form-box">
        <h2>Add Reading</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="pgName" placeholder="PG Name" value={formData.pgName} onChange={handleChange} required />
          <input type="text" name="roomNo" placeholder="Room No" value={formData.roomNo} onChange={handleChange} required />
          <input type="number" name="previousReading" placeholder="Previous Reading" value={formData.previousReading} onChange={handleChange} required />
          <input type="number" name="currentReading" placeholder="Current Reading" value={formData.currentReading} onChange={handleChange} required />
          <input type="number" name="ratePerUnit" placeholder="Rate per Unit" value={formData.ratePerUnit} onChange={handleChange} required />
          <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} required />
          <input type="date" name="toDate" value={formData.toDate} onChange={handleChange} required />
          <input type="number" name="ownerId" placeholder="Owner ID" value={formData.ownerId} onChange={handleChange} required />
          <input type="number" name="tenantId" placeholder="Tenant ID" value={formData.tenantId} onChange={handleChange} required />

          <button type="submit">Add Reading</button>
        </form>
      </div>
    </div>
  );
};

export default ReadingForm;
