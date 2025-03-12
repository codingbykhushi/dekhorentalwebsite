import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../css/Profile.css";

const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null); // State for role

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    const storedData = localStorage.getItem("userData");

    if (storedRole) {
      setUserRole(storedRole); // Set role from localStorage
    }

    if (storedData) {
      try {
        setUserData(JSON.parse(storedData));
      } catch (error) {
        console.error("Error parsing JSON:", error);
        localStorage.removeItem("userData");
      }
    }
  }, []);

  if (!userData || !userRole) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="profile-container">
      <h2 className="profile-heading">My Profile</h2>
      <div className="d-flex justify-content-center">
        <div className="profile-card w-50">
          <div className="profile-info">
            {/* {userRole === "tenant" && (
              <>
                <p><strong>Tenant Id:</strong> {userData.tenantId}</p>
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Contact:</strong> {userData.contact}</p>
                <p><strong>Address:</strong> {userData.address}</p>
                {userData.international ? (
                  <p><strong>Passport:</strong> {userData.passport}</p>
                ) : (
                  <p><strong>Aadhaar Number:</strong> {userData.aadhaarNumber}</p>
                )}
              </>
            )} */}

            {userRole === "employee" && (
              <>
                <p><strong>Employee Id:</strong> {userData.employeeId}</p>
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Contact:</strong> {userData.contact}</p>
                <p><strong>Adhar Number:</strong> {userData.aadhaarNumber}</p>
                <p><strong>Password:</strong> {userData.plainPassword}</p>
                <p><strong>Address:</strong> {userData.address}</p>
              </>
            )}

            {userRole === "owner" && (
              <>
                <p><strong>Owner Id:</strong> {userData.ownerId}</p>
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>PG Name:</strong> {userData.pgName}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Aadhaar Number:</strong> {userData.aadhaarNumber}</p>
                <p><strong>Password:</strong> {userData.plainPassword}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MyProfile;