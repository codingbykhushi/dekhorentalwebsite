import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container } from "react-bootstrap";

const ReadingsList = () => {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReadings();
  }, []);

  const fetchReadings = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/readings/allreading");
      setReadings(response.data.readings);
      setLoading(false);
    } catch (err) {
      setError("Error fetching readings");
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">All Readings</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : readings.length === 0 ? (
        <p>No readings found</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="bg-primary text-white">
            <tr>
              <th>ID</th>
              <th>PG Name</th>
              <th>Room No</th>
              <th>Previous Reading</th>
              <th>Current Reading</th>
              <th>Rate Per Unit</th>
              <th>Total Units</th>
              <th>Bill Amount</th>
              <th>From Date</th>
              <th>To Date</th>
            </tr>
          </thead>
          <tbody>
            {readings.map((reading) => (
              <tr key={reading.id}>
                <td>{reading.id}</td>
                <td>{reading.pgName}</td>
                <td>{reading.roomNo}</td>
                <td>{reading.previousReading}</td>
                <td>{reading.currentReading}</td>
                <td>{reading.ratePerUnit}</td>
                <td>{reading.totalUnits}</td>
                <td>{reading.billAmount}</td>
                <td>{new Date(reading.fromDate).toLocaleDateString()}</td>
                <td>{new Date(reading.toDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ReadingsList;
