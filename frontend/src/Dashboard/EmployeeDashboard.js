import React from "react";
import { Routes, Route } from "react-router-dom";
import EmployeeHome from "./EmployeeHome";


// import EmployeeSidebar from "../Component/EmployeeSidebar";

import MyProfile from "./Profile.js";
import EmployeeComplaint from "./EmployeeComplaint.js";
import TenantListByEmp from "./GetTenantListByEmploye.js";
import InqueryDataEmp from "./InqueryListByEmp.js";
// import MaintainPgByEmployee from "./MaintainPgroombyemployee.js";



const EmployeeDashboard = () => {
  return (
    <div className="admin-dashboard">
      {/* <EmployeeSidebar /> */}
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<EmployeeHome />} />
          <Route path="/Tenantlist" element={<TenantListByEmp/>} />
          <Route path="/Inquerylist" element={<InqueryDataEmp />} />

          <Route path="employeeProfile" element={<MyProfile />} />
          {/* <Route path="maintainpg" element={<MaintainPgByEmployee />} /> */}
          <Route path="Empcomplaints" element={<EmployeeComplaint />} />
        </Routes>
      
      </div>
    </div>
  );
};

export default EmployeeDashboard;