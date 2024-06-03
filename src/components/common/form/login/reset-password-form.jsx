import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "@/axios/axios";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPasswordForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the email passed from the previous step
  const email = location.state?.email || "";

  const [resetError, setResetError] = useState("");
  const [notification, setNotification] = useState("");

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref('password'), null], "Passwords must match"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post("/auth/reset_password", {
          email: email, // Use the email from the location state
          password: values.password,
        });

        if (response.status === 200) {
          setNotification("Password reset successfully!");
          setTimeout(() => {
            navigate("/login");
          }, 2000); // Redirect to login after 2 seconds
        } else {
          setResetError("Failed to reset password. Please try again.");
        }
      } catch (error) {
        setResetError("Failed to reset password. Please try again.");
        console.error("Password reset failed", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="form-inner">
      <h3>Reset Your Password</h3>

      {/* Reset Password Form */}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <p>{email}</p>
        </div>
        {/* email */}

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your new password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.password && formik.errors.password ? (
            <p style={{ color: "red" }} className="error-message">
              {formik.errors.password}
            </p>
          ) : null}
        </div>
        {/* password */}

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your new password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <p style={{ color: "red" }} className="error-message">
              {formik.errors.confirmPassword}
            </p>
          ) : null}
        </div>
        {/* confirm password */}

        <div className="form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Reset Password
          </button>
          {resetError && (
            <p style={{ color: "red" }} className="error-message">
              {resetError}
            </p>
          )}
        </div>
        {/* reset password */}
      </form>
      {/* End form */}

      {notification && (
        <div className="notification">
          <p style={{ color: "green" }}>{notification}</p>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordForm;
