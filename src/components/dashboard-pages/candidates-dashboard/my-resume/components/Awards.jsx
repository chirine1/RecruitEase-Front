import React from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import * as Yup from "yup";

Modal.setAppElement("#root");

const AwardsModal = ({ isOpen, onRequestClose, onAdd }) => {
  const validationSchema = Yup.object().shape({
    label: Yup.string().required("Label is required"),
    awarded_by: Yup.string().required("Awarded By is required"),
    award_year: Yup.number()
      .typeError("Award Year must be a number")
      .required("Award Year is required")
      .min(1900, "Award Year must be later than 1900")
      .max(new Date().getFullYear(), `Award Year cannot be later than ${new Date().getFullYear()}`),
  });

  const formikModal = useFormik({
    initialValues: {
      label: "",
      awarded_by: "",
      award_year: "",
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
        <h2>Add Award</h2>
        <button className="modal-close-btn-resume" onClick={onRequestClose}>
          &times;
        </button>
      </div>
      <form onSubmit={formikModal.handleSubmit}>
        <div className="modal-body-resume">
          <div>
            <label>Label</label>
            <input
              type="text"
              name="label"
              onChange={formikModal.handleChange}
              value={formikModal.values.label}
              required
            />
            {formikModal.errors.label && formikModal.touched.label ? (
              <div className="error-resume">{formikModal.errors.label}</div>
            ) : null}
          </div>
          <div>
            <label>Awarded By</label>
            <input
              type="text"
              name="awarded_by"
              onChange={formikModal.handleChange}
              value={formikModal.values.awarded_by}
              required
            />
            {formikModal.errors.awarded_by && formikModal.touched.awarded_by ? (
              <div className="error-resume">{formikModal.errors.awarded_by}</div>
            ) : null}
          </div>
          <div>
            <label>Award Year</label>
            <input
              type="text"
              name="award_year"
              onChange={formikModal.handleChange}
              value={formikModal.values.award_year}
              required
            />
            {formikModal.errors.award_year && formikModal.touched.award_year ? (
              <div className="error-resume">{formikModal.errors.award_year}</div>
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

export default AwardsModal;
