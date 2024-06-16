import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { axiosPrivate } from "@/axios/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "@/axios/axios";

const ApplicantManagementTable = () => {
  const [applications, setApplications] = useState([]);
  const [aiResults, setAiResults] = useState({});
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isMotivationModalOpen, setIsMotivationModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);
  const [motivationLetter, setMotivationLetter] = useState("");

  const [formData, setFormData] = useState({
    subject: "",
    content: "",
  });

  const { jobId } = useParams(); // Get jobId from URL params

  const fetchApplications = async () => {
    try {
      const response = await axiosPrivate.get(`/application/job_apps/${jobId}`);
      setApplications(response.data);
    } catch (error) {
      console.error("Failed to fetch applications", error);
    }
  };

  const fetchAiResults = async (applications) => {
    try {
      const aiResults = {};
      for (const application of applications) {
        const response = await axiosPrivate.post(
          `/model/predict?candidate_id=${application.candidate.id}&job_id=${jobId}`
        );
        aiResults[application.id] = response.data.label[0];
      }
      setAiResults(aiResults);
    } catch (error) {
      console.error("Failed to fetch AI results", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [jobId]); // Fetch applications whenever jobId changes

  useEffect(() => {
    if (applications.length > 0) {
      fetchAiResults(applications);
    }
  }, [applications]); // Fetch AI results whenever applications change

  const handleAcceptApplicant = async (applicantId) => {
    try {
      console.log(`Accepting applicant ${applicantId}`);
      const response = await axiosPrivate.put(
        `/application/accept/${applicantId}`
      );
      console.log(`API response: ${response.data}`);
      await axios.post("/notif", {
        content: "Application Accepted",
        target_id: applicantId,
      });
      toast.success("Applicant accepted successfully");
      fetchApplications(); // Update table after action
    } catch (error) {
      console.error("Failed to accept applicant", error);
      toast.error("Failed to accept applicant");
    }
  };

  const handleRejectApplicant = async (applicantId) => {
    try {
      console.log(`Rejecting applicant ${applicantId}`);
      const response = await axiosPrivate.put(
        `/application/reject/${applicantId}`
      );
      console.log(`API response: ${response.data}`);
      await axios.post("/notif", {
        content: "Application Rejected",
        target_id: applicantId,
      });
      toast.success("Applicant rejected successfully");
      fetchApplications(); // Update table after action
    } catch (error) {
      console.error("Failed to reject applicant", error);
      toast.error("Failed to reject applicant");
    }
  };

  const handleMessageClick = (application) => {
    setSelectedApplicant(application.candidate.fullname);
    setSelectedApplicantId(application.candidate.id);
    setFormData({
      subject: "",
      content: "",
    });
    setIsMessageModalOpen(true);
  };

  const handleMotivationClick = (application) => {
    setMotivationLetter(application.motivation_letter);
    setIsMotivationModalOpen(true);
  };

  const handleModalClose = () => {
    setIsMessageModalOpen(false);
    setIsMotivationModalOpen(false);
    setSelectedApplicant(null);
    setSelectedApplicantId(null);
    setMotivationLetter("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const messageData = {
        subject: formData.subject,
        content: formData.content,
        receiver_id: selectedApplicantId,
      };
      await axiosPrivate.post("/message", messageData);
      toast.success("Message sent successfully");
      handleModalClose();
    } catch (error) {
      console.error("Failed to send message", error);
      toast.error("Failed to send message");
    }
  };

  const getAiResultStyle = (result) => {
    switch (result) {
      case "Very High":
      case "High":
        return { backgroundColor: "lightgreen" };
      case "Medium":
        return { backgroundColor: "orange" };
      case "Low":
      case "Very Low":
      case "error":
        return { backgroundColor: "lightcoral" };
      default:
        return {};
    }
  };

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Applications for My Jobs</h4>
      </div>
      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Applicant Name</th>
                <th>Motivation Letter</th>
                <th>Decision</th>
                <th>Action</th>
                <th>AI Result</th>
                <th>Test Result</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id}>
                  <td>{application.job.title}</td>
                  <Link to={`/employers-dashboard/candidates-single/${application.candidate.id}`}>
                    <td>{application.candidate.fullname}</td>
                  </Link>

                  <td>
                    <button
                      style={{
                        backgroundColor: "blue",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleMotivationClick(application)}
                    >
                      View
                    </button>
                  </td>
                  <td
                    style={{
                      color:
                        application.decision === "accepted"
                          ? "green"
                          : application.decision === "rejected"
                          ? "red"
                          : "orange",
                    }}
                  >
                    {application.decision}
                  </td>
                  <td>
                    {application.decision === "accepted" ||
                    application.decision === "rejected" ? (
                      <div>
                        <button
                          style={{
                            marginRight: "5px",
                            backgroundColor:
                              application.decision === "accepted"
                                ? "green"
                                : "gray",
                            color: "white",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            cursor: "not-allowed",
                            opacity: 0.5,
                          }}
                          disabled
                        >
                          Accept
                        </button>
                        <button
                          style={{
                            backgroundColor:
                              application.decision === "rejected"
                                ? "red"
                                : "gray",
                            color: "white",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            cursor: "not-allowed",
                            opacity: 0.5,
                          }}
                          disabled
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          style={{
                            marginRight: "5px",
                            backgroundColor: "green",
                            color: "white",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "5px",
                          }}
                          onClick={() => handleAcceptApplicant(application.id)}
                        >
                          Accept
                        </button>
                        <button
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "5px",
                          }}
                          onClick={() => handleRejectApplicant(application.id)}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                  <td style={getAiResultStyle(aiResults[application.id])}>
                    {aiResults[application.id] || "Loading..."}
                  </td>
                  <td>{application.mark == null ? 0 : application.mark}/10</td>
                  <td>
                    <button
                      style={{
                        backgroundColor: "blue",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleMessageClick(application)}
                    >
                      Message
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isMessageModalOpen && (
        <>
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
              width: "400px",
              maxWidth: "90%",
              textAlign: "center",
            }}
          >
            <h4 style={{ marginBottom: "20px", color: "#333" }}>
              Send Message
            </h4>
            <form onSubmit={handleFormSubmit}>
              <div style={{ marginBottom: "15px", textAlign: "left" }}>
                <label
                  style={{
                    fontWeight: "bold",
                    display: "block",
                    marginBottom: "5px",
                  }}
                >
                  Receiver: {selectedApplicant}
                </label>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    textAlign: "left",
                  }}
                >
                  Subject:
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </label>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    textAlign: "left",
                  }}
                >
                  Content:
                  <textarea
                    name="content"
                    value={formData.content}
                    required
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      height: "100px",
                    }}
                  />
                </label>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Send
                </button>
                <button
                  type="button"
                  onClick={handleModalClose}
                  style={{
                    backgroundColor: "gray",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <div
            onClick={handleModalClose}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
            }}
          />
        </>
      )}

      {isMotivationModalOpen && (
        <>
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
              width: "400px",
              maxWidth: "90%",
              textAlign: "center",
            }}
          >
            <h4 style={{ marginBottom: "20px", color: "#333" }}>
              Motivation Letter
            </h4>
            <textarea
              value={motivationLetter}
              readOnly
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                height: "200px",
                resize: "none",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <button
                type="button"
                onClick={handleModalClose}
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
          <div
            onClick={handleModalClose}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
            }}
          />
        </>
      )}
    </div>
  );
};

export default ApplicantManagementTable;
