import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { toast } from "react-toastify";

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
      toast.success("extended deadline")
    } catch (error) {
      console.error("Failed to update deadline", error);
      toast.error("failed to extend")
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
      toast.success("cancelled job successfully")
    } catch (error) {
      console.error("Failed to cancel job", error);
      toast.error("failed to cancel")
    }
  };

  const getStatusStyle = (status) => {
    if (status === "cancelled" || status === "expired") {
      return { color: "red" };
    } else {
      return { color: "green" };
    }
  };

  const buttonStyle = {
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
  };
  const cancelStyle = {
    backgroundColor: "#FF6347",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
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
                <th>Cancel</th>
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
                    <Link
                      to={`/employers-dashboard/job/${job.id}`}
                      
                    >
                      View
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
                        <button
                          onClick={() => handleSaveDeadline(job.id)}
                         
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <span>N/A</span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      style={cancelStyle}
                    >
                      Cancel
                    </button>
                  </td>
                  <td>
                    <Link
                      to={`/employers-dashboard/applicant/${job.id}`}
                      style={buttonStyle}
                    >
                      View Applicants
                    </Link>
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
