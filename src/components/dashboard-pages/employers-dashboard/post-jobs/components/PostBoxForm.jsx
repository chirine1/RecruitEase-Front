import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import axios from "@/axios/axios";
import "@/styles/postjob.scss"; // Import CSS for styling
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostBoxForm = () => {
  const [skillsOptions, setSkillsOptions] = useState([]);
  const [jobTypesOptions, setJobTypesOptions] = useState([]);
  const [careerLevelsOptions, setCareerLevelsOptions] = useState([]);
  const [industriesOptions, setIndustriesOptions] = useState([]);

  useEffect(() => {
    // Fetching data from backend
    const fetchData = async () => {
      try {
        const skillsResponse = await axios.get("/skill");
        const jobTypesResponse = await axios.get("/enums/job_type");
        const careerLevelsResponse = await axios.get("/enums/career_level");
        const industriesResponse = await axios.get("/industry");

        setSkillsOptions(
          skillsResponse.data.map((skill) => ({
            value: skill.label,
            label: skill.label,
          }))
        );

        setJobTypesOptions(
          jobTypesResponse.data.map((type, index) => ({
            value: type,
            label: type,
            key: index,
          }))
        );

        setCareerLevelsOptions(
          careerLevelsResponse.data.map((level, index) => ({
            value: level,
            label: level,
            key: index,
          }))
        );

        setIndustriesOptions(
          industriesResponse.data.map((industry, index) => ({
            value: industry.label,
            label: industry.label,
            key: index,
          }))
        );

        // Initialize Formik values with the first elements of arrays if available
        formik.setValues({
          jobTitle: "",
          jobDescription: "",
          skills: [],
          jobType: "",
          careerLevel: "",
          industry: "",
          minSalary: "",
          maxSalary: "",
          deadline: "",
          questions: Array(10).fill(""), // Initialize questions
          answers: Array(10).fill(""), // Initialize answers
        });
      } catch (error) {
        console.error("Failed to fetch data from backend", error);
      }
    };

    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      jobDescription: "",
      skills: [],
      jobType: "",
      careerLevel: "",
      industry: "",
      minSalary: "",
      maxSalary: "",
      deadline: "",
      questions: Array(10).fill(""),
      answers: Array(10).fill(""),
    },
    validationSchema: Yup.object().shape({
      jobTitle: Yup.string().required("Job Title is required"),
      jobDescription: Yup.string().required("Job Description is required"),
      skills: Yup.array().min(1, "At least one skill is required"),
      jobType: Yup.string().required("Job Type is required"),
      careerLevel: Yup.string().required("Career Level is required"),
      industry: Yup.string().required("Industry is required"),
      minSalary: Yup.number()
        .required("Minimum Salary is required")
        .min(0, "Minimum Salary must be at least 0"),
      maxSalary: Yup.number()
        .required("Maximum Salary is required")
        .min(
          Yup.ref("minSalary"),
          "Maximum Salary must be greater than or equal to Minimum Salary"
        ),
      deadline: Yup.date()
        .required("Application Deadline Date is required")
        .min(new Date(), "Deadline must be in the future"),
      questions: Yup.array().of(Yup.string().required("Question is required")),
      answers: Yup.array().of(Yup.string().required("Answer is required")),
    }),
    onSubmit: (values) => {
      const formData = {
        title: values.jobTitle,
        description: values.jobDescription,
        job_type: values.jobType,
        career_level: values.careerLevel,
        offered_salary_min: parseFloat(values.minSalary),
        offered_salary_max: parseFloat(values.maxSalary),
        deadline: values.deadline,
        industry: {
          label: values.industry,
        },
        skills: values.skills.map((skill) => ({ label: skill })),
        questions: values.questions,
        answers: values.answers,
      };

      // Submit form data to backend
      axios
        .post("/job", formData, { withCredentials: true })
        .then((response) => {
          console.log("Job posted successfully", response.data);
          toast.success("Job posted successfully");
        })

        .catch((error) => {
          console.error("Failed to post job", error);
          if (error.response && error.response.status === 404) {
            // Display notification for skills or industries not found
            toast.error(
              "Skills or industries not found, check backend server status"
            );
          } else {
            // Display generic error notification
            toast.error("Failed to post job");
          }
        });
    },
  });

  return (
    <form className="default-form" onSubmit={formik.handleSubmit}>
      <div className="row">
        {/* Job Title */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Job Title</label>
          <input
            type="text"
            name="jobTitle"
            placeholder="Title"
            value={formik.values.jobTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.jobTitle && formik.errors.jobTitle ? (
            <div className="error">{formik.errors.jobTitle}</div>
          ) : null}
        </div>

        {/* Job Description */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Job Description</label>
          <textarea
            name="jobDescription"
            placeholder="...."
            value={formik.values.jobDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.jobDescription && formik.errors.jobDescription ? (
            <div className="error">{formik.errors.jobDescription}</div>
          ) : null}
        </div>

        {/* Skills */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Skills</label>
          <Select
            defaultValue={formik.values.skills.map((skill) =>
              skillsOptions.find((option) => option.value === skill)
            )}
            isMulti
            value={formik.values.skills.map((skill) =>
              skillsOptions.find((option) => option.value === skill)
            )}
            name="skills"
            options={skillsOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selectedOptions) =>
              formik.setFieldValue(
                "skills",
                selectedOptions.map((option) => option.value)
              )
            }
            onBlur={formik.handleBlur}
          />
          {formik.touched.skills && formik.errors.skills ? (
            <div className="error">{formik.errors.skills}</div>
          ) : null}
        </div>

        {/* Job Type */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Job Type</label>
          <select
            name="jobType"
            className="chosen-single form-select"
            value={formik.values.jobType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select</option>
            {jobTypesOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {formik.touched.jobType && formik.errors.jobType ? (
            <div className="error">{formik.errors.jobType}</div>
          ) : null}
        </div>

        {/* Minimum Offered Salary */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Minimum Offered Salary</label>
          <input
            type="number"
            name="minSalary"
            placeholder="$"
            value={formik.values.minSalary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.minSalary && formik.errors.minSalary ? (
            <div className="error">{formik.errors.minSalary}</div>
          ) : null}
        </div>

        {/* Maximum Offered Salary */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Maximum Offered Salary</label>
          <input
            type="number"
            name="maxSalary"
            placeholder="$"
            value={formik.values.maxSalary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.maxSalary && formik.errors.maxSalary ? (
            <div className="error">{formik.errors.maxSalary}</div>
          ) : null}
        </div>

        {/* Career Level */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Career Level</label>
          <select
            name="careerLevel"
            className="chosen-single form-select"
            value={formik.values.careerLevel}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select</option>
            {careerLevelsOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {formik.touched.careerLevel && formik.errors.careerLevel ? (
            <div className="error">{formik.errors.careerLevel}</div>
          ) : null}
        </div>

        {/* Industry */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Industry</label>
          <select
            name="industry"
            className="chosen-single form-select"
            value={formik.values.industry}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select</option>
            {industriesOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {formik.touched.industry && formik.errors.industry ? (
            <div className="error">{formik.errors.industry}</div>
          ) : null}
        </div>

        {/* Application Deadline Date */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Application Deadline Date</label>
          <input
            type="date"
            name="deadline"
            placeholder="Select Date"
            value={formik.values.deadline}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.deadline && formik.errors.deadline ? (
            <div className="error">{formik.errors.deadline}</div>
          ) : null}
        </div>

        {/* Questions and Answers */}
        {formik.values.questions.map((question, index) => (
          <div className="form-group col-lg-12 col-md-12" key={index}>
            <label>Question {index + 1}</label>
            <input
              type="text"
              name={`questions.${index}`}
              placeholder={`Question ${index + 1}`}
              value={formik.values.questions[index]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.questions && formik.errors.questions ? (
              <div className="error">{formik.errors.questions[index]}</div>
            ) : null}
            <div className="radio-group">
              <label style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  name={`answers.${index}`}
                  value="Yes"
                  checked={formik.values.answers[index] === "Yes"}
                  onChange={() =>
                    formik.setFieldValue(`answers.${index}`, "Yes")
                  }
                  onBlur={formik.handleBlur}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name={`answers.${index}`}
                  value="No"
                  checked={formik.values.answers[index] === "No"}
                  onChange={() =>
                    formik.setFieldValue(`answers.${index}`, "No")
                  }
                  onBlur={formik.handleBlur}
                />
                No
              </label>
            </div>
            {formik.touched.answers && formik.errors.answers ? (
              <div className="error">{formik.errors.answers[index]}</div>
            ) : null}
          </div>
        ))}

        {/* Submit Button */}
        <div className="form-group col-lg-12 col-md-12 text-right">
          <button type="submit" className="theme-btn btn-style-one">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;
