import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "@/axios/axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

const FormInfoBox = () => {
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const { axiosPrivate } = useAxiosPrivate();
  // submission
  const [notification, setNotification] = useState(null);

  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required("Company name is required"),
    contactEmail: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    foundationYear: Yup.number()
      .typeError("Enter a valid year")
      .min(1900, "Year must be between 1900 and 2024")
      .max(2024, "Year must be between 1900 and 2024")
      .required("Foundation Year is required"),
    teamSize: Yup.number()
      .typeError("Enter a valid number")
      .positive("Team Size must be positive")
      .required("Team Size is required"),
    aboutCompany: Yup.string().required("About Company is required"),
    facebook: Yup.string()
      .url("Invalid URL")
      .required("Facebook URL is required"),
    twitter: Yup.string()
      .url("Invalid URL")
      .required("Twitter URL is required"),
    linkedin: Yup.string()
      .url("Invalid URL")
      .required("LinkedIn URL is required"),
    github: Yup.string().url("Invalid URL").required("GitHub URL is required"),
    completeAddress: Yup.string().required("Complete Address is required"),
    phone: Yup.string()
      .matches(
        /^\+\d{11}$/,
        "Phone number must start with + and have 11 digits"
      )
      .required("Phone is required"),
    country: Yup.string(),
    state: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      companyName: "",
      contactEmail: "",
      foundationYear: "",
      teamSize: "",
      aboutCompany: "",
      facebook: "",
      twitter: "",
      linkedin: "",
      github: "",
      completeAddress: "",
      phone: "",
      country: "",
      state: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Format the form values
        const formattedValues = {
          establishment_year: values.foundationYear,
          team_size: parseInt(values.teamSize),
          description: values.aboutCompany,
          image: "", // Set as needed
          company_name: values.companyName,
          contact_email: values.contactEmail,
          contact_info: {
            complete_address: values.completeAddress,
            phone: values.phone,
            country: { label: values.country }, // Set as needed
            state: { label: values.state }, // Set as needed
            find_on_map: null, // Set as needed
          },
          social_links: {
            facebook: values.facebook,
            twitter: values.twitter,
            linkedin: values.linkedin,
            github: values.github,
          },
        };

        // Send the formatted values to the backend
        const response = await axiosPrivate.put("/company", formattedValues);
        console.log("Company data updated successfully:", response.data);
        // Handle success: redirect, show success message, etc.
        setNotification({
          type: "success",
          message: "Company data updated successfully",
        });
      } catch (error) {
        console.error("Error updating company data:", error);
        // Handle error: show error message, etc.
        setNotification({
          type: "error",
          message: "Error updating company data. Please try again.",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const countryResponse = await axios.get("/country");
        setCountryOptions(countryResponse.data);
        if (countryResponse.data.length > 0) {
          formik.setFieldValue("country", countryResponse.data[0].value);
          fetchStates(countryResponse.data[0].value);
        }
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures it runs only once

  const fetchStates = async (country) => {
    try {
      const statesResponse = await axios.get(
        `/state/get_states_by_country/${country}`
      );
      setStateOptions(statesResponse.data);
      if (statesResponse.data.length > 0) {
        formik.setFieldValue("state", statesResponse.data[0].label);
      }
    } catch (error) {
      console.error("Error fetching state data:", error);
    }
  };

  const handleChangeCountry = (event) => {
    const selectedCountry = event.target.value;
    formik.setFieldValue("country", selectedCountry);
    fetchStates(selectedCountry);
  };

  return (
    <form className="default-form" onSubmit={formik.handleSubmit}>
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Company name</label>
          <input
            type="text"
            name="companyName"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder=""
            required
          />
          {formik.touched.companyName && formik.errors.companyName ? (
            <div style={{ color: "red", marginTop: "5px" }}>
              {formik.errors.companyName}
            </div>
          ) : null}
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={formik.values.contactEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="@gmail.com"
            required
          />
          {formik.touched.contactEmail && formik.errors.contactEmail ? (
            <div style={{ color: "red", marginTop: "5px" }}>
              {formik.errors.contactEmail}
            </div>
          ) : null}
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Foundation Year</label>
          <input
            type="text"
            name="foundationYear"
            value={formik.values.foundationYear}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="2024"
            required
          />
          {formik.touched.foundationYear && formik.errors.foundationYear ? (
            <div style={{ color: "red", marginTop: "5px" }}>
              {formik.errors.foundationYear}
            </div>
          ) : null}
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Team Size</label>
          <input
            type="number"
            name="teamSize"
            value={formik.values.teamSize}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="10"
            required
          />
          {formik.touched.teamSize && formik.errors.teamSize ? (
            <div style={{ color: "red", marginTop: "5px" }}>
              {formik.errors.teamSize}
            </div>
          ) : null}
        </div>

        {/* <!-- About Company --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>About Company</label>
          <textarea
            name="aboutCompany"
            value={formik.values.aboutCompany}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="...."
            required
          />
          {formik.touched.aboutCompany && formik.errors.aboutCompany ? (
            <div style={{ color: "red", marginTop: "5px" }}>
              {formik.errors.aboutCompany}
            </div>
          ) : null}
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Facebook</label>
          <input
            type="text"
            name="facebook"
            value={formik.values.facebook}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="www.facebook.com"
            required
          />
          {formik.touched.facebook && formik.errors.facebook ? (
            <div style={{ color: "red", marginTop: "5px" }}>
              {formik.errors.facebook}
            </div>
          ) : null}
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Twitter</label>
          <input
            type="text"
            name="twitter"
            value={formik.values.twitter}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder=""
            required
          />
          {formik.touched.twitter && formik.errors.twitter ? (
            <div style={{ color: "red", marginTop: "5px" }}>
              {formik.errors.twitter}
            </div>
          ) : null}
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Linkedin</label>
          <input
            type="text"
            name="linkedin"
            value={formik.values.linkedin}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder=""
            required
          />
          {formik.touched.linkedin && formik.errors.linkedin ? (
            <div style={{ color: "red", marginTop: "5px" }}>
              {formik.errors.linkedin}
            </div>
          ) : null}
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Github</label>
          <input
            type="text"
            name="github"
            value={formik.values.github}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder=""
            required
          />
          {formik.touched.github && formik.errors.github ? (
            <div style={{ color: "red", marginTop: "5px" }}>
              {formik.errors.github}
            </div>
          ) : null}
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Complete Address</label>
          <input
            type="text"
            name="completeAddress"
            value={formik.values.completeAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Campus Universitaire BP 05 -5111 Mahdia, Tunisia.."
            required
          />
          {formik.touched.completeAddress && formik.errors.completeAddress ? (
            <div style={{ color: "red", marginTop: "5px" }}>
              {formik.errors.completeAddress}
            </div>
          ) : null}
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="+12345678901"
            required
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div style={{ color: "red", marginTop: "5px" }}>
              {formik.errors.phone}
            </div>
          ) : null}
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <select
            name="country"
            value={formik.values.country}
            onChange={(event) => {
              formik.handleChange(event);
              handleChangeCountry(event);
            }}
            onBlur={formik.handleBlur}
            onFocus={handleChangeCountry}
            required
          >
            {countryOptions.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
          {formik.touched.country && formik.errors.country ? (
            <div style={{ color: "red", marginTop: "5px" }}>
              {formik.errors.country}
            </div>
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
            {stateOptions.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
          {formik.touched.state && formik.errors.state ? (
            <div style={{ color: "red", marginTop: "5px" }}>
              {formik.errors.state}
            </div>
          ) : null}
        </div>

        {/* Notification box */}
        {notification && (
          <div
            style={{
              backgroundColor:
                notification.type === "success" ? "green" : "red",
              color: "white",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            {notification.message}
          </div>
        )}

        {/* <!-- Submit Button --> */}
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
