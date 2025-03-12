import React, { useState } from "react";
import axios from "axios";
import '../css/Employee.css'

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    contact: "", 
    address: "",
    role: "Staff",
    password: "",
    aadhaarNumber: "",  // Updated here
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    console.log("Sending token:", token); // Debugging line to check token
  
    try {
      const response = await axios.post(
        "http://localhost:3001/api/employees/addemployee",
        employee,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Employee added:", response.data); // Log response
      alert("Employee added successfully!");
      setEmployee({
        name: "",
        email: "",
        contact: "",
        aadhaarNumber: "",  // Resetting to empty
        address: "",
        role: "Staff",
        password: "",
      });
    } catch (error) {
      console.error("Error details:", error.response ? error.response.data : error.message);
      alert("Failed to add employee");
    }
  };

  return (
    <div className="Container-Employee">
    <div className="employee-container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" value={employee.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={employee.email} onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contact Number" value={employee.contact} onChange={handleChange} required />
        <input type="text" name="aadhaarNumber" placeholder="Aadhaar Number" value={employee.aadhaarNumber} onChange={handleChange} required />
        <textarea name="address" placeholder="Address" value={employee.address} onChange={handleChange} required></textarea>
        <select name="role" value={employee.role} onChange={handleChange}>
          <option value="Staff">Staff</option>
          <option value="Manager">Manager</option>
        </select>
        <input type="password" name="password" placeholder="Password" value={employee.password} onChange={handleChange} required />
        <button type="submit">Add Employee</button>
      </form>
    </div>
    </div>
  );
};

export default AddEmployee;
