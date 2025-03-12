import React, { useState } from "react";
import axios from "axios";
import "../css/Owner.css";

const AddOwner = () => {
  const [owner, setOwner] = useState({
    name: "",
    email: "",
    pgName: "",
    aadhaarNumber: "",
    password: "", // New field for password
  });
  const [setGeneratedPassword] = useState("");

  const handleChange = (e) => {
    setOwner({ ...owner, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Token ko localStorage se fetch karna

      const res = await axios.post(
        "http://localhost:3001/api/owners/add", 
        owner,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token ko Authorization header me bhejna
          },
        }
      );
      
      alert("Owner added successfully");
      setGeneratedPassword(res.data.owner.password);
      setOwner({ name: "", email: "", pgName: "", aadhaarNumber: "", password: "" }); // Reset form
    } catch (error) {
      console.error("Error adding owner:", error);
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
          type="password" // Password field added
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
