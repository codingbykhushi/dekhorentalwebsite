import React from "react";

const Card = ({ children }) => {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "20px",
      boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
      backgroundColor: "white"
    }}>
      {children}
    </div>
  );
};

const CardContent = ({ children }) => {
  return <div style={{ padding: "10px" }}>{children}</div>;
};

// ✅ Default Export Fix
export { Card, CardContent };
