import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Login.css";
import MyNavbar from "./Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let url = "";

      if (role === "owner") {
        url = "http://localhost:3001/api/owners/login";
      } else if (role === "admin") {
        url = "http://localhost:3001/api/admin/login";
      } else if (role === "employee") {
        url = "http://localhost:3001/api/employees/LoginEmployee";  
      } else {
        setError("Please select a valid role.");
        return;
      }

      const response = await axios.post(url, { email, password });
      if (response.data.ownerId) {
        localStorage.setItem("ownerId", response.data.ownerId); // ✅ Save ownerId
        console.log("Stored Owner ID:", localStorage.getItem("ownerId"));

      }
      console.log("🔍 API Response Data:", response.data);

      if (response.status === 200) {
        const { token } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("userRole", role);
        console.log("🔍 Stored User Data:", localStorage.getItem("userData"));


        // ✅ Owner Data
        if (role === "owner") {
          const { ownerId, name, email, pgName, aadhaarNumber,plainPassword } = response.data;
          const ownerData = { ownerId, name, email, pgName, aadhaarNumber,plainPassword};
          console.log("🛠 Storing Owner Data:", ownerData);
          localStorage.setItem("userData", JSON.stringify(ownerData));
          console.log("🔍 After Storing:", localStorage.getItem("userData")); // Check if it's stored
          navigate("/owner");
        } 
        
        // ✅ Admin Data
        else if (role === "admin") {
          navigate("/admin");
        } 
        
        // ✅ Employee Data
        else if (role === "employee") {
          const { employeeId, name, email,contact,address,aadhaarNumber, designation,plainPassword} = response.data;
          const employeeData = { employeeId, name, email,contact,address,aadhaarNumber, designation,plainPassword };
          console.log("🛠 Storing Owner Data:",employeeData);
          localStorage.setItem("userData", JSON.stringify(employeeData));
          console.log("🔍 After Storing:", localStorage.getItem("userData")); // Check if it's stored
      
          navigate("/employee");
        }
      }
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data || error.message);
      setError("Invalid Email, Password, or Role Selection!");
    }
  };

  return (
    <div>
      <div className="login-container" style={{ marginTop: "0" }}>
        <MyNavbar />
        <Container>
          <Container className="mt-5" style={{ maxWidth: "400px" }}>
            <h2 className="text-center">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Select Role</Form.Label>
                <Form.Select value={role} onChange={(e) => setRole(e.target.value)} required>
                  <option value="">Choose...</option>
                  <option value="admin">Admin</option>
                  <option value="owner">Owner</option>
                  <option value="employee">Employee</option>
                </Form.Select>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
          </Container>
        </Container>
      </div>
    </div>
  );
};

export default Login;
