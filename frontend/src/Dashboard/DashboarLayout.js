import React from "react";
import { useParams } from "react-router-dom"; // Ya props se role pass karo

const Dashboard = ({ role }) => {
  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary">Welcome to Your Dashboard</h2>
      <div className="row">
        {/* Owner Dashboard */}
        {role === "owner" && (
          <>
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h5>Total Rooms</h5>
                <p>50</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h5>Total Earnings</h5>
                <p>₹1,50,000</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h5>Active Tenants</h5>
                <p>30</p>
              </div>
            </div>
          </>
        )}

        {/* Tenant Dashboard */}
        {role === "tenant" && (
          <>
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h5>My Room</h5>
                <p>Room A1</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h5>Rent Due</h5>
                <p>₹5000</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h5>My Complaints</h5>
                <p>2 Pending</p>
              </div>
            </div>
          </>
        )}

        {/* Employee Dashboard */}
        {role === "employee" && (
          <>
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h5>Assigned Tasks</h5>
                <p>5</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h5>Pending Complaints</h5>
                <p>3</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h5>Work Summary</h5>
                <p>Completed: 10</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
