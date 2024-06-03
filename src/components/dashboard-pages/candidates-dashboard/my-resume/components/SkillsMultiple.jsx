// SkillSelector.js
import React, { useEffect, useState } from "react";
import axios from "@/axios/axios";
import Select from "react-select";

const SkillSelector = ({ onChange }) => {
  const [skillOptions, setSkillOptions] = useState([]);

  useEffect(() => {
    
    axios
      .get("/skill")
      .then((response) => {
        const transformedSkills = response.data.map((skill) => ({
          value: skill.label,
          label: skill.label,
        }));
        setSkillOptions(transformedSkills);
      })
      .catch((error) => {
        console.error("Error fetching skills:", error);
      });
  }, []);

  const handleSkillChange = (selectedOptions) => {
    // Handle skill selection here
    onChange(selectedOptions);
  };

  return (
    <div className="form-group col-lg-12 col-md-12">
      <div className="resume-outer">
        <div className="upper-title"></div>
        <div className="skill-selector-container">
          <Select
            options={skillOptions}
            isMulti
            onChange={handleSkillChange}
            className=""
            classNamePrefix="select"
          />
        </div>
      </div>
    </div>
  );
};

export default SkillSelector;
