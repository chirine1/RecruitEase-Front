import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { axiosPrivate } from "@/axios/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApplicantManagementTable = () => {
  const [applications, setApplications] = useState([]);
  const { jobId } = useParams(); // Get jobId from URL params

  const fetchApplications = async () => {
    try {
      const response = await axiosPrivate.get(`/application/job_apps/${jobId}`);
      setApplications(response.data);
    } catch (error) {
      console.error("Failed to fetch applications", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [jobId]); // Fetch applications whenever jobId changes

  const handleAcceptApplicant = async (applicantId) => {
    try {
      console.log(`Accepting applicant ${applicantId}`);
      const response = await axiosPrivate.put(`/application/accept/${applicantId}`);
      console.log(`API response: ${response.data}`);
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
      const response = await axiosPrivate.put(`/application/reject/${applicantId}`);
      console.log(`API response: ${response.data}`);
      toast.success("Applicant rejected successfully");
      fetchApplications(); // Update table after action
    } catch (error) {
      console.error("Failed to reject applicant", error);
      toast.error("Failed to reject applicant");
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
                <th>Decision</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id}>
                  <td>{application.job.title}</td>
                  <td>{application.candidate.fullname}</td>
                  <td style={{ color: application.decision === 'accepted' ? 'green' : application.decision === 'rejected' ? 'red' : 'orange' }}>{application.decision}</td>
                  <td>
                    <button
                      style={{ marginRight: '5px', backgroundColor: 'green', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }}
                      onClick={() => handleAcceptApplicant(application.id)}
                    >
                      Accept
                    </button>
                    <button
                      style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }}
                      onClick={() => handleRejectApplicant(application.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApplicantManagementTable;
