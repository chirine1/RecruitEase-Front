import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "@/axios/axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormContent2 = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    fullname: Yup.string().required("full name is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .max(32, "Password must be no more than 32 characters long")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      fullname: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      toast.dismiss();  // Dismiss any existing toasts
      try {
        const response = await axios.post("/auth/signup", {
          email: values.email,
          fullname: values.fullname,
          password: values.password,
          role: "recruiter",
        });
        toast.success("Registration successful!");
        navigate("/login");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setFieldError('email', error.response.data.error);
          //toast.error(error.response.data.error);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.email && formik.errors.email ? "input-error" : ""}
        />
        {formik.touched.email && formik.errors.email ? (
          <p style={{ color: "red" }}>{formik.errors.email}</p>
        ) : null}
      </div>
      {/* email */}

      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="fullname"
          placeholder="Full name"
          value={formik.values.fullname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.fullname && formik.errors.fullname ? "input-error" : ""}
        />
        {formik.touched.fullname && formik.errors.fullname ? (
          <p style={{ color: "red" }}>{formik.errors.fullname}</p>
        ) : null}
      </div>
      {/* fullname */}

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.password && formik.errors.password ? "input-error" : ""}
        />
        {formik.touched.password && formik.errors.password ? (
          <p style={{ color: "red" }}>{formik.errors.password}</p>
        ) : null}
      </div>
      {/* password */}

      <div className="form-group">
        <button
          className="theme-btn btn-style-one"
          type="submit"
          disabled={formik.isSubmitting}
        >
          Register
        </button>
      </div>

      <ToastContainer />
      {/* toast notifications */}
    </form>
  );
};

export default FormContent2;
