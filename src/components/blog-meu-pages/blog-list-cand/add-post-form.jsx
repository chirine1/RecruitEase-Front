import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axiosPrivate from "@/axios/axios"; // Ensure you import axios from your custom axios instance

// Validation schema using Yup
const validationSchema = Yup.object({
  postTitle: Yup.string().required("Post title is required"),
  synopsis: Yup.string()
    .max(200, "Synopsis cannot exceed 200 characters")
    .required("Synopsis is required"),
  subTitle1: Yup.string().required("Sub title 1 is required"),
  paragraph1: Yup.string().required("Paragraph 1 is required"),
  subTitle2: Yup.string().required("Sub title 2 is required"),
  paragraph2: Yup.string().required("Paragraph 2 is required"),
});

const BlogPostForm = () => {
  const [logImg, setLogoImg] = useState("");
  const logImgHander = (e) => {
    setLogoImg(e.target.files[0]);
  };
  // Formik initialization
  const formik = useFormik({
    initialValues: {
      postTitle: "",
      synopsis: "",
      subTitle1: "",
      paragraph1: "",
      subTitle2: "",
      paragraph2: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // API call to submit the form data
        const response = await axiosPrivate.post("/blog_post", values);
        console.log("Blog post created successfully:", response.data);
        toast.success("Blog post created successfully");
        resetForm();
      } catch (error) {
        console.error("There was an error creating the blog post:", error);
        toast.error("Error creating blog post");
      }
    },
  });

  return (
    <form action="#" className="default-form" onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="uploading-outer">
          <div className="uploadButton">
            <input
              className="uploadButton-input"
              type="file"
              name="attachments[]"
              accept="image/*"
              id="upload"
              required
              onChange={logImgHander}
            />
            <label
              className="uploadButton-button ripple-effect"
              htmlFor="upload"
            >
              {logImg !== "" ? logImg.name : "Browse image"}
            </label>
            <span className="uploadButton-file-name"></span>
          </div>
          <div className="text">
            Max file size is 1MB, Minimum dimension: 330x300 And Suitable files
            are .jpg & .png
          </div>
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Post Title</label>
          <input
            type="text"
            name="postTitle"
            placeholder="Enter post title"
            value={formik.values.postTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-control ${
              formik.touched.postTitle && formik.errors.postTitle
                ? "is-invalid"
                : ""
            }`}
            required
          />
          {formik.touched.postTitle && formik.errors.postTitle ? (
            <div className="invalid-feedback" style={{ color: "red" }}>
              {formik.errors.postTitle}
            </div>
          ) : null}
        </div>

        {/* <!-- Synopsis Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Synopsis</label>
          <input
            type="text"
            name="synopsis"
            placeholder="Enter a brief synopsis (max 200 characters)"
            value={formik.values.synopsis}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-control ${
              formik.touched.synopsis && formik.errors.synopsis
                ? "is-invalid"
                : ""
            }`}
            required
          />
          {formik.touched.synopsis && formik.errors.synopsis ? (
            <div className="invalid-feedback" style={{ color: "red" }}>
              {formik.errors.synopsis}
            </div>
          ) : null}
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Sub Title 1</label>
          <input
            type="text"
            name="subTitle1"
            placeholder="Enter sub title 1"
            value={formik.values.subTitle1}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-control ${
              formik.touched.subTitle1 && formik.errors.subTitle1
                ? "is-invalid"
                : ""
            }`}
            required
          />
          {formik.touched.subTitle1 && formik.errors.subTitle1 ? (
            <div className="invalid-feedback" style={{ color: "red" }}>
              {formik.errors.subTitle1}
            </div>
          ) : null}
        </div>

        {/* <!-- Textarea --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Paragraph 1</label>
          <textarea
            name="paragraph1"
            placeholder="Enter paragraph 1"
            value={formik.values.paragraph1}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-control ${
              formik.touched.paragraph1 && formik.errors.paragraph1
                ? "is-invalid"
                : ""
            }`}
            required
          ></textarea>
          {formik.touched.paragraph1 && formik.errors.paragraph1 ? (
            <div className="invalid-feedback" style={{ color: "red" }}>
              {formik.errors.paragraph1}
            </div>
          ) : null}
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Sub Title 2</label>
          <input
            type="text"
            name="subTitle2"
            placeholder="Enter sub title 2"
            value={formik.values.subTitle2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-control ${
              formik.touched.subTitle2 && formik.errors.subTitle2
                ? "is-invalid"
                : ""
            }`}
            required
          />
          {formik.touched.subTitle2 && formik.errors.subTitle2 ? (
            <div className="invalid-feedback" style={{ color: "red" }}>
              {formik.errors.subTitle2}
            </div>
          ) : null}
        </div>

        {/* <!-- Textarea --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Paragraph 2</label>
          <textarea
            name="paragraph2"
            placeholder="Enter paragraph 2"
            value={formik.values.paragraph2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-control ${
              formik.touched.paragraph2 && formik.errors.paragraph2
                ? "is-invalid"
                : ""
            }`}
            required
          ></textarea>
          {formik.touched.paragraph2 && formik.errors.paragraph2 ? (
            <div className="invalid-feedback" style={{ color: "red" }}>
              {formik.errors.paragraph2}
            </div>
          ) : null}
        </div>

        {/* <!-- Submit Button --> */}
        <div className="form-group col-lg-12 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default BlogPostForm;
