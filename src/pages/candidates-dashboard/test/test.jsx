import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { axiosPrivate } from "@/axios/axios";
import * as Yup from "yup";
import { toast } from "react-toastify";

const MultipleChoiceTest = () => {
  const { jobId, applicationId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        console.log(`Fetching job details for jobId: ${jobId}`);
        const response = await axiosPrivate.get(`/job/${jobId}`);
        const job = response.data;
        console.log("Fetched job details:", job);
        setQuestions(job.test.questions || []);
      } catch (error) {
        console.error("Failed to fetch job details", error);
        setError("Failed to fetch job details");
      } finally {
        setIsLoading(false);
      }
    };

    if (jobId) {
      fetchJobDetails();
    } else {
      console.error("jobId is undefined");
      setError("Invalid job ID");
      setIsLoading(false);
    }
  }, [jobId]);

  const validationSchema = Yup.object().shape(
    questions.reduce((acc, _, index) => {
      acc[`q${index + 1}`] = Yup.string().required("This question is required");
      return acc;
    }, {})
  );

  const formik = useFormik({
    initialValues: questions.reduce((acc, _, index) => {
      acc[`q${index + 1}`] = "";
      return acc;
    }, {}),
    validationSchema,
    onSubmit: async (values) => {
      // Transform values to { questionIndex: answer }
      const transformedValues = questions.reduce((acc, question, index) => {
        acc[`q${index + 1}`] = values[`q${index + 1}`];
        return acc;
      }, {});

      try {
        const response = await axiosPrivate.post("/application/validate", {
          application_id: applicationId,
          responses: transformedValues,
        });
        console.log("Validation response:", response.data);
        toast.success("Test passed successfully");
      } catch (error) {
        console.error("Failed to validate test", error);
        toast.error("Failed to send test result");
        console.log(transformedValues);
      }
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (questions.length === 0) {
    return <div>No questions available for this test.</div>;
  }

  return (
    <div
      className="multiple-choice-test"
      style={{
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
        {questions.map((question, index) => (
          <div
            key={index}
            className="question-card"
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px",
              width: "100%",
              backgroundColor: "#fff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s",
              fontSize: "18px",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.02)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <p>{question.question}</p>
            <label style={{ display: "block", marginBottom: "8px" }}>
              <input
                type="radio"
                name={`q${index + 1}`}
                value="Yes"
                onChange={formik.handleChange}
                checked={formik.values[`q${index + 1}`] === "Yes"}
                style={{
                  marginRight: "8px",
                  transform: "scale(1.5)",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.8)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1.5)")
                }
              />
              Yes
            </label>
            <label style={{ display: "block" }}>
              <input
                type="radio"
                name={`q${index + 1}`}
                value="No"
                onChange={formik.handleChange}
                checked={formik.values[`q${index + 1}`] === "No"}
                style={{
                  marginRight: "8px",
                  transform: "scale(1.5)",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.8)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1.5)")
                }
              />
              No
            </label>
            {formik.errors[`q${index + 1}`] &&
              formik.touched[`q${index + 1}`] && (
                <div style={{ color: "red" }}>
                  {formik.errors[`q${index + 1}`]}
                </div>
              )}
          </div>
        ))}
        <button
          type="submit"
          style={{
            fontSize: "18px",
            padding: "10px 20px",
            borderRadius: "8px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#0056b3")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#007BFF")
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MultipleChoiceTest;
