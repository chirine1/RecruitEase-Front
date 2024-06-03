import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "@/axios/axios";
import { useNavigate, useLocation } from "react-router-dom";

const ConfirmEmailForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the email passed from the login page
  const email = location.state?.email || "";

  const [activationError, setActivationError] = useState("");
  const [notification, setNotification] = useState("");

  const formik = useFormik({
    initialValues: {
      activationCode: "",
    },
    validationSchema: Yup.object({
      activationCode: Yup.string()
        .required("Activation code is required")
        .length(6, "Activation code must be exactly 6 characters"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post("/auth/verify_code", {
          code: values.activationCode,
          email: email, // Use the email from the location state
        });

        console

        if (response.status === 200) {
          setNotification("Account confirmed successfully!");
          setTimeout(() => {
            navigate("/login");
          }, 2000); // Redirect to login after 2 seconds
        } else {
          setActivationError("Invalid activation code. Please try again.");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setActivationError("Wrong email! Please check your email.");
        } else if (error.response && error.response.status === 410) {
          setActivationError(
            "Activation code expired. Please resend the code."
          );
        } else {
          setActivationError("Invalid activation code. Please try again.");
        }
        console.error("Activation failed", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleResendCode = async () => {
    try {
      const response = await axios.post(
        "/auth/send_email",
        { email: email }, // Send email in resend code request
      );
      setNotification("Activation code resent successfully!");
    } catch (error) {
      console.error("Failed to resend activation code", error);
      setActivationError("Failed to resend activation code. Please try again.");
    }
  };

  return (
    <div className="form-inner">
      <h3>Confirm Your Email</h3>

      {/* Confirm Email Form */}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <p>{email}</p>
        </div>
        {/* email */}

        <div className="form-group">
          <label>Activation Code</label>
          <input
            type="text"
            name="activationCode"
            placeholder="Enter your activation code"
            value={formik.values.activationCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.activationCode && formik.errors.activationCode ? (
            <p style={{ color: "red" }} className="error-message">
              {formik.errors.activationCode}
            </p>
          ) : null}
        </div>
        {/* activation code */}

        <div className="form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Confirm Email
          </button>
          {activationError && (
            <p style={{ color: "red" }} className="error-message">
              {activationError}
            </p>
          )}
        </div>
        {/* confirm email */}
      </form>
      {/* End form */}

      <div className="bottom-box">
        <button className="theme-btn btn-style-one" onClick={handleResendCode}>
          Resend Activation Code
        </button>
      </div>
      {/* End bottom-box */}

      {notification && (
        <div className="notification">
          <p style={{ color: "green" }}>{notification}</p>
        </div>
      )}
    </div>
  );
};

export default ConfirmEmailForm;
