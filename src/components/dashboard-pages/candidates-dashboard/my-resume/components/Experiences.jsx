import React from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import * as Yup from "yup";

Modal.setAppElement("#root");

const ExperienceModal = ({ isOpen, onRequestClose, onAdd }) => {
  const validationSchema = Yup.object().shape({
    job_title: Yup.string().required("Job Title is required"),
    company_name: Yup.string().required("Company Name is required"),
    job_description: Yup.string().required("Job Description is required"),
    start_year: Yup.number()
      .typeError("Start Year must be a number")
      .required("Start Year is required")
      .min(1900, "Start Year must be later than 1900")
      .max(new Date().getFullYear(), `Start Year cannot be later than ${new Date().getFullYear()}`),
    end_year: Yup.number()
      .typeError("End Year must be a number")
      .required("End Year is required")
      .min(Yup.ref('start_year'), "End Year must be later than Start Year")
      .max(new Date().getFullYear() + 10, `End Year cannot be more than 10 years in the future`),
  });

  const formikModal = useFormik({
    initialValues: {
      job_title: "",
      company_name: "",
      job_description: "",
      start_year: "",
      end_year: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onAdd(values);
      onRequestClose();
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="modal-overlay-resume"
      className="modal-content-resume"
    >
      <div className="modal-header-resume">
        <h2>Add Experience</h2>
        <button className="modal-close-btn-resume" onClick={onRequestClose}>
          &times;
        </button>
      </div>
      <form onSubmit={formikModal.handleSubmit}>
        <div className="modal-body-resume">
          <div>
            <label>Job Title</label>
            <input
              type="text"
              name="job_title"
              onChange={formikModal.handleChange}
              value={formikModal.values.job_title}
              required
            />
            {formikModal.errors.job_title && formikModal.touched.job_title ? (
              <div className="error-resume">{formikModal.errors.job_title}</div>
            ) : null}
          </div>
          <div>
            <label>Company Name</label>
            <input
              type="text"
              name="company_name"
              onChange={formikModal.handleChange}
              value={formikModal.values.company_name}
              required
            />
            {formikModal.errors.company_name && formikModal.touched.company_name ? (
              <div className="error-resume">{formikModal.errors.company_name}</div>
            ) : null}
          </div>
          <div>
            <label>Job Description</label>
            <input
              type="text"
              name="job_description"
              onChange={formikModal.handleChange}
              value={formikModal.values.job_description}
              required
            />
            {formikModal.errors.job_description && formikModal.touched.job_description ? (
              <div className="error-resume">{formikModal.errors.job_description}</div>
            ) : null}
          </div>
          <div>
            <label>Start Year</label>
            <input
              type="text"
              name="start_year"
              onChange={formikModal.handleChange}
              value={formikModal.values.start_year}
              required
            />
            {formikModal.errors.start_year && formikModal.touched.start_year ? (
              <div className="error-resume">{formikModal.errors.start_year}</div>
            ) : null}
          </div>
          <div>
            <label>End Year</label>
            <input
              type="text"
              name="end_year"
              onChange={formikModal.handleChange}
              value={formikModal.values.end_year}
              required
            />
            {formikModal.errors.end_year && formikModal.touched.end_year ? (
              <div className="error-resume">{formikModal.errors.end_year}</div>
            ) : null}
          </div>
        </div>
        <div className="modal-footer-resume">
          <button type="button" className="cancel-btn-resume" onClick={onRequestClose}>
            Cancel
          </button>
          <button type="submit" className="save-btn-resume">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ExperienceModal;
