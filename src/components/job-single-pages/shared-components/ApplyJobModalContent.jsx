import { useState } from "react";
import { useFormik } from "formik";
import { axiosPrivate } from "@/axios/axios";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "@/axios/axios";

const ApplyJobModalContent = ({ jobId, setAlreadyApplied }) => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: Yup.object().shape({
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const data = {
          motivation_letter: values.message,
          job_id: jobId,
        };
        const response = await axiosPrivate.post("/application", data);
        console.log("Form submission successful:", response.data);
        const target_id_response =  await axios.get(`/company/fromjob/${jobId}`) ;
        await axios.post("/notif",{content:"New Application",target_id:target_id_response.data});
        setAlreadyApplied(true)
        toast.success("Job application submitted successfully");
        // Reset form
        formik.resetForm();
      } catch (error) {
        console.error("Error submitting job application:", error);
        toast.error("Failed to submit job application");
      }
      setIsLoading(false);
    },
  });

  return (
    <form className="default-form job-apply-form" onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <textarea
            className="darma"
            name="message"
            placeholder="Message"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
          {formik.touched.message && formik.errors.message ? (
            <div className="error-message" style={{color: "red"}}>{formik.errors.message}</div>
          ) : null}
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <button
            className="theme-btn btn-style-one w-100"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Apply Job"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ApplyJobModalContent;
