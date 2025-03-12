import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MonthlyMaintenanceTables = () => {
  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    // Backend se PG maintenance records fetch kar rahe hain
    axios.get('http://localhost:3001/api/maintnance/pg-maintenance')
      .then(response => {
        const records = response.data.data; // Expecting array of records
        // Records ko group kar rahe hain month aur year ke hisaab se, e.g., "January 2023"
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
    <div className="container">
      <h2>Monthly PG Maintenance Overview</h2>
      {Object.keys(groupedData).length === 0 ? (
        <p>Loading data...</p>
      ) : (
        Object.keys(groupedData).map(monthKey => {
          const records = groupedData[monthKey];
          return (
            <div key={monthKey} style={{ marginBottom: '40px' }}>
              <h3>{monthKey}</h3>
              <table className="table">
                <thead>
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
                    <tr key={idx}>
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
          );
        })
      )}
    </div>
  );
};

export default MonthlyMaintenanceTables;
