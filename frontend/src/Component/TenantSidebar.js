// import React from "react";
// import { Link,useNavigate } from "react-router-dom";
// import "../css/OwnerDashboard.css";
// import { FaSignOutAlt } from "react-icons/fa";



// const TenantSidebar = () => {
//    const navigate = useNavigate();

//    const handleLogout = () => {
//     localStorage.removeItem("token"); 
//     navigate("/"); 
//   };


//   return (
//     <div className="sidebar bg-dark text-white vh-100 p-3">
//       <h4 className="mb-4">Tenant Panel</h4>
//       <ul className="nav flex-column">
//         <li className="nav-item">
//           <Link className="nav-link " to="/tenant">Dashboard</Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link " to="/tenant/tenantProfile">My Profile</Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link " to="/tenant/bookedRooms">My Booked Rooms</Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link " to="/tenant/complaints">Complaints Now</Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link " to="/tenant/complaintstatus">Complaints Status</Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link " to="/tenant/tenantreadings">Payble amount</Link>
//         </li>

//           <li>
//                  <button onClick={handleLogout} className="logout-btn">
//                      <FaSignOutAlt className="logout-icon" />
//                      Logout
//                    </button>
//                  </li>
//       </ul>
//     </div>
//   );
// };

// export default TenantSidebar;





  

  
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";


const TenantSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      <div className="hamburger" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Sidebar Navigation */}
      <div className={`left-section ${isOpen ? "open" : ""}`}>
        <h2>Tenant Panel</h2>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to="/tenant" onClick={toggleSidebar}>Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tenant/tenantProfile" onClick={toggleSidebar}>My Profile</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tenant/bookedRooms" onClick={toggleSidebar}>My Booked Rooms</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tenant/complaints" onClick={toggleSidebar}>Complaints Now</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tenant/complaintstatus" onClick={toggleSidebar}>Complaints Status</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tenant/tenantreadings" onClick={toggleSidebar}>Payable Amount</Link>
          </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="logout-btn">
              <FaSignOutAlt className="logout-icon" /> Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default TenantSidebar;
