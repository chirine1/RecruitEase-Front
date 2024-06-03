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
import DashboardCandidatesHeader from "@/components/header/DashboardCandidatesHeader";
import { useEffect, useState } from "react";
import { axiosPrivate } from "@/axios/axios";
import CandidateCustomHeader from "@/components/header/candidate-custom";
const metadata = {
  title: "Job Single Dyanmic  || RecruitEase - Job Borad ",
  description: "RecruitEase - Job Borad ",
};

const JobSingleDynamic = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [showDateInput, setShowDateInput] = useState(false);
  const [newDeadline, setNewDeadline] = useState("");

  const formatDate = (dateString) => {
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

      fetchJobDetails();
    }
  }, [jobId, navigate]);

  if (!job) {
    return null;
  }

  return (
    <>
      <MetaComponent meta={metadata} />
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <CandidateCustomHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!-- Job Detail Section --> */}
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
                      {job.company.contact_info.country.label}
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
                {/* End .content */}

                <div className="btn-box">
                  <a
                    href="#"
                    className="theme-btn btn-style-one"
                    data-bs-toggle="modal"
                    data-bs-target="#applyJobModal"
                  >
                    Apply For Job
                  </a>
                </div>
                {/* End apply for job btn */}

                {/* <!-- Modal --> */}
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
                      {/* End modal-header */}

                      <ApplyJobModalContent jobId={jobId}/>
                      {/* End PrivateMessageBox */}
                    </div>
                    {/* End .send-private-message-wrapper */}
                  </div>
                </div>
                {/* End .modal */}
              </div>
            </div>
            {/* <!-- Job Block --> */}
          </div>
        </div>
        {/* <!-- Upper Box --> */}

        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 offset-2 col-md-12 col-sm-12">
                <h4>Job Description</h4>
                <p>{job.description}</p>
                {/* End jobdetails content */}

                {/* <!-- Other Options --> */}

                <div className="related-jobs">
                  <div className="title-box">
                    <h3>Related Jobs</h3>
                    <div className="text">
                      2024 jobs live - 293 added today.
                    </div>
                  </div>
                  {/* End title box */}

                  <RelatedJobs />
                </div>
                {/* <!-- Related Jobs --> */}
              </div>
              {/* End .content-column */}
            </div>
          </div>
        </div>
        {/* <!-- job-detail-outer--> */}
      </section>
      {/* <!-- End Job Detail Section --> */}

      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default JobSingleDynamic;
