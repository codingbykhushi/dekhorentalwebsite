import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import axios from "axios";
import "../css/AdminTenantList.css"

const AdminTenantList = () => {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/tenants/allTenant") // ✅ API call to fetch tenants
      .then((response) => setTenants(response.data))
      .catch((error) => console.error("Error fetching tenants:", error));
  }, []);

  return (
    <Container>
      <h2 className="text-center my-4">Tenant List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Passport</th>
            <th>International</th>
            <th>Aadhaar Number</th>
            <th>Visa Expiry Date</th>
            <th>Email</th>
            <th>Signup Date</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant.id}>
              <td>{tenant.id}</td>
              <td>{tenant.name}</td>
              <td>{tenant.contact}</td>
              <td>{tenant.address}</td>
              <td>{tenant.passport || "N/A"}</td>
              <td>{tenant.international ? "Yes" : "No"}</td>
              <td>{tenant.aadhaarNumber || "N/A"}</td>
              <td>{tenant.visaExpiryDate || "N/A"}</td>
              <td>{tenant.email}</td>
              <td>{new Date(tenant.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminTenantList;
