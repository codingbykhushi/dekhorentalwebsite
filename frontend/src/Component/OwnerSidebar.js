import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/OwnerDashboard.css"

import { FaSignOutAlt } from "react-icons/fa";

const OwnerSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Token remove karein
    navigate("/"); // Home page pe redirect karein
  };
  return (
    <div className="sidebar bg-dark text-white vh-100 p-3">
      <h4 className="mb-4">Owner Panel</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/owner">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/owner/ownerProfile">
            My profile
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link text-white"
            to="/owner/expenditure"
          >
            Expenditure & Income
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/owner/issues">
           View Complaints
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/owner/reading">
           View Reading
          </Link>
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

export default OwnerSidebar;




