import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

const MonthlyMaintenanceTables = () => {
  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3001/api/maintnance/pg-maintenance')
      .then(response => {
        const records = response.data.data;
        const grouped = records.reduce((acc, record) => {
          const key = `${record.month} ${record.year}`;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(record);
          return acc;
        }, {});
        setGroupedData(grouped);
      })
      .catch(error => {
        console.error("Error fetching PG maintenance data:", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Monthly PG Maintenance Overview</h2>
      {Object.keys(groupedData).length === 0 ? (
        <p className="text-center">Loading data...</p>
      ) : (
        Object.keys(groupedData).map(monthKey => {
          const records = groupedData[monthKey];
          return (
            <div key={monthKey} className="card shadow-lg p-4 mb-5">
              <h3 className="text-primary text-center">{monthKey}</h3>
              <div className="table-responsive">
                <table className="table table-striped table-bordered text-center">
                  <thead className="bg-primary text-white">
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
                      <tr key={idx} className="table-hover">
                        <td>{record.pgName}</td>
                        <td>{record.ownerName}</td>
                        <td>{record.ownerId}</td>
                        <td>{record.totalRooms}</td>
                        <td>{record.bookedRoomCount}</td>
                        <td>{record.bookedRoomNames}</td>
                        <td>{record.income}</td>
                        <td>{record.commission}</td>
                        <td>{record.expenditure}</td>
                        <td>{record.expenditureDescription}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MonthlyMaintenanceTables;
  