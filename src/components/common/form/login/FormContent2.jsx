import { Link, useNavigate } from "react-router-dom";
import LoginWithSocial from "./LoginWithSocial";
import React, { useState } from "react";
import axios from "@/axios/axios";
import useAuth from "@/hooks/useAuth";

const FormContent2 = () => {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState(""); // New state for login error message
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the password meets length requirements
    if (!validatePasswordLength(password)) {
      setPasswordError("Password must be between 8 and 32 characters long");
      return;
    }

    try {
      const response = await axios.post(
        "/auth/login",
        { email, password },
        {
          withCredentials: true, // Include credentials in the request
        }
      );

      const isAuthenticated = true;
      const role = response?.data?.role;
      setAuth(isAuthenticated, role);

      console.log(role);

      // Redirect to a protected route after successful login
      if (role == "candidate") {
        navigate("/candidates-dashboard/dashboard");
      } else if (role == "recruiter") {
        navigate("/employers-dashboard/dashboard");
      } else {
        console.log(role);
        navigate("/admins-dashboard/dashboard");
      }
    } catch (error) {
      if (error.response.status === 401) {
        // Send email verification request
        await axios.post("/auth/send_email", { email });
        navigate("/confirm-email", { state: { email } });
      }
      if (error.response.status === 409) {
        setEmailError("Account banned");
      }
      console.error("Login failed", error);
      setLoginError("No user found. Please check your credentials.");
    }
  };

  // Function to validate password length
  const validatePasswordLength = (password) => {
    return password.length >= 8 && password.length <= 32;
  };

  // Function to validate email format
  const validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgotPassword = async () => {
    if (!validateEmailFormat(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    await axios.post("/auth/forgot_password_mail", { email });
    navigate("/forgot-password", { state: { email } });
  };

  return (
    <div className="form-inner">
      <h3>Login to RecruitEase</h3>

      {/* <!--Login Form--> */}
      <form method="post">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(""); // Clear email error on change
              setLoginError(""); // Clear login error on change
            }}
          />
          {emailError && (
            <p style={{ color: "red" }} className="error-message">
              {emailError}
            </p>
          )}
        </div>
        {/* email */}

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(""); // Clear password error on change
              setLoginError(""); // Clear login error on change
            }}
          />
          {passwordError && (
            <p style={{ color: "red" }} className="error-message">
              {passwordError}
            </p>
          )}
        </div>
        {/* password */}

        <div className="form-group">
          <div className="field-outer">
            <div className="input-group checkboxes square">
              <input type="checkbox" name="remember-me" id="remember" />
              <label htmlFor="remember" className="remember">
                <span className="custom-checkbox"></span> Remember me
              </label>
            </div>
            <a href="#" className="pwd" onClick={handleForgotPassword}>
              Forgot password?
            </a>
          </div>
        </div>
        {/* forgot password */}

        <div className="form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            name="log-in"
            onClick={handleSubmit}
          >
            Log In
          </button>
          {loginError && (
            <p style={{ color: "red" }} className="error-message">
              {loginError}
            </p>
          )}
        </div>
        {/* login */}
      </form>
      {/* End form */}

      <div className="bottom-box">
        <div className="text">
          Don&apos;t have an account? <Link to="/register">Signup</Link>
        </div>

        {/* 
        <div className="divider">
          <span>or</span>
        </div>

         <LoginWithSocial /> */}
      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default FormContent2;
