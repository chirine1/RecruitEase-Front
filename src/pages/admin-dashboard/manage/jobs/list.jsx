import React, { useEffect, useState } from "react";
import axios from "@/axios/axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const JobsTable = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("/job");
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const cancelJob = async (jobId) => {
    try {
      console.log(`Cancelling job ${jobId}`);
      const response = await axios.put(`/job/cancel_job`, { job_id: jobId });
      console.log(`API response: ${response.data}`);
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId ? { ...job, status: "cancelled" } : job
        )
      );
      toast.success("Job cancelled successfully");
    } catch (error) {
      console.error("Failed to cancel job", error);
      toast.error("Error cancelling job");
    }
  };

  const getStatusStyle = (status) => {
    if (status === "ongoing") {
      return { color: "green" };
    } else if (status === "cancelled") {
      return { color: "red" };
    } else {
      return { color: "orange" };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Job Listings</h4>
      </div>
      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Job Name</th>
                <th>Company Name</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Action</th>
                <th>View</th> {/* New column */}
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.company.company_name}</td>
                  <td>{formatDate(job.deadline)}</td>
                  <td style={getStatusStyle(job.status)}>{job.status}</td>
                  <td>
                    {job.status !== "cancelled" && job.status !== "expired" ? (
                      <button onClick={() => cancelJob(job.id)}>Cancel</button>
                    ) : (
                      <span>N/A</span>
                    )}
                  </td>
                  <td>
                    <Link to={`/admins-dashboard/jobs/${job.id}`}>View</Link>
                  </td> {/* New column */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobsTable;
