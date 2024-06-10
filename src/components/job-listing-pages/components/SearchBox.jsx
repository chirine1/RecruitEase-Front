import React, { useState } from "react";

const SearchBox = ({title, setTitle}) => {
  

  // Handler for input change
  const handleChange = (e) => {
    setTitle(e.target.value);
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
        name="title"
        placeholder="Job title"
        value={title}
        onChange={handleChange}
        style={inputStyle}
      />
    </div>
  );
};

export default SearchBox;
