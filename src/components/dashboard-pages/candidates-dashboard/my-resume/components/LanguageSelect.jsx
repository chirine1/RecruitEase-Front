import React, { useEffect, useState } from "react";
import axios from "@/axios/axios";
import Select from "react-select";

const LanguageSelector = ({ onChange }) => {
  const [languageOptions, setLanguageOptions] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get("/language");
        const transformedLanguages = response.data.map((language) => ({
          value: language.label,
          label: language.label,
        }));
        setLanguageOptions(transformedLanguages);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };

    fetchLanguages();
  }, []);

  const handleLanguageChange = (selectedOptions) => {
    onChange(selectedOptions);
  };

  return (
    <div className="form-group col-lg-12 col-md-12">
      <div className="resume-outer">
        <div className="upper-title"></div>
        <div className="language-selector">
          <Select
            onChange={handleLanguageChange}
            options={languageOptions}
            isMulti
            classNamePrefix="select"
          />
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
