import { useState, useEffect } from "react";
import { axiosPrivate } from "@/axios/axios";
import axios from "@/axios/axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const FormComponent = () => {
  // Init data
  const [genderOptions, setGenderOptions] = useState([]);
  const [careerLevelOptions, setCareerLevelOptions] = useState([]);
  const [educationLevelOptions, setEducationLevelOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [imageError, setImageError] = useState("");

  // Init data
  const [logImg, setLogoImg] = useState(null);
  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    setLogoImg( file);
    if (file) {
      setImageError("");
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const genderResponse = await axios.get("/enums/gender");
        setGenderOptions(genderResponse.data);

        const careerLevelResponse = await axios.get("/enums/career_level");
        setCareerLevelOptions(careerLevelResponse.data);

        const educationLevelResponse = await axios.get(
          "/enums/education_level"
        );
        setEducationLevelOptions(educationLevelResponse.data);

        const countryResponse = await axios.get("/country");
        setCountryOptions(countryResponse.data);

        // Fetch candidate data
        const candidateResponse = await axiosPrivate.get("/candidate/current");
        const candidate = candidateResponse.data;

        formik.setValues({
          fullName: candidate.fullname || "",
          jobTitle: candidate.job_title || "",
          age: candidate.age || "",
          gender: candidate.gender || "",
          careerLevel: candidate.career_level || "",
          educationLevel: candidate.education_level || "",
          currentSalary: candidate.current_salary || "",
          expectedSalary: candidate.expected_salary || "",
          description: candidate.description || "",
          facebook: candidate?.social_links?.facebook || "",
          twitter: candidate?.social_links?.twitter || "",
          linkedin: candidate?.social_links?.linkedin || "",
          github: candidate?.social_links?.github || "",
          country: candidate?.contact_info?.country?.label || "",
          state: candidate?.contact_info?.state?.label || "",
          phone: candidate?.contact_info?.phone || "",
          contactEmail: candidate?.contact_email || "",
          completeAddress: candidate?.contact_info?.complete_address || "",
        });

        setLogoImg(candidate.img || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures it runs only once

  const handleChangeCountry = async (event) => {
    const selectedCountry = event.target.value;
    try {
      formik.setFieldValue("country", selectedCountry);
      // Fetch states from the API
      const statesResponse = await axios.get(
        "/state/get_states_by_country/" + selectedCountry
      );
      setStateOptions(statesResponse.data);

      // Set the first state as the default if there are states available
      if (statesResponse.data.length > 0) {
        formik.setFieldValue("state", statesResponse.data[0].label);
      } else {
        formik.setFieldValue("state", "");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      jobTitle: "",
      age: "",
      gender: "",
      careerLevel: "",
      educationLevel: "",
      currentSalary: "",
      expectedSalary: "",
      description: "",
      facebook: "",
      twitter: "",
      linkedin: "",
      github: "",
      country: "",
      state: "",
      phone: "",
      contactEmail: "",
      completeAddress: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      jobTitle: Yup.string().required("Job title is required"),
      age: Yup.number()
        .min(18, "Age must be at least 18")
        .required("Age is required"),
      gender: Yup.string().required("Gender is required"),
      careerLevel: Yup.string().required("Career level is required"),
      educationLevel: Yup.string().required("Education level is required"),
      currentSalary: Yup.number()
        .min(0, "Current salary must be a positive number")
        .required("Current salary is required"),
      expectedSalary: Yup.number()
        .min(0, "Expected salary must be a positive number")
        .required("Expected salary is required"),
      description: Yup.string().required("Description is required"),
      facebook: Yup.string().url("Invalid URL"),
      twitter: Yup.string().url("Invalid URL"),
      linkedin: Yup.string().url("Invalid URL"),
      github: Yup.string().url("Invalid URL"),
      country: Yup.string().required("Country is required"),
      state: Yup.string().required("State is required"),
      phone: Yup.string().required("Phone number is required"),
      contactEmail: Yup.string()
        .email("Invalid email address")
        .required("Contact email is required"),
      completeAddress: Yup.string().required("Complete address is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("description", values.description);
      formData.append("job_title", values.jobTitle);
      formData.append("img", logImg);
      formData.append("gender", values.gender);
      formData.append("age", parseInt(values.age));
      formData.append("current_salary", parseFloat(values.currentSalary));
      formData.append("expected_salary", parseFloat(values.expectedSalary));
      formData.append("education_level", values.educationLevel);
      formData.append("career_level", values.careerLevel);
      formData.append("complete_address", values.completeAddress);
      formData.append("phone", values.phone);
      formData.append("country_label", values.country);
      formData.append("state_label", values.state);
      formData.append("contact_email", values.contactEmail);
      formData.append("facebook", values.facebook);
      formData.append("twitter", values.twitter);
      formData.append("linkedin", values.linkedin);
      formData.append("github", values.github);
      if (!values.img) {
        setImageError("Please upload an image.");
      } else {
        setImageError("");
        try {
          const response = await axios.put("/candidate", formData, {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          console.log("Form submitted successfully:", response.data);
          toast.success("Profile updated successfully");
        } catch (error) {
          console.error("There was an error submitting the form:", error);
          console.log(formData);
          toast.error("Error updating profile");
        }
      }
    },
  });

  const logImgHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoImg(file);
      setImageError("");
      formik.setFieldValue("img", file)
    } else {
      setImageError("Please upload an image.");
    }
  };
  

  return (
    <div className="widget-content">
      <div className="uploading-outer">
        <div className="uploadButton">
          <input
            className="uploadButton-input"
            type="file"
            name="attachments[]"
            accept="image/*"
            id="upload"
            required
            onChange={logImgHandler}
          />
          <label className="uploadButton-button ripple-effect" htmlFor="upload">
            {logImg ? logImg.name : "Browse image"}
          </label>
          <span className="uploadButton-file-name"></span>
        </div>
      </div>

      <form action="#" className="default-form" onSubmit={formik.handleSubmit}>
        <div className="row">
          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Jerome Smith"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.fullName && formik.errors.fullName ? (
              <p style={{ color: "red" }}>{formik.errors.fullName}</p>
            ) : null}
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Job Title</label>
            <input
              type="text"
              name="jobTitle"
              placeholder="Software Engineer"
              value={formik.values.jobTitle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.jobTitle && formik.errors.jobTitle ? (
              <p style={{ color: "red" }}>{formik.errors.jobTitle}</p>
            ) : null}
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Age</label>
            <input
              type="number"
              name="age"
              placeholder="28"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.age && formik.errors.age ? (
              <p style={{ color: "red" }}>{formik.errors.age}</p>
            ) : null}
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Gender</label>
            <select
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            >
              <option value="" label="Select gender" />
              {genderOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {formik.touched.gender && formik.errors.gender ? (
              <p style={{ color: "red" }}>{formik.errors.gender}</p>
            ) : null}
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Career Level</label>
            <select
              name="careerLevel"
              value={formik.values.careerLevel}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            >
              <option value="" label="Select career level" />
              {careerLevelOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {formik.touched.careerLevel && formik.errors.careerLevel ? (
              <p style={{ color: "red" }}>{formik.errors.careerLevel}</p>
            ) : null}
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Education Level</label>
            <select
              name="educationLevel"
              value={formik.values.educationLevel}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            >
              <option value="" label="Select education level" />
              {educationLevelOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {formik.touched.educationLevel && formik.errors.educationLevel ? (
              <p style={{ color: "red" }}>{formik.errors.educationLevel}</p>
            ) : null}
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Current Salary</label>
            <input
              type="number"
              name="currentSalary"
              placeholder="10000"
              value={formik.values.currentSalary}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.currentSalary && formik.errors.currentSalary ? (
              <p style={{ color: "red" }}>{formik.errors.currentSalary}</p>
            ) : null}
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Expected Salary</label>
            <input
              type="number"
              name="expectedSalary"
              placeholder="15000"
              value={formik.values.expectedSalary}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.expectedSalary && formik.errors.expectedSalary ? (
              <p style={{ color: "red" }}>{formik.errors.expectedSalary}</p>
            ) : null}
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-12 col-md-12">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Describe yourself"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.description && formik.errors.description ? (
              <p style={{ color: "red" }}>{formik.errors.description}</p>
            ) : null}
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Facebook</label>
            <input
              type="url"
              name="facebook"
              placeholder="https://facebook.com/username"
              value={formik.values.facebook}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.facebook && formik.errors.facebook ? (
              <p style={{ color: "red" }}>{formik.errors.facebook}</p>
            ) : null}
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Twitter</label>
            <input
              type="url"
              name="twitter"
              placeholder="https://twitter.com/username"
              value={formik.values.twitter}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.twitter && formik.errors.twitter ? (
              <p style={{ color: "red" }}>{formik.errors.twitter}</p>
            ) : null}
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>LinkedIn</label>
            <input
              type="url"
              name="linkedin"
              placeholder="https://linkedin.com/in/username"
              value={formik.values.linkedin}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.linkedin && formik.errors.linkedin ? (
              <p style={{ color: "red" }}>{formik.errors.linkedin}</p>
            ) : null}
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>GitHub</label>
            <input
              type="url"
              name="github"
              placeholder="https://github.com/username"
              value={formik.values.github}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.github && formik.errors.github ? (
              <p style={{ color: "red" }}>{formik.errors.github}</p>
            ) : null}
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Country</label>
            <select
              name="country"
              value={formik.values.country}
              onChange={handleChangeCountry}
              onBlur={formik.handleBlur}
              required
            >
              <option value="" label="Select country" />
              {countryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {formik.touched.country && formik.errors.country ? (
              <p style={{ color: "red" }}>{formik.errors.country}</p>
            ) : null}
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>State</label>
            <select
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            >
              <option value="" label="Select state" />
              {stateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {formik.touched.state && formik.errors.state ? (
              <p style={{ color: "red" }}>{formik.errors.state}</p>
            ) : null}
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="+21611111111"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.phone && formik.errors.phone ? (
              <p style={{ color: "red" }}>{formik.errors.phone}</p>
            ) : null}
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              placeholder="example@example.com"
              value={formik.values.contactEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.contactEmail && formik.errors.contactEmail ? (
              <p style={{ color: "red" }}>{formik.errors.contactEmail}</p>
            ) : null}
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-12 col-md-12">
            <label>Complete Address</label>
            <input
              type="text"
              name="completeAddress"
              placeholder="123 Main St, City, Country"
              value={formik.values.completeAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.completeAddress && formik.errors.completeAddress ? (
              <p style={{ color: "red" }}>{formik.errors.completeAddress}</p>
            ) : null}
          </div>
        </div>
        <button type="submit" className="theme-btn btn-style-one">
          Update Profile
        </button>
        {imageError && <p style={{ color: "red" }}>{imageError}</p>}
      </form>
    </div>
  );
};

export default FormComponent;
