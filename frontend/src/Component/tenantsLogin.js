import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/Tenats.css";

const TenantLogin = () => {
  const [isSignup, setIsSignup] = useState(false); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    aadhaarNumber: '',
    passport: '',
    international: false,
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value, // Checkbox ke liye checked value use karna
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSignup) {
      try {
        const response = await axios.post('http://localhost:3001/api/tenants/register', formData);
        alert('Signup successful! You can now login.');
        setIsSignup(false);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:3001/api/tenants/login', formData);
        console.log('Login success:', response.data);
  
        localStorage.setItem('tenantData', JSON.stringify(response.data.tenant));
  
        navigate('/tenant'); 
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      }
    }
  };
  
  return (
    <div className="containerTen">
      <h2>{isSignup ? 'Tenant Signup' : 'Tenant Login'}</h2>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        {isSignup && (
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        <div className='d-flex gap-5'>

        <div className="form-group w-50">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group w-50">
          <label htmlFor="contact">Contact Number</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            required
          />
        </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        {isSignup && (
          <>
                  <div className='d-flex gap-5'>

            <div className="form-group">
              <label htmlFor="aadhaarNumber">Aadhaar Number (for Indian tenants)</label>
              <input
                type="text"
                id="aadhaarNumber"
                name="aadhaarNumber"
                value={formData.aadhaarNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group" >
              <label htmlFor="passport">Passport (for international tenants)</label>
              <input
                type="text"
                id="passport"
                name="passport"
                value={formData.passport}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="international">International Tenant</label>
              <input
                type="checkbox"
                id="international"
                name="international"
                checked={formData.international}
                onChange={handleInputChange}
              />
            </div>
            </div>

            
          </>
        )}

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
      </form>

      <div>
        {isSignup ? (
          <p>
            Already have an account? <button onClick={() => setIsSignup(false)}>Login here</button>
          </p>
        ) : (
          <p>
            Don't have an account? <button onClick={() => setIsSignup(true)}>Sign up here</button>
          </p>
        )}
      </div>
    </div>
  );
};

export default TenantLogin;