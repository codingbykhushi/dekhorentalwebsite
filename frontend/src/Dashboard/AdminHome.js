import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../img/1.png";
import Sidebar from "../Component/Sidebar.js";
import "../css/AdminHome.css";

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-home-container">
      {/* Left side: Sidebar */}
      
        <Sidebar />
      
      {/* Right side: Content with Background Image */}
      <div className="right-section">
        <div
          className="background-image"
          style={{
            marginTop:"0px",
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        > <h1 className="d-flex justify-content-center text-white fw-bold" style={{marginTop:'10px'}}>Welcome Admin</h1></div>
        
       
       
        <div className="content-overlay">
       
          <div className="button-group mt-3">
            <button className="btn btn-primary" onClick={() => navigate("/admin/ownersList")}>
              Owner List
            </button>
            <button className="btn btn-secondary" onClick={() => navigate("/admin/employeesList")}>
              Employee List
            </button>
            <button className="btn btn-danger" onClick={() => navigate("/admin/tenantsList")}>
              Tenant List
            </button>
            
          </div>
          <div className="button-group mt-5">
          <button className="btn btn-success" onClick={() => navigate("/admin/PGList")}>
              PGs List
            </button>
            <button className="btn btn-success" onClick={() => navigate("/admin/InquiryData")}>
              Inquiry Data
            </button>
            <button className="btn btn-success" onClick={() => navigate("/admin/ownermaintenancechart")}>
              Owner Maintenance 
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
