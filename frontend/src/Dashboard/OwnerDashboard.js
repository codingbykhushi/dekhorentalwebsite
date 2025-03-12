import React from "react";
import { Routes, Route } from "react-router-dom";
import OwnerSidebar from "../Component/OwnerSidebar";

import OwnerHome from "./OwnerHome.js";

import OwnerRooms from "./OwnerRooms.js";
import ComplaintList from "./OwnerComplaintpg.js";
import OwnerReadings from "./OwnerReading.js";
import MyProfile from "./Profile.js";

const OwnerDashboard = () => {
  return (
    <div className="d-flex">
      <OwnerSidebar />
      <div className="p-4" style={{  width: "100%" }}>
        <Routes>
        <Route path="/" element={< OwnerHome/>} />
        <Route path="rooms/:pgId" element={<OwnerRooms />} /> 
        <Route path="issues" element={<ComplaintList />} />
        <Route path="reading" element={<OwnerReadings />} />
          <Route path="ownerProfile" element={<MyProfile />} />
          
        </Routes>
      </div>
    </div>
  );
};

export default OwnerDashboard;
