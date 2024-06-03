import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "@/axios/axios";

const Form = () => {
  const [successNotification, setSuccessNotification] = useState("");
  const [errorNotification, setErrorNotification] = useState("");

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old Password is required"),
    newPassword: Yup.string()
      .required("New Password is required")
      .min(8, "New Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log({
          current_pass: values.oldPassword,
          new_password: values.newPassword,
        });

        const response = await axios.post(
          "/auth/reset_password_account",
          {
            current_pass: values.oldPassword,
            new_password: values.newPassword,
          },
          { withCredentials: true }
        );
        console.log("Response:", response.data);
        setSuccessNotification("Password updated successfully!");
        setErrorNotification(""); // Clear any previous error notification
        resetForm();
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        if (error.response && error.response.status === 404) {
          setErrorNotification("Old password incorrect, or your session expired.");
        } else {
          setErrorNotification("Failed to update password. Please try again.");
        }
      }
    },
  });

  return (
    <form className="default-form" onSubmit={formik.handleSubmit}>
      {successNotification && (
        <div className="notification">
          <p style={{ color: "green" }}>{successNotification}</p>
        </div>
      )}

    

      <div className="row">
        <div className="form-group col-lg-7 col-md-12">
          <label>Old Password</label>
          <input
            type="password"
            name="oldPassword"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.oldPassword && formik.errors.oldPassword ? (
            <p style={{ color: "red" }}>{formik.errors.oldPassword}</p>
          ) : null}
        </div>

        <div className="form-group col-lg-7 col-md-12">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <p style={{ color: "red" }}>{formik.errors.newPassword}</p>
          ) : null}
        </div>

        <div className="form-group col-lg-7 col-md-12">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <p style={{ color: "red" }}>{formik.errors.confirmPassword}</p>
          ) : null}
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            Update
          </button>
        </div>

        {errorNotification && (
        <div className="notification">
          <p style={{ color: "red" }}>{errorNotification}</p>
        </div>
      )}
      </div>
    </form>
  );
};

export default Form;
