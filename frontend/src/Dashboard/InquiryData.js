import React, { useEffect, useState } from "react";
import "../css/InqueryData.css";

const InqueryData = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/contacts/getContacts");
      const data = await response.json();

      if (data.success) {
        setContacts(data.contacts);
      } else {
        console.error("Error: Data fetch unsuccessful", data.message);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  return (
    <div className="inquiry-container">
      <h2>Contact Messages</h2>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.contact}</td>
                  <td>{contact.message}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No contacts found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InqueryData;
