import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "@/axios/axios";
import { useNavigate, useLocation } from "react-router-dom";

const ForgotPasswordForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the email passed from the login page
  const email = location.state?.email || "";

  const [verificationError, setVerificationError] = useState("");
  const [notification, setNotification] = useState("");

  const formik = useFormik({
    initialValues: {
      verificationCode: "",
    },
    validationSchema: Yup.object({
      verificationCode: Yup.string()
        .required("Verification code is required")
        .length(6, "Verification code must be exactly 6 characters"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post("/auth/verify_reset_code", {
          code: values.verificationCode,
          email: email, // Use the email from the location state
        });

        if (response.status === 200) {
          setNotification("Verification successful! Redirecting to reset password page...");
          setVerificationError(""); // Clear any previous errors
          setTimeout(() => {
            navigate("/reset-password", { state: { email: email } }); // Redirect to reset password page after 2 seconds
          }, 2000);
        } else {
          setVerificationError("Invalid verification code. Please try again.");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setVerificationError("Wrong email! Please check your email.");
        } else if (error.response && error.response.status === 410) {
          setVerificationError("Verification code expired. Please resend the code.");
        } else {
          setVerificationError("Invalid verification code. Please try again.");
        }
        console.error("Verification failed", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleResendCode = async () => {
    try {
      const response = await axios.post(
        "/auth/forgot_password_mail",
        { email: email }, // Send email in resend code request
      );
      setNotification("Verification code resent successfully!");
      setVerificationError(""); // Clear any previous errors
    } catch (error) {
      console.error("Failed to resend verification code", error);
      setVerificationError("Failed to resend verification code. Please try again.");
    }
  };

  return (
    <div className="form-inner">
      <h3>Verify Your Email for Password Reset</h3>

      {/* Verify Email Form */}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <p>{email}</p>
        </div>
        {/* email */}

        <div className="form-group">
          <label>Verification Code</label>
          <input
            type="text"
            name="verificationCode"
            placeholder="Enter your verification code"
            value={formik.values.verificationCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.verificationCode && formik.errors.verificationCode ? (
            <p style={{ color: "red" }} className="error-message">
              {formik.errors.verificationCode}
            </p>
          ) : null}
        </div>
        {/* verification code */}

        <div className="form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Verify Code
          </button>
          {verificationError && (
            <p style={{ color: "red" }} className="error-message">
              {verificationError}
            </p>
          )}
        </div>
        {/* verify code */}
      </form>
      {/* End form */}

      <div className="bottom-box">
        <button className="theme-btn btn-style-one" onClick={handleResendCode}>
          Resend Verification Code
        </button>
      </div>
      {/* End bottom-box */}

      {notification && (
        <div className="notification" style={{ backgroundColor: "#dff0d8", color: "#3c763d", padding: "10px", borderRadius: "5px", marginTop: "10px" }}>
          <p>{notification}</p>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
