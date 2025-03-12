import React from "react";
import { Link,useNavigate } from "react-router-dom";
import "../css/OwnerDashboard.css";
import { FaSignOutAlt } from "react-icons/fa";



const TenantSidebar = () => {
   const navigate = useNavigate();

   const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/"); 
  };


  return (
    <div className="sidebar bg-dark text-white vh-100 p-3">
      <h4 className="mb-4">Tenant Panel</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link " to="/tenant">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/tenant/tenantProfile">My Profile</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/tenant/bookedRooms">My Booked Rooms</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/tenant/complaints">Complaints Now</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/tenant/complaintstatus">Complaints Status</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/tenant/tenantreadings">Payble amount</Link>
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

export default TenantSidebar;