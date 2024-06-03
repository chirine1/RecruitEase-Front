import { useEffect, useState } from "react";
import { axiosPrivate } from "@/axios/axios";
import { Link } from "react-router-dom";

const JobListingsTable = () => {
  // State variables to hold job listings data
  const [jobListings, setJobListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Applied Jobs</h4>
        <div className="chosen-outer"></div>
      </div>
      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Job Title</th>
                
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="4">Loading...</td>
                </tr>
              ) : (
                jobListings.map((app) => (
                  <tr key={app.id}>
                    <td>{app.job.title}</td>
                    
                    <td>{app.decision}</td>
                    <td>
                      <button onClick={() => handleAction(job.id)}>
                        <Link
                          to={`/candidates-dashboard/find-jobs/${app.job.id}`}
                        >
                          View Details
                        </Link>
                      </button>
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
