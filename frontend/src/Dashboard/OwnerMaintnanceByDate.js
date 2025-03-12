import React, { useState } from 'react';
import axios from 'axios';
import '../css/Maintnance.css'

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
    <div className="container" style={{ padding: '20px' }}>
      <h2>Select Month and Year for Maintenance Data</h2>
      <div className="date-selector" style={{ marginBottom: '20px' }}>
        <select 
          value={month} 
          onChange={(e) => setMonth(e.target.value)}
          style={{ padding: '8px', marginRight: '10px' }}
        >
          <option value="">Select Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        <input 
          type="number" 
          placeholder="Year" 
          value={year} 
          onChange={(e) => setYear(e.target.value)}
          style={{ padding: '8px', width: '100px', marginRight: '10px' }}
        />
        <button onClick={handleFetch} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Get Maintenance
        </button>
      </div>

      {loading ? (
        <p>Loading maintenance records...</p>
      ) : (
        <>
          {records.length === 0 ? (
            <p>No maintenance records found for {month} {year}.</p>
          ) : (
            <div className='table-responsive'>
              <h3>Maintenance Records for {month} {year}</h3>
              <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>PG Name</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Owner Name</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Owner ID</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total Rooms</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Booked Room Count</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Booked Room Names</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Income</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Commission</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Expenditure</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Expenditure Description</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, idx) => (
                    <tr key={idx}>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{record.pgName}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{record.ownerName}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{record.ownerId}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{record.totalRooms}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{record.bookedRoomCount}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{record.bookedRoomNames}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{record.income}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{record.commission}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{record.expenditure}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{record.expenditureDescription}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MaintenanceByDate;
