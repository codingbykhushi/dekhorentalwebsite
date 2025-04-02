import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

const EmployeeSidebar = () => {
  const navigate = useNavigate();
   const [isOpen, setIsOpen] = useState(false);
  
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/"); 
  };

  return (
    <div>
   <div className="hamburger" onClick={toggleSidebar}>
           {isOpen ? <FaTimes /> : <FaBars />}
         </div>
   
      
         <div className={`left-section ${isOpen ? "open" : ""}`}>
           <h2>Admin Panel</h2>
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
    </div>

  );
};

export default EmployeeSidebar;
