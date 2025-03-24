import React from "react";
import { Routes, Route } from "react-router-dom";

import TenantHome from "./TenantHome";
import TenantsLoginRooms from "./tenantLoginRooms";
// import TenantSidebar from "../Component/TenantSidebar";
import ComplaintForm from "./Complainttenant";
import ProfilePage from "./ProfileTenant.js";
import TenantReadings from "./TenantReading.js";
import Payments from "./Payments.js";
// import TenantComplaints from "./TenantCompliant.js";
import MyComplaints from "./TenantCompliant.js";


// import Profile from "./TenantProfile";

const TenantDashboard = () => {
  return (
    <div className="admin-dashboard">
      {/* <TenantSidebar /> */}
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<TenantHome />} />
          <Route path="rooms/:pgId" element={<TenantsLoginRooms />} />
          <Route path="payments/:roomId" element={<Payments />} /> {/* ✅ "payments" → "payment" */}
          <Route path="complaintstatus" element={<MyComplaints/>} />  
          <Route path="complaints" element={<ComplaintForm />} />
          <Route path="tenantProfile" element={<ProfilePage />} />
          <Route path="tenantreadings" element={<TenantReadings />} />
          
          {/* <Route path="tenantProfile" element={<Profile/>} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default TenantDashboard;
