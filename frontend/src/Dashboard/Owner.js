import React, { useState } from "react";
import axios from "axios";
import "../css/Owner.css";

const AddOwner = () => {
  const [owner, setOwner] = useState({
    name: "",
    email: "",
    pgName: "",
    aadhaarNumber: "",
    password: "", 
  });
  const [setGeneratedPassword] = useState(""); // ✅ Proper useState

  const handleChange = (e) => {
    setOwner({ ...owner, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3001/api/owners/add", 
        owner,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Owner added:", res.data); // Log response
      alert("Owner added successfully!");
        setOwner({ name: "", email: "", pgName: "", aadhaarNumber: "", password: "" });
      }
    catch (error) {
      console.error("Error details:", error.response ? error.response.data : error.message);
      alert("Failed to add owner");
    }
  };

  return (
    <div className="Container-Owner">
      <div className="add-owner">
        <h2>Add New Owner</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Owner Name"
            value={owner.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Owner Email"
            value={owner.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="pgName"
            placeholder="PG Name"
            value={owner.pgName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="aadhaarNumber"
            placeholder="Aadhaar Number"
            value={owner.aadhaarNumber}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={owner.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Add Owner</button>
        </form>
      </div>
    </div>
  );
};

export default AddOwner;
