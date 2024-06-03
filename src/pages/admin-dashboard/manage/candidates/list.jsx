import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "@/axios/axios";
import { toast } from "react-toastify";

const CandidatesTable = () => {
  const [candidates, setCandidates] = useState([]);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get("/candidate/all");
      setCandidates(response.data);
    } catch (error) {
      console.error("Failed to fetch candidates", error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleBanCandidate = async (candidateId) => {
    try {
      console.log(`Banning candidate ${candidateId}`);
      const response = await axios.put(`/auth/ban_user/${candidateId}`);
      console.log(`API response: ${response.data}`);
      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate) =>
          candidate.id === candidateId ? { ...candidate, ban_status: "banned" } : candidate
        )
      );
      toast.success("User banned successfully");
    } catch (error) {
      console.error("Failed to ban candidate", error);
      toast.error("Error banning user");
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
        <h4>Candidate Listings</h4>
      </div>
      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-candidate-table">
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
              {candidates.map((candidate) => (
                <tr key={candidate.id}>
                  <td>{candidate.fullname}</td>
                  <td style={getStatusStyle(candidate.status)}>{candidate.status}</td>
                  <td style={getBanStatusStyle(candidate.ban_status)}>{candidate.ban_status}</td>
                  <td>
                    <Link to={`/candidates/${candidate.id}`}>
                      <button>View</button>
                    </Link>
                  </td>
                  <td>
                    {candidate.ban_status !== "banned" ? (
                      <button onClick={() => handleBanCandidate(candidate.id)}>
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

export default CandidatesTable;
