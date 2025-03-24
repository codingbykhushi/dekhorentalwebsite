import React, { useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/Maintnance.css';

const MaintenanceByDate = () => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = () => {
    if (!month || !year) {
      alert("Please select both month and year");
      return;
    }
    setLoading(true);
    axios.get(`http://localhost:3001/api/maintnance/pg-maintenance?month=${month}&year=${year}`)
      .then(response => {
        setRecords(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching maintenance records:", error);
        setLoading(false);
      });
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow border-0 rounded-3">
        <h2 className="text-center mb-4 text-primary">PG Maintenance Overview</h2>
        <div className="row mb-3 align-items-center justify-content-center">
          <div className="col-md-4">
            <select className="form-select shadow-sm" value={month} onChange={(e) => setMonth(e.target.value)}>
              <option value="">Select Month</option>
              {[
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ].map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="col-md-3">
            <input 
              type="number" 
              className="form-control shadow-sm" 
              placeholder="Year" 
              value={year} 
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary w-100 shadow-sm" onClick={handleFetch}>Get Maintenance</button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-muted">Loading maintenance records...</p>
        ) : (
          <>
            {records.length === 0 ? (
              <p className="text-center text-danger">No records found for {month} {year}.</p>
            ) : (
              <div className="table-responsive">
                <h3 className="text-center my-3 text-secondary">Maintenance Records for {month} {year}</h3>
                <table className="table table-bordered table-hover">
                  <thead className="text-white" style={{ background: "linear-gradient(45deg, #007bff, #6610f2)" }}>
                    <tr>
                      <th>PG Name</th>
                      <th>Owner Name</th>
                      <th>Owner ID</th>
                      <th>Total Rooms</th>
                      <th>Booked Room Count</th>
                      <th>Booked Room Names</th>
                      <th>Income</th>
                      <th>Commission</th>
                      <th>Expenditure</th>
                      <th>Expenditure Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-light" : "bg-white"}>
                        <td>{record.pgName}</td>
                        <td>{record.ownerName}</td>
                        <td>{record.ownerId}</td>
                        <td>{record.totalRooms}</td>
                        <td>{record.bookedRoomCount}</td>
                        <td>{record.bookedRoomNames}</td>
                        <td className="text-success fw-bold">₹{record.income}</td>
                        <td className="text-primary fw-bold">₹{record.commission}</td>
                        <td className="text-danger fw-bold">₹{record.expenditure}</td>
                        <td>{record.expenditureDescription}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MaintenanceByDate;
