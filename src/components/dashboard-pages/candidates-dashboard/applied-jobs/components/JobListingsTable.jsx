import { useEffect, useState } from "react";
import { axiosPrivate } from "@/axios/axios";
import { Link, useNavigate } from "react-router-dom";

const JobListingsTable = () => {
  // State variables to hold job listings data
  const [jobListings, setJobListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Function to fetch job listings from backend API
  const fetchJobListings = async () => {
    try {
      const response = await axiosPrivate.get("/application/my_jobs");
      setJobListings(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching job listings:", error);
      setIsLoading(false);
    }
  };

  // Fetch job listings when the component mounts
  useEffect(() => {
    fetchJobListings();
  }, []);

  // Placeholder function for handling "Pass Test" action
  const handlePassTest = (jobId, applicationId) => {
    console.log(
      `Pass test for job ID: ${jobId} and application ID: ${applicationId}`
    );
    navigate(`/candidates-dashboard/test/${jobId}/${applicationId}`);
    // Implement the pass test action here
  };

  // Placeholder function for handling "Test Result" action
  const handleTestResult = (jobId) => {
    console.log(`View test result for job ID: ${jobId}`);
    // Implement the test result action here
  };

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Applied Jobs</h4>
        <div className="chosen-outer"></div>
      </div>
      <div className="widget-content">
        <div className="table-outer" style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Employer</th>
                <th>Status</th>
                <th>Pass Test</th>
                <th>Test Result</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="6">Loading...</td>
                </tr>
              ) : (
                jobListings.map((app) => (
                  <tr key={app.id}>
                    <td>{app.job.title || "N/A"}</td>
                    <Link
                      to={`/candidates-dashboard/employers-single/${app.job.company.id}`}
                    >
                      <td>{app.job.company?.company_name || "N/A"}</td>
                    </Link>

                    <td>{app.decision || "N/A"}</td>
                    <td>
                      <button
                        onClick={() => handlePassTest(app.job.id, app.id)}
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          cursor: "pointer",
                        }}
                      >
                        Pass Test
                      </button>
                    </td>
                    <td>{app.mark == null ? 0 : app.mark}/10</td>
                    <td>
                      <Link
                        to={`/candidates-dashboard/find-jobs/${app.job.id}`}
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                          padding: "5px 10px",
                          textDecoration: "none",
                          display: "inline-block",
                        }}
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobListingsTable;
