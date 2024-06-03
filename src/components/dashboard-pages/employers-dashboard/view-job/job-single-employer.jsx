import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosPrivate } from "@/axios/axios";
import MobileMenu from "@/components/header/MobileMenu";
import JobDetailsDescriptions from "@/components/job-single-pages/shared-components/JobDetailsDescriptions";
import MetaComponent from "@/components/common/MetaComponent";
import DashboardEmployerHeaderCustom from "@/components/header/employer-header-custom";

const metadata = {
  title: "Job Single Dynamic || RecruitEase - Job Board",
  description: "RecruitEase - Job Board",
};

const JobSingleDynamicEmployer = () => {
  const { id } = useParams();
  const {navigate } = useNavigate()
  const [job, setJob] = useState(null);

  useEffect(() => {
    // Fetch job details using Axios with the job ID from params
    const fetchJobDetails = async () => {
      try {
        const response = await axiosPrivate.get(`/job/${id}`);
        setJob(response.data);
      } catch (error) {
        console.error("Failed to fetch job details", error);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (!job) {
    navigate("/404")
  }

  return (
    <>
      <MetaComponent meta={metadata} />
      {/* Header Span */}
      <span className="header-span"></span>

      <DashboardEmployerHeaderCustom />
      {/* End Main Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* Job Detail Section */}
      <section className="job-detail-section style-three">
        <div className="upper-box">
          <div className="auto-container">
            <div className="job-block-seven style-three">
              <div className="inner-box">
                <div className="content">
                  <span className="company-logo">
                    <img src={job.logo} alt="logo" />
                  </span>
                  <h4>{job.jobTitle}</h4>

                  <ul className="job-info">
                    <li>
                      <span className="icon flaticon-briefcase"></span>
                      {job.company}
                    </li>
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {job.location}
                    </li>
                    <li>
                      <span className="icon flaticon-clock-3"></span>{" "}
                      {job.time}
                    </li>
                    <li>
                      <span className="icon flaticon-money"></span>{" "}
                      {job.salary}
                    </li>
                  </ul>

                  <ul className="job-other-info">
                    {job.jobType.map((val, i) => (
                      <li key={i} className={val.styleClass}>
                        {val.type}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="btn-box">
                  <a href="#" className="theme-btn btn-style-one">
                    Extend Deadline
                  </a>
                  <button className="bookmark-btn">
                    <i className="flaticon-bookmark"></i>
                  </button>
                </div>

                <div
                  className="modal fade"
                  id="applyJobModal"
                  tabIndex="-1"
                  aria-hidden="true"
                >
                  {/* Modal content */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 offset-2 col-md-12 col-sm-12">
                <JobDetailsDescriptions />

                <div className="other-options">
                  <div className="social-share">
                    <h5>Share this job</h5>
                    {/* Social share buttons */}
                  </div>
                </div>

                <div className="related-jobs">
                  <div className="title-box">
                    <h3>Related Jobs</h3>
                    <div className="text">2024 jobs live - 293 added today.</div>
                  </div>
                  {/* Related jobs content */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobSingleDynamicEmployer;
