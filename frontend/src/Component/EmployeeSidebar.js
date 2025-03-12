import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const EmployeeSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/"); 
  };

  return (
    <div className="sidebar">
      <h2>Employee Panel</h2>
      <ul>
        <li>
          <Link to="/employee">Dashboard</Link>
        </li>
        <li>
          <Link to="employeeProfile">My Profile</Link>
        </li>
        <li>
          <Link to="Empcomplaints">View Complaint</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt className="logout-icon" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default EmployeeSidebar;
