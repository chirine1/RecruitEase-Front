import React from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import * as Yup from "yup";

Modal.setAppElement("#root");

const EducationModal = ({ isOpen, onRequestClose, onAdd }) => {
  const validationSchema = Yup.object().shape({
    degree: Yup.string().required("Degree is required"),
    field_of_study: Yup.string().required("Field of Study is required"),
    institution: Yup.string().required("Institution is required"),
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
      degree: "",
      field_of_study: "",
      institution: "",
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
        <h2>Add Education</h2>
        <button className="modal-close-btn-resume" onClick={onRequestClose}>
          &times;
        </button>
      </div>
      <form onSubmit={formikModal.handleSubmit}>
        <div className="modal-body-resume">
          <div>
            <label>Degree</label>
            <input
              type="text"
              name="degree"
              onChange={formikModal.handleChange}
              value={formikModal.values.degree}
              required
            />
            {formikModal.errors.degree && formikModal.touched.degree ? (
              <div className="error-resume">{formikModal.errors.degree}</div>
            ) : null}
          </div>
          <div>
            <label>Field of Study</label>
            <input
              type="text"
              name="field_of_study"
              onChange={formikModal.handleChange}
              value={formikModal.values.field_of_study}
              required
            />
            {formikModal.errors.field_of_study && formikModal.touched.field_of_study ? (
              <div className="error-resume">{formikModal.errors.field_of_study}</div>
            ) : null}
          </div>
          <div>
            <label>Institution</label>
            <input
              type="text"
              name="institution"
              onChange={formikModal.handleChange}
              value={formikModal.values.institution}
              required
            />
            {formikModal.errors.institution && formikModal.touched.institution ? (
              <div className="error-resume">{formikModal.errors.institution}</div>
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

export default EducationModal;
