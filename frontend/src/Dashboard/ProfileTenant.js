import React, { useEffect, useState } from 'react';
import '../css/ProfileTenant.css';

const ProfilePage = () => {
  const [tenant, setTenant] = useState(null);

  useEffect(() => {
    // LocalStorage se tenant data fetch karein
    const storedTenant = localStorage.getItem('tenantData');
    if (storedTenant) {
      setTenant(JSON.parse(storedTenant));
    }
  }, []);

  return (
    <div className='profile-container'>
      <h2>Tenant Profile</h2>
      {tenant ? (
        <div className='profile-details'>
          <p><strong>Tenant Id:</strong> {tenant.id}</p>
          <p><strong>Name:</strong> {tenant.name}</p>
          <p><strong>Email:</strong> {tenant.email}</p>
          <p><strong>Contact:</strong> {tenant.contact}</p>
          <p><strong>Address:</strong> {tenant.address}</p>
          {tenant.international ? (
            <p><strong>Passport:</strong> {tenant.passport}</p>
          ) : (
            <p><strong>Aadhaar Number:</strong> {tenant.aadhaarNumber}</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
