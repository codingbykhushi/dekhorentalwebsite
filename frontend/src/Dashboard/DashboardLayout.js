import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const DashboardLayout = ({ children, role }) => {
  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={3} className="bg-light vh-100 p-3">
          <h4>{role} Dashboard</h4>
          <Nav className="flex-column">
            <Nav.Link as={Link} to={`/${role.toLowerCase()}-dashboard`}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/rooms">Rooms</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={9} className="p-4">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardLayout;
