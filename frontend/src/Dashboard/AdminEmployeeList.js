import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/AdminEmployeeList.css";
import { Trash, Pencil, } from "lucide-react";
import {Button, Table,Form,Modal } from "react-bootstrap";

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
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
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
    <div className="admin-containerEp">
      <h1 className="admin-titleEp mb-5">Employee List</h1>
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-container">
          <Table className="employee-table" striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Aadhar Number</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.aadhaarNumber}</td>
                    <td>{employee.plainPassword}</td>
                    <td>
  <Button variant="warning" size="sm" onClick={() => handleEditEmployee(employee)} className="me-2">
    <Pencil size={12} /> 
  </Button>
  <Button variant="danger" size="sm" onClick={() => handleDeleteEmployee(employee.id)}>
    <Trash size={12} /> 
  </Button>
</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No Employees Found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}

<Modal show={isEditingEmployee} onHide={() => setIsEditingEmployee(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Owner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editEmployeeData?.name || ""}
                onChange={(e) => setEditEmployeeData({ ...editEmployeeData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editEmployeeData?.email || ""}
                onChange={(e) => setEditEmployeeData({ ...editEmployeeData, email: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() =>setIsEditingEmployee(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdateEmployee}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
  );
};

export default AdminEmployeeList;
