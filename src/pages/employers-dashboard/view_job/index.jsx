import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosPrivate } from '@/axios/axios';
import MobileMenu from '@/components/header/MobileMenu';
import MetaComponent from '@/components/common/MetaComponent';
import DashboardEmployerHeaderCustom from '@/components/header/employer-header-custom';

const metadata = {
  title: "Job Single Dynamic || RecruitEase - Job Board",
  description: "RecruitEase - Job Board",
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString)
    .toLocaleDateString("en-GB", options)
    .replace(/\//g, "/");
};

const JobSingleDynamicEmployer = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [showDateInput, setShowDateInput] = useState(false);
  const [newDeadline, setNewDeadline] = useState('');

  const handleExtendDeadline = () => {
    setShowDateInput(true);
  };

  const handleSaveNewDeadline = async () => {
    try {
      await axiosPrivate.put(`/job/${jobId}/extend-deadline`, { newDeadline });
      setJob((prevJob) => ({ ...prevJob, deadline: newDeadline }));
      setShowDateInput(false);
    } catch (error) {
      console.error("Failed to update deadline", error);
    }
  };

  useEffect(() => {
    if (jobId) {
      const fetchJobDetails = async () => {
        try {
          const response = await axiosPrivate.get(`/job/${jobId}`);
          setJob(response.data);
        } catch (error) {
          console.error("Failed to fetch job details", error);
          navigate("/404");
        }
      };

      fetchJobDetails();
    }
  }, [jobId, navigate]);

  if (!job) {
    return null;
  }

  const tagStyle = {
    display: "inline-block",
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "5px",
    textDecoration: "none",
    marginRight: "5px",
    marginBottom: "5px",
  };

  return (
    <>
      <MetaComponent meta={metadata} />
      <span className="header-span"></span>
      <DashboardEmployerHeaderCustom />
      <MobileMenu />
      <section className="job-detail-section style-three">
        <div className="upper-box">
          <div className="auto-container">
            <div className="job-block-seven style-three">
              <div className="inner-box">
                <div className="content">
                  <span className="company-logo">
                    <img src="/src/images/face.jpg" alt="logo" />
                  </span>
                  <h4 className="job-title">{job.title}</h4>
                  <ul className="job-info">
                    <li>
                      <span className="icon flaticon-briefcase"></span>
                      {job.company.company_name}
                    </li>
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {job.company.contact_info.complete_address}
                    </li>
                    <li>
                      <span className="icon flaticon-clock-3"></span>
                      {formatDate(job.deadline)}
                    </li>
                    <li>
                      <span className="icon flaticon-money"></span>$
                      {job.offered_salary_min} - ${job.offered_salary_max}
                    </li>
                  </ul>
                  <ul className="job-other-info">
                    <li className="time">
                      <a href="#!">{job.job_type}</a>
                    </li>
                    <li className="privacy">
                      <a href="#!">{job.industry.label}</a>
                    </li>
                    <li className="required">
                      <a href="#!">{job.career_level}</a>
                    </li>
                  </ul>
                </div>
                {/* <div className="btn-box">
                  <button
                    className="theme-btn btn-style-one"
                    onClick={handleExtendDeadline}
                  >
                    Extend Deadline
                  </button>
                  {showDateInput && (
                    <div>
                      <input
                        type="date"
                        value={newDeadline}
                        onChange={(e) => setNewDeadline(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                      <button onClick={handleSaveNewDeadline} style={buttonStyle}>
                        Save
                      </button>
                    </div>
                  )}
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 offset-2 col-md-12 col-sm-12">
                <h2 className="section-title">Job Description</h2>
                <p>{job.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const buttonStyle = {
  marginLeft: '10px',
  padding: '5px 10px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default JobSingleDynamicEmployer;
