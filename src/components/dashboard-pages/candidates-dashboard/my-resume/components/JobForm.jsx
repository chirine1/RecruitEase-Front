import React, { useState } from 'react';

function JobForm() {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [duration, setDuration] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, e.g., sending data to backend
    console.log({
      jobTitle,
      companyName,
      duration,
      postDescription,
      location
    });
    // Clear form fields after submission
    setJobTitle('');
    setCompanyName('');
    setDuration('');
    setPostDescription('');
    setLocation('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Job Title:
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Company Name:
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Duration:
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Post Description:
          <textarea
            value={postDescription}
            onChange={(e) => setPostDescription(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </label>
      </div>
      <br/>
      <div className="form-group col-sm-12 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
           Submit
          </button>
        </div>
      
    </form>
  );
}

export default JobForm;
