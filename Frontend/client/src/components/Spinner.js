import React from "react";
import "../styles/spinner.css"; // Create a separate CSS file for custom styling

const Spinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
};

export default Spinner;
