import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./Component/Home.js";

import Rooms from "./Component/Room.js";
import Contact from "./Component/Contact.js";
import Login from "./Component/Login.js";
import AdminDashboard from "./Dashboard/AdminDashboard.js";
import OwnerDashboard from "./Dashboard/OwnerDashboard.js";
import TenantDashboard from "./Dashboard/TenantDashboard.js";
import EmployeeDashboard from "./Dashboard/EmployeeDashboard.js";
import Footer from "./Component/Footer.js";
import Services from "./Component/Service.js";
import About from "./Component/About.js";
import TenantLogin from "./Component/tenantsLogin.js";
import RoomsDetails from "./Component/RoomDetails.js";
import OffersProvider from "./Component/context/OfferContext.js";
import FetchByCity from "./Component/FetchByCity.js";

function App() {
  return (
    <Router>
      <OffersProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/pgs/filterPg/:city" element={<FetchByCity />} />
        <Route path="/room-details/:pgId" element={<RoomsDetails/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signIn" element={<Login />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/loginTenant" element={<TenantLogin />} />
        
       

        {/* ✅ Admin Dashboard should have nested routes */}
        <Route path="/admin/*" element={<AdminDashboard />} />

        <Route path="/owner/*" element={<OwnerDashboard />} />
        <Route path="/tenant/*" element={<TenantDashboard />} />
        <Route path="/employee/*" element={<EmployeeDashboard />} />
      </Routes>
      </OffersProvider>
      <Footer />
      
    </Router>

  );
}

export default App;