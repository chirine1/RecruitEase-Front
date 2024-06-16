import React, { useState } from "react";

const LocationBox = ({location , setLocation}) => {
  

  // Handler for input change
  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  // Inline CSS styles
  const inputStyle = {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    flex: "1", // Allow the inputs to take up equal space
  };

  return (
    <div>
      <input
        type="text"
        name="location"
        placeholder="Country"
        value={location}
        onChange={handleChange}
        style={inputStyle}
      />
    </div>
  );
};

export default LocationBox;
