import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "../css/AdminHome.css"; 

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Icon - only visible on mobile via CSS */}
      <div className="hamburger" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Sidebar - toggles .open class on mobile */}
      <div className={`left-section ${isOpen ? "open" : ""}`}>
        <h2>Admin Panel</h2>
        <ul>
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/admin/owners">Add Owners</Link></li>
          <li><Link to="/admin/employees">Add Employees</Link></li>
          <li><Link to="/admin/rooms">Add PGs</Link></li>
          <li><Link to="/admin/complaints">View Complaints</Link></li>
          <li><Link to="/admin/readings">Add Reading</Link></li>
          <li><Link to="/admin/allreadings">Reading List</Link></li>
          <li><Link to="/admin/offer">Create Offer</Link></li>
          <li><Link to="/admin/payments">Payments</Link></li>
          <li><Link to="/admin/maintenance">Maintenance</Link></li>
          <li>
            <button className="logout-btn">Logout</button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
