import React from "react";

const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "#007bff",
        color: "white",
        padding: "10px 15px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
};

export default Button;
