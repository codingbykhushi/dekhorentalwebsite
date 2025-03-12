import React, { useState } from 'react';
import axios from 'axios';
import '../css/MaintenanceForm.css';

const AdminMaintenanceForm = () => {
  const [formData, setFormData] = useState({
    pgName: '',
    ownerName: '',
    ownerId: '',
    totalRooms: '',
    bookedRoomCount: '',
    bookedRoomNames: [],
    income: '',
    commission: '',
    expenditure: '',
    expenditureDescription: '',
    month: '',
    year: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleBookedRoomNamesChange = (e) => {
    const { value } = e.target;
    const updatedBookedRoomNames = value.split(',').map(room => room.trim());
    setFormData({
      ...formData,
      bookedRoomNames: updatedBookedRoomNames
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/api/maintnance/add-pg-maintenance', formData)
      .then(response => {
        alert('PG data successfully added');
        setFormData({
          pgName: '',
          ownerName: '',
          ownerId: '',
          totalRooms: '',
          bookedRoomCount: '',
          bookedRoomNames: [],
          income: '',
          commission: '',
          expenditure: '',
          expenditureDescription: '',
          month: '',
          year: ''
        });
      })
      .catch(error => {
        console.error('Error submitting form:', error);
      });
  };

  return (
    <div className="Container-Maintenance">
      <div className="Main-container">
        <h2 className="title text-center">Admin - PG Maintenance Form</h2>

        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Month</label>
            <select 
              name="month" 
              value={formData.month} 
              onChange={handleChange} 
              className="form-control"
              required
            >
              <option value="">Select Month</option>
              {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Year</label>
                <input 
                  type="number" 
                  name="year" 
                  value={formData.year} 
                  onChange={handleChange} 
                  className="form-control"
                  required
                />
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="form-group">
                <label>PG Name</label>
                <input 
                  type="text" 
                  name="pgName" 
                  value={formData.pgName} 
                  onChange={handleChange} 
                  className="form-control"
                  required 
                />
              </div>
            </div>
          </div>  

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Owner Name</label>
                <input 
                  type="text" 
                  name="ownerName" 
                  value={formData.ownerName} 
                  onChange={handleChange} 
                  className="form-control"
                  required 
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Owner ID</label>
                <input 
                  type="text" 
                  name="ownerId" 
                  value={formData.ownerId} 
                  onChange={handleChange} 
                  className="form-control"
                  required 
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Total Rooms in PG</label>
                <input 
                  type="number" 
                  name="totalRooms" 
                  value={formData.totalRooms} 
                  onChange={handleChange} 
                  className="form-control"
                  required 
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Booked Room Count</label>
                <input 
                  type="number" 
                  name="bookedRoomCount" 
                  value={formData.bookedRoomCount} 
                  onChange={handleChange} 
                  className="form-control"
                  required 
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Names of Booked Rooms (comma separated)</label>
            <input 
              type="text" 
              name="bookedRoomNames" 
              value={formData.bookedRoomNames.join(', ')}  
              onChange={handleBookedRoomNamesChange} 
              className="form-control"
              required 
            />
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Income from Bookings</label>
                <input 
                  type="number" 
                  name="income" 
                  value={formData.income} 
                  onChange={handleChange} 
                  className="form-control"
                  required 
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Admin Commission</label>
                <input 
                  type="number" 
                  name="commission" 
                  value={formData.commission} 
                  onChange={handleChange} 
                  className="form-control"
                  required 
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Expenditure</label>
            <input 
              type="number" 
              name="expenditure" 
              value={formData.expenditure} 
              onChange={handleChange} 
              className="form-control"
              required 
            />
          </div>

          <div className="form-group">
            <label>Expenditure Description</label>
            <textarea 
              name="expenditureDescription" 
              value={formData.expenditureDescription} 
              onChange={handleChange} 
              className="form-control"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AdminMaintenanceForm;
