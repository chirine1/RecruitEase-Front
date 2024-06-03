import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "@/axios/axios";
import { toast } from "react-toastify";

const RecruitersTable = () => {
  const [recruiters, setRecruiters] = useState([]);

  const fetchRecruiters = async () => {
    try {
      const response = await axios.get("/company");
      setRecruiters(response.data);
    } catch (error) {
      console.error("Failed to fetch recruiters", error);
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const handleBanRecruiter = async (recruiterId) => {
    try {
      console.log(`Banning recruiter ${recruiterId}`);
      const response = await axios.put(`/auth/ban_user/${recruiterId}`);
      console.log(`API response: ${response.data}`);
      setRecruiters((prevRecruiters) =>
        prevRecruiters.map((recruiter) =>
          recruiter.id === recruiterId
            ? { ...recruiter, ban_status: "banned" }
            : recruiter
        )
      );
      toast.success("Recruiter banned successfully");
    } catch (error) {
      console.error("Failed to ban recruiter", error);
      toast.error("Error banning recruiter");
    }
  };

  const getBanStatusStyle = (ban_status) => {
    return { color: ban_status === "banned" ? "red" : "green" };
  };

  const getStatusStyle = (status) => {
    if (status === 0) {
      return { color: "orange" };
    } else {
      return { color: "green" };
    }
  };

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Recruiter Listings</h4>
      </div>
      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-recruiter-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Status</th>
                <th>Ban Status</th>
                <th>View</th>
                <th>Ban</th>
              </tr>
            </thead>
            <tbody>
              {recruiters.map((recruiter) => (
                <tr key={recruiter.id}>
                  <td>{recruiter.fullname}</td>
                  <td style={getStatusStyle(recruiter.status)}>
                    {recruiter.status}
                  </td>
                  <td style={getBanStatusStyle(recruiter.ban_status)}>
                    {recruiter.ban_status}
                  </td>
                  <td>
                    <Link to={`/recruiters/${recruiter.id}`}>
                      <button>View</button>
                    </Link>
                  </td>
                  <td>
                    {recruiter.ban_status !== "banned" ? (
                      <button onClick={() => handleBanRecruiter(recruiter.id)}>
                        Ban
                      </button>
                    ) : (
                      <span>N/A</span>
                    )}
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

export default RecruitersTable;
