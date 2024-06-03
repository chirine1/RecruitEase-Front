import { axiosPrivate } from "@/axios/axios";
import axios from "@/axios/axios";
import { isNumeric, validatePhoneNumber } from "@/utils/formControl";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const FormInfoBox = () => {
  //init data
  const [genderOptions, setGenderOptions] = useState([]);
  const [careerLevelOptions, setCareerLevelOptions] = useState([]);
  const [educationLevelOptions, setEducationLevelOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  //errors
  const [Error, setError] = useState(false);
  const [ageError, setAgeError] = useState("");
  const [salaryError, setSalaryError] = useState("");
  const [currentSalaryError, setCurrentSalaryError] = useState("");
  const [expectedSalaryError, setExpectedSalaryError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  //init data
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [age, setAge] = useState(18);
  const [gender, setGender] = useState("");
  const [careerLevel, setCareerLevel] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [currentSalary, setCurrentSalary] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [description, setDescription] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState();
  const [phone, setPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [completeAddress, setCompleteAddress] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const genderResponse = await axios.get("/enums/gender");
        setGenderOptions(genderResponse.data);
        setGender(genderResponse.data[0]);

        const careerLevelResponse = await axios.get("/enums/career_level");
        setCareerLevelOptions(careerLevelResponse.data);
        setCareerLevel(careerLevelResponse.data[0]);

        const educationLevelResponse = await axios.get(
          "/enums/education_level"
        );
        setEducationLevelOptions(educationLevelResponse.data);
        setEducationLevel(educationLevelResponse.data[0]);

        const countryResponse = await axios.get("/country");
        setCountryOptions(countryResponse.data);
        setCountry(countryResponse.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures it runs only once

  const handleChangeCountry = async (event) => {
    const selectedCountry = event.target.value;
    try {
      setCountry(event.target.value);
      // Fetch states from the API
      const statesResponse = await axios.get(
        "/state/get_states_by_country/" + selectedCountry
      );
      console.log("fetched states data successfully");
      // Update country options
      setStateOptions(statesResponse.data);
      setState(statesResponse.data[0]?.label || "");
      console.log("updated states data");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(Error);
    if (Error) {
      return;
    }

    const data = {
      description: description,
      job_title: jobTitle,
      image_name: "string", // Replace with actual value if needed
      gender: gender,
      age: parseInt(age),
      current_salary: parseFloat(currentSalary),
      expected_salary: parseFloat(expectedSalary),
      education_level: educationLevel,
      career_level: careerLevel,
      contact_info: {
        complete_address: completeAddress,
        phone: phone,
        country: {
          label: country,
        },
        state: {
          label: state,
        },
        find_on_map: "string", // Replace with actual value if needed
      },
      social_links: {
        facebook: facebook,
        twitter: twitter,
        linkedin: linkedin,
        github: github,
      },
      contact_email: contactEmail,
    };

    console.log(data);

    try {
      const response = await axiosPrivate.put("/candidate", data);
      console.log("Form submitted successfully:", response.data);
      toast.success("profile updated successfully")
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      toast.error("error updating profile")
    }
  };

  return (
    <form action="#" className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Jerome Smith"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Job Title</label>
          <input
            type="text"
            name="name"
            placeholder="Software Engineer"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Age</label>
          <input
            type="number"
            name="name"
            placeholder="18"
            value={age}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              setAge(value);
              if (value >= 18) {
                setAgeError("");
                setError(false);
              } else {
                setAgeError("Age must be greater than 18.");
                setError(true);
              }
            }}
            required
          />
          {ageError && <p style={{ color: "red" }}>{ageError}</p>}
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Contact Email </label>
          <input
            type="email"
            name="name"
            placeholder="example@gmail.com"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Gender</label>
          <select
            defaultValue={genderOptions[0]}
            className="chosen-single form-select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            {genderOptions.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-3 col-md-12">
          <label>Career Level</label>
          <select
            defaultValue={careerLevelOptions[0]}
            className="chosen-single form-select"
            value={careerLevel}
            onChange={(e) => setCareerLevel(e.target.value)}
            required
          >
            {careerLevelOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-3 col-md-12">
          <label>Education Level</label>
          <select
            defaultValue={educationLevelOptions[0]}
            className="chosen-single form-select"
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
            required
          >
            {educationLevelOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Current Salary (TND)</label>
          <input
            type="text"
            name="name"
            placeholder="5000"
            value={currentSalary}
            onChange={(e) => {
              const value = e.target.value;
              setCurrentSalary(value);
              if (!isNaN(value) && value > 0) {
                setCurrentSalaryError("");
                setError(false);
              } else {
                setCurrentSalaryError(
                  "Please enter a valid salary greater than 0."
                );
                setError(true);
              }
            }}
            required
          />
          {currentSalaryError && (
            <span style={{ color: "red" }}>{currentSalaryError}</span>
          )}
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Expected Salary (TND)</label>
          <input
            type="text"
            name="name"
            placeholder="8000"
            value={expectedSalary}
            onChange={(e) => {
              const value = e.target.value;
              setExpectedSalary(value);

              // Check if the entered value is a valid number and greater than 0
              if (isNumeric(value) && value > 0) {
                setExpectedSalaryError(""); // Clear any previous error message
                setError(false);
              } else if (isNumeric(value)) {
                setExpectedSalaryError(
                  "Expected salary must be greater than 0."
                );
                setError(true);
              } else {
                setExpectedSalaryError("Please enter a valid numeric value.");
                setError(true);
              }
            }}
            required
          />
          {expectedSalaryError && (
            <span style={{ color: "red" }}>{expectedSalaryError}</span>
          )}
        </div>

        {/* <!-- About  --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Description</label>
          <textarea
            placeholder="...."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        {/* start social networks */}
        <div className="form-group ">
          <div className="tabs-box">
            <div className="widget-title">
              <h4>Social Network</h4>
            </div>
            {/* End widget-title */}

            <div className="widget-content">
              <div className="row">
                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                  <label>Facebook</label>
                  <input
                    type="url"
                    name="name"
                    placeholder="https://www.facebook.com/RecruitEase"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    required
                  />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                  <label>Twitter</label>
                  <input
                    type="url"
                    name="name"
                    placeholder="https://www.twitter.com/RecruitEase"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    required
                  />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                  <label>Linkedin</label>
                  <input
                    type="url"
                    name="name"
                    placeholder="https://www.linkedin.com/RecruitEase"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    required
                  />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                  <label>Github</label>
                  <input
                    type="url"
                    name="name"
                    placeholder="https://www.github.com/RecruitEase"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ens social links */}

        {/* start contaxct */}
        <div className="row">
          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Country</label>
            <select
              defaultValue={countryOptions[0]}
              onChange={handleChangeCountry}
              onFocus={handleChangeCountry}
              className="chosen-single form-select"
              value={country}
              required
            >
              {countryOptions.map((option) => (
                <option key={option.label} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>State</label>
            <select
              className="chosen-single form-select"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            >
              {stateOptions.map((option) => (
                <option key={option.label} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-12 col-md-12">
            <label>Complete Address</label>
            <input
              type="text"
              name="name"
              placeholder="Campus Universitaire BP 05 -5111 Mahdia, Tunisia."
              value={completeAddress}
              onChange={(e) => setCompleteAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-group col-lg-12 col-md-12">
            <label>Phone</label>
            <input
              type="text"
              name="name"
              placeholder="+"
              value={phone}
              onChange={(e) => {
                const value = e.target.value;
                setPhone(value);
                // Validate the phone number
                if (validatePhoneNumber(value)) {
                  setPhoneError(""); // Clear any previous error message
                  setError(false);
                } else {
                  setPhoneError(
                    "Phone number must start with '+' and have 11 digits."
                  ); // Set error message
                  setError(true);
                }
              }}
              required
            />
            {phoneError && <span style={{ color: "red" }}>{phoneError}</span>}
          </div>
        </div>
        {/* end contact */}

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormInfoBox;
