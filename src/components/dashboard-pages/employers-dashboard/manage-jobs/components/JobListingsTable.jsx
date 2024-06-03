import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

const JobListingsTable = () => {
  const [jobs, setJobs] = useState([]);
  const [newDeadlines, setNewDeadlines] = useState({});
  const { axiosPrivate } = useAxiosPrivate();

  const fetchUserJobs = async () => {
    try {
      const response = await axiosPrivate.get("/job/user_jobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to fetch user jobs", error);
    }
  };

  useEffect(() => {
    fetchUserJobs();
  }, []);

  const formattedDeadline = (deadline) => {
    const deadlineDate = new Date(deadline);
    const year = deadlineDate.getFullYear();
    const month = String(deadlineDate.getMonth() + 1).padStart(2, "0");
    const day = String(deadlineDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDeadlineChange = (jobId, newDeadline) => {
    setNewDeadlines((prevDeadlines) => ({
      ...prevDeadlines,
      [jobId]: newDeadline,
    }));
  };

  const handleSaveDeadline = async (jobId) => {
    const newDeadline = newDeadlines[jobId];
    if (!newDeadline) return;

    try {
      console.log(`Saving new deadline for job ${jobId}: ${newDeadline}`);
      const response = await axiosPrivate.put(`/job/extend_deadline`, {
        deadline: newDeadline,
        job_id: jobId,
      });
      console.log(`API response: ${response.data}`);
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId ? { ...job, deadline: newDeadline } : job
        )
      );
    } catch (error) {
      console.error("Failed to update deadline", error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      console.log(`Cancelling job ${jobId}`);
      const response = await axiosPrivate.put(`/job/cancel_job`, {
        job_id: jobId,
      });
      console.log(`API response: ${response.data}`);
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId ? { ...job, status: "cancelled" } : job
        )
      );
    } catch (error) {
      console.error("Failed to cancel job", error);
    }
  };

  const getStatusStyle = (status) => {
    if (status === "cancelled" || status === "expired") {
      return { color: "red" };
    } else {
      return { color: "green" };
    }
  };

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Job Listings</h4>
      </div>
      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>View</th>
                <th>Extend Deadline</th>
                <th>Delete</th>
                <th>Applicants</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{formattedDeadline(job.deadline)}</td>
                  <td style={getStatusStyle(job.status)}>{job.status}</td>
                  <td>
                    <Link to={`/employers-dashboard/job/${job.id}`}>
                      <button>View</button>
                    </Link>
                  </td>
                  <td>
                    {job.status !== "cancelled" && job.status !== "expired" ? (
                      <>
                        <input
                          type="date"
                          value={newDeadlines[job.id] || ""}
                          onChange={(e) =>
                            handleDeadlineChange(job.id, e.target.value)
                          }
                          min={new Date().toISOString().split("T")[0]}
                        />
                        <button onClick={() => handleSaveDeadline(job.id)}>
                          Save
                        </button>
                      </>
                    ) : (
                      <span>N/A</span>
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleDeleteJob(job.id)}>
                      Cancel
                    </button>
                  </td>
                  <td>
                    <Link to={`/employers-dashboard/applicant/${job.id}`}>View Applicants</Link>
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

export default JobListingsTable;
