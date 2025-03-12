import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/AdminEmployeeList.css";
import { Trash, Pencil } from "lucide-react";
import { Card, Button } from "react-bootstrap";

const AdminEmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editEmployeeData, setEditEmployeeData] = useState(null);
  const [isEditingEmployee, setIsEditingEmployee] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3001/api/employees/fetchemployee",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      console.log("API Response for employees:", response.data);
  
      if (Array.isArray(response.data)) {
        setEmployees(response.data);
      } else if (Array.isArray(response.data.employees)) {
        setEmployees(response.data.employees);
      } else {
        setEmployees([]);
      }
  
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch employees. Please try again.");
      setLoading(false);
    }
  };
  

  const handleDeleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:3001/api/employees/deleteemployee/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setEmployees(employees.filter((item) => item.id !== id));
    } catch (error) {
      setError("Failed to delete employee. Please try again.");
    }
  };

  const handleEditEmployee = (data) => {
    setEditEmployeeData(data);
    setIsEditingEmployee(true);
  };

  const handleUpdateEmployee = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3001/api/employees/${editEmployeeData.id}`,
        editEmployeeData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsEditingEmployee(false);
      fetchEmployees();
    } catch (error) {
      setError("Failed to update employee. Please try again.");
    }
  };

  return (
    <div className="admin-containerEp ">
      <h1 className="admin-titleEp mb-5">Employee List </h1>
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
         
          <div className="card-containerEp">
            {employees && employees.length > 0 ? (
              employees.map((employee) => (
                <Card key={employee.id} className="cardEp">
                  <Card.Body className="cardHover">
                    <h2>{employee.name}</h2>
                    <p>
                      <strong>Name:</strong> {employee.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {employee.email}
                    </p>
                    <p>
                      <strong>Adhar Number:</strong> {employee.aadhaarNumber}
                    </p>
                    <p>
                      <strong>Password:</strong> {employee.plainPassword}
                    </p>
                   
                      <Button onClick={() => handleEditEmployee(employee)}>
                        <Pencil size={16} /> Edit
                      </Button>
                      <Button onClick={() => handleDeleteEmployee(employee.id)}>
                        <Trash size={16} /> Delete
                      </Button>
                    
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>No Employees Found</p>
            )}
          </div>
        </>
      )}

      {isEditingEmployee && (
        <div className="edit-modal">
          <h2>Edit Employee</h2>
          <input
            type="text"
            value={editEmployeeData.name}
            onChange={(e) =>
              setEditEmployeeData({ ...editEmployeeData, name: e.target.value })
            }
          />
          <input
            type="email"
            value={editEmployeeData.email}
            onChange={(e) =>
              setEditEmployeeData({
                ...editEmployeeData,
                email: e.target.value,
              })
            }
          />
          <Button onClick={handleUpdateEmployee}>Update</Button>
          <Button onClick={() => setIsEditingEmployee(false)}>Cancel</Button>
        </div>
      )}
    </div>
  );
};

export default AdminEmployeeList;
