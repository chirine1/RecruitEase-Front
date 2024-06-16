import React, { useState } from 'react';

const EducationForm = () => {
  const [formData, setFormData] = useState({
    degreeLevel: '',
    location: '',
    duration: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to server or perform validation
    console.log(formData);
    // Reset form after submission
    setFormData({
      degreeLevel: '',
      location: '',
      duration: '',
      description: ''
    });
  };

  return (
    <div>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="degreeLevel">Degree Level:</label>
          <input
            type="text"
            id="degreeLevel"
            name="degreeLevel"
            value={formData.degreeLevel}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="duration">Duration:</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group col-sm-12 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
           Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EducationForm;
