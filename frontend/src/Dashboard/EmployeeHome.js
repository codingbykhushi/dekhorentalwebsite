import React from "react";
import "../css/EmployeeHome.css";
import EmployeeSidebar from "../Component/EmployeeSidebar.js";
import { useNavigate } from "react-router-dom";

const EmployeeHome = () => {
    const navigate = useNavigate();

  return (
    <div className="containerside">
        <EmployeeSidebar/>
    <div className="Employee-container">
        
      {/* Banner Section */}
      <div className="Detail-container ">
        <h1>Welcome to Dekho Rentals</h1>
        <p>"Success is not the key to happiness. Happiness is the key to success!"</p>
      </div>

      {/* Quick Info Cards */}
      <div className="info-section">
        <div className="info-card mt-3">
          <h3 >Bookings </h3>
        </div>
        <div className="info-card mt-3">
          <h3 onClick={() => navigate("/employee/Inquerylist")}>Inquery Data</h3>
          
        </div>
        <div className="info-card mt-3">
          <h3 onClick={() => navigate("/employee/Tenantlist")}>Users List</h3>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="terms-section">
        <h2>Terms & Conditions</h2>
        <ul>
          <li>Employees must update their records regularly.</li>
          <li>All user data must be handled securely.</li>
          <li>Unauthorized access is strictly prohibited.</li>
        </ul>
      </div>
    </div>
    </div>
  );
};

export default EmployeeHome;
