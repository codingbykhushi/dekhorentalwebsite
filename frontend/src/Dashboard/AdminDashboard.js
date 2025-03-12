


import React from "react";
import { Routes, Route } from "react-router-dom";
// import Sidebar from "../Component/Sidebar";
import AdminHome from "./AdminHome";
import Owners from "./Owner";
import AddRoom from "./Addrooms";
import Employees from "./Employee";
import ComplaintsList from "./ComplaintAdmin.js";
import Payments from "./Payments";
import PGList from "./PGList";

import AdminOwnerList from "./AdminOwnerList";
import AdminEmployeeList from "./AdminEmployeeList";
import AdminTenantList from "./AdminTenantsList";
import "../css/AdminDashboard.css";
import InqueryData from "./InquiryData.js";
import RoomsDetailsAdmin from "./RoomListAdmin.js";
import OfferForm from "./OfferForm.js";
import ReadingForm from "./ReadingForm.js";
import ReadingsList from "./AdminReadingList.js";
import AdminMaintenanceForm from "./MaintnaceFormAdmin.js";
// import DetailedPGMaintenanceChart from "./OwnerPGMaintenaceChart.js";
// import MonthlyMaintenanceTables from "./OwnerPGMaintenaceChart.js";
import MaintenanceByDate from "./OwnerMaintnanceByDate.js";



const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      {/* <Sidebar /> */}
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/ownersList" element={<AdminOwnerList/>} />
          <Route path="/employeesList" element={<AdminEmployeeList/>} />
          <Route path="/tenantsList" element={<AdminTenantList/>} />
          <Route path="/PGList" element={<PGList/>} />
          <Route path="/PGList/rooms/:pgId" element={<RoomsDetailsAdmin/>}/>
        
          <Route path="/ownermaintenancechart" element={<MaintenanceByDate/>} />
          <Route path="/InquiryData" element={<InqueryData/>} />



          <Route path="owners" element={<Owners />} />
          <Route path="rooms" element={<AddRoom />} />
          <Route path="employees" element={<Employees />} />
          <Route path="offer" element={<OfferForm />} />
          <Route path="complaints" element={<ComplaintsList />} />
          <Route path="readings" element={<ReadingForm />} />
          <Route path="allreadings" element={<ReadingsList />} />
          <Route path="payments" element={<Payments />} />
          <Route path="maintenance" element={<AdminMaintenanceForm />} />
       
        </Routes>
      
      </div>
    </div>
  );
};

export default AdminDashboard;
