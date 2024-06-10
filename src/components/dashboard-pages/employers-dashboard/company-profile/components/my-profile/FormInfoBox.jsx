import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "@/axios/axios";
import { axiosPrivate } from "@/axios/axios";

const MergedComponent = () => {
    const [logoImg, setLogoImg] = useState(null);
    const [coverImg, setCoverImg] = useState(null);
    const [countryOptions, setCountryOptions] = useState([]);
    const [stateOptions, setStateOptions] = useState([]);
   
    const [notification, setNotification] = useState(null);

    const validationSchema = Yup.object().shape({
        companyName: Yup.string().required("Company name is required"),
        contactEmail: Yup.string().email("Invalid email").required("Email is required"),
        foundationYear: Yup.number().typeError("Enter a valid year")
            .min(1900, "Year must be between 1900 and 2024")
            .max(2024, "Year must be between 1900 and 2024")
            .required("Foundation Year is required"),
        teamSize: Yup.number().typeError("Enter a valid number")
            .positive("Team Size must be positive")
            .required("Team Size is required"),
        aboutCompany: Yup.string().required("About Company is required"),
        facebook: Yup.string().url("Invalid URL").required("Facebook URL is required"),
        twitter: Yup.string().url("Invalid URL").required("Twitter URL is required"),
        linkedin: Yup.string().url("Invalid URL").required("LinkedIn URL is required"),
        github: Yup.string().url("Invalid URL").required("GitHub URL is required"),
        completeAddress: Yup.string().required("Complete Address is required"),
        phone: Yup.string().matches(/^\+\d{11}$/, "Phone number must start with + and have 11 digits")
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
            const formData = new FormData();

            formData.append("logo", logoImg);
            formData.append("cover", coverImg);

            Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
            });

            try {
                const response = await axiosPrivate.put("/company", formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                console.log("Company data updated successfully:", response.data);
                setNotification({
                    type: "success",
                    message: "Company data updated successfully",
                });
            } catch (error) {
                console.error("Error updating company data:", error);
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
        async function initData() {
            try {
                const profileResponse = await axiosPrivate.get("/company/current");
                if (profileResponse.data) {
                    const {
                        establishment_year,
                        team_size,
                        description,
                        company_name,
                        contact_email,
                        contact_info,
                        social_links,
                    } = profileResponse.data;

                    formik.setValues({
                        companyName: company_name || "",
                        contactEmail: contact_email || "",
                        foundationYear: establishment_year || "",
                        teamSize: (team_size || 0).toString(),
                        aboutCompany: description || "",
                        facebook: social_links?.facebook || "",
                        twitter: social_links?.twitter || "",
                        linkedin: social_links?.linkedin || "",
                        github: social_links?.github || "",
                        completeAddress: contact_info?.complete_address || "",
                        phone: contact_info?.phone || "",
                        country: contact_info?.country?.label || "",
                        state: contact_info?.state?.label || "",
                    });
                }
            } catch (error) {
                console.error("Error fetching company data:", error);
            }
        }

        initData();
    }, []);

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
    }, []);

    const fetchStates = async (country) => {
        try {
            const statesResponse = await axios.get(`/state/get_states_by_country/${country}`);
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
        <form className="default-form" onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <div className="widget-content">
                <div className="uploading-outer">
                    <div className="uploadButton">
                        <input
                            className="uploadButton-input"
                            type="file"
                            name="logo"
                            accept="image/*"
                            id="upload_logo"
                            onChange={(e) => setLogoImg(e.target.files[0])}
                        />
                        <label className="uploadButton-button ripple-effect" htmlFor="upload_logo">
                            {logoImg ? logoImg.name : "Browse Logo"}
                        </label>
                        <span className="uploadButton-file-name"></span>
                    </div>
                </div>
                <div className="uploading-outer">
                    <div className="uploadButton">
                        <input
                            className="uploadButton-input"
                            type="file"
                            name="cover"
                            accept="image/*"
                            id="upload_cover"
                            onChange={(e) => setCoverImg(e.target.files[0])}
                        />
                        <label className="uploadButton-button ripple-effect" htmlFor="upload_cover">
                            {coverImg ? coverImg.name : "Browse Cover"}
                        </label>
                        <span className="uploadButton-file-name"></span>
                    </div>
                    <div className="text">
                        Max file size is 1MB, Minimum dimension: 330x300. Suitable files are .jpg & .png
                    </div>
                </div>
                <div className="row">
                    {/* Company name */}
                    <div className="form-group col-lg-6 col-md-12">
                        <label>Company name</label>
                        <input
                            type="text"
                            name="companyName"
                            value={formik.values.companyName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                        />
                        {formik.touched.companyName && formik.errors.companyName ? (
                            <div style={{ color: "red", marginTop: "5px" }}>
                                {formik.errors.companyName}
                            </div>
                        ) : null}
                    </div>

                    {/* Contact Email */}
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

                    {/* Foundation Year */}
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

                    {/* Team Size */}
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

                    {/* About Company */}
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

                    {/* Facebook */}
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

                    {/* Twitter */}
                    <div className="form-group col-lg-6 col-md-12">
                        <label>Twitter</label>
                        <input
                            type="text"
                            name="twitter"
                            value={formik.values.twitter}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                        />
                        {formik.touched.twitter && formik.errors.twitter ? (
                            <div style={{ color: "red", marginTop: "5px" }}>
                                {formik.errors.twitter}
                            </div>
                        ) : null}
                    </div>

                    {/* LinkedIn */}
                    <div className="form-group col-lg-6 col-md-12">
                        <label>LinkedIn</label>
                        <input
                            type="text"
                            name="linkedin"
                            value={formik.values.linkedin}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                        />
                        {formik.touched.linkedin && formik.errors.linkedin ? (
                            <div style={{ color: "red", marginTop: "5px" }}>
                                {formik.errors.linkedin}
                            </div>
                        ) : null}
                    </div>

                    {/* GitHub */}
                    <div className="form-group col-lg-6 col-md-12">
                        <label>GitHub</label>
                        <input
                            type="text"
                            name="github"
                            value={formik.values.github}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                        />
                        {formik.touched.github && formik.errors.github ? (
                            <div style={{ color: "red", marginTop: "5px" }}>
                                {formik.errors.github}
                            </div>
                        ) : null}
                    </div>

                    {/* Complete Address */}
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

                    {/* Phone */}
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

                    {/* Country */}
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

                    {/* State */}
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
                                backgroundColor: notification.type === "success" ? "green" : "red",
                                color: "white",
                                padding: "10px",
                                marginBottom: "10px",
                                borderRadius: "5px",
                            }}
                        >
                            {notification.message}
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="form-group col-lg-6 col-md-12">
                        <button type="submit" className="theme-btn btn-style-one">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default MergedComponent;
