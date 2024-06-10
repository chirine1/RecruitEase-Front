import jobs from "@/data/job-featured";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import RelatedJobs from "@/components/job-single-pages/related-jobs/RelatedJobs";
import SocialTwo from "@/components/job-single-pages/social/SocialTwo";
import JobDetailsDescriptions from "@/components/job-single-pages/shared-components/JobDetailsDescriptions";
import ApplyJobModalContent from "@/components/job-single-pages/shared-components/ApplyJobModalContent";
import { useNavigate, useParams } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";
import CandidateCustomHeader from "@/components/header/candidate-custom";
import { useEffect, useState } from "react";
import { axiosPrivate } from "@/axios/axios";

const metadata = {
  title: "Job Single Dynamic  || RecruitEase - Job Board ",
  description: "RecruitEase - Job Board ",
};

const JobSingleDynamic = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString)
      .toLocaleDateString("en-GB", options)
      .replace(/\//g, "/");
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

      const checkIfAlreadyApplied = async () => {
        try {
          const response = await axiosPrivate.post(`/application/already_applied/${jobId}`);
          setAlreadyApplied(response.data); // assuming the API returns a boolean
        } catch (error) {
          console.error("Failed to check application status", error);
        }
      };

      fetchJobDetails();
      checkIfAlreadyApplied();
    }
  }, [jobId, navigate]);

  if (!job) {
    return null;
  }

  return (
    <>
      <MetaComponent meta={metadata} />
      <span className="header-span"></span>
      <CandidateCustomHeader />
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
                  <h4 className="job-title">{job.title || "N/A"}</h4>
                  <ul className="job-info">
                    <li>
                      <span className="icon flaticon-briefcase"></span>
                      {job.company?.company_name || "N/A"}
                    </li>
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {job.company?.contact_info?.country?.label || "N/A"}
                    </li>
                    <li>
                      <span className="icon flaticon-clock-3"></span>
                      {formatDate(job.deadline)}
                    </li>
                    <li>
                      <span className="icon flaticon-money"></span>
                      ${job.offered_salary_min || "N/A"} - ${job.offered_salary_max || "N/A"}
                    </li>
                  </ul>
                  <ul className="job-other-info">
                    <li className="time">
                      <a href="#!">{job.job_type || "N/A"}</a>
                    </li>
                    <li className="privacy">
                      <a href="#!">{job.industry?.label || "N/A"}</a>
                    </li>
                    <li className="required">
                      <a href="#!">{job.career_level || "N/A"}</a>
                    </li>
                  </ul>
                </div>

                <div className="btn-box">
                  {alreadyApplied ? (
                    <div className="theme-btn btn-style-one">
                      You have already applied for this job.
                    </div>
                  ) : (
                    <a
                      href="#"
                      className="theme-btn btn-style-one"
                      data-bs-toggle="modal"
                      data-bs-target="#applyJobModal"
                    >
                      Apply For Job
                    </a>
                  )}
                </div>

                <div
                  className="modal fade"
                  id="applyJobModal"
                  tabIndex="-1"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="apply-modal-content modal-content">
                      <div className="text-center">
                        <h3 className="title">Apply for this job</h3>
                        <button
                          type="button"
                          className="closed-modal"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <ApplyJobModalContent jobId={jobId} setAlreadyApplied={setAlreadyApplied}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 offset-2 col-md-12 col-sm-12">
                <h4>Job Description</h4>
                <p>{job.description || "No description available."}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobSingleDynamic;
