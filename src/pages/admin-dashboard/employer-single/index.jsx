import React, { useState, useEffect } from "react";
import axios from "@/axios/axios";
import { useParams } from "react-router-dom";

import MobileMenu from "@/components/header/MobileMenu";
import JobDetailsDescriptions from "@/components/employer-single-pages/shared-components/JobDetailsDescriptions";
import RelatedJobs from "@/components/employer-single-pages/related-jobs/RelatedJobs";

import Contact from "@/components/job-single-pages/shared-components/Contact";
import MetaComponent from "@/components/common/MetaComponent";
import CandidateCustomHeader from "@/components/header/candidate-custom";
import AdminHeader from "../header";

const metadata = {
  title: "Employers Single Dynamic || RecruitEase - Job Board",
  description: "RecruitEase - Job Board",
};

const EmployersSingleAdmin = () => {
  const { id } = useParams();
  const [employer, setEmployer] = useState(null);

  useEffect(() => {
    axios
      .get(`/company/${id}`)
      .then((response) => {
        setEmployer(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the employer data!", error);
      });
  }, [id]);

  if (!employer) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MetaComponent meta={metadata} />
      <span className="header-span"></span>
      <AdminHeader />
      <MobileMenu />
      <section className="job-detail-section">
        <div className="upper-box">
          <div className="auto-container">
            <div className="job-block-seven style-three">
              <div className="inner-box">
                <div className="content">
                  <span className="company-logo">
                    <img
                      src={
                        employer?.img
                          ? `http://localhost:8000/static/images/${employer.img}`
                          : "/images/avatar.webp"
                      }
                      alt="logo"
                    />
                  </span>
                  <h4>{employer.company_name}</h4>
                  <ul className="job-other-info">
                    {/* <li className="time">Open Jobs – {employer.jobNumber}</li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="job-detail-outer reverse">
          <div className="auto-container">
            <div className="row">
              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar pd-right">
                  <div className="sidebar-widget company-widget">
                    <div className="widget-content">
                      <ul className="company-info mt-0">
                        <li>
                          Company size: <span>{employer.team_size}</span>
                        </li>
                        <li>
                          Founded in: <span>{employer.establishment_year}</span>
                        </li>
                        <li>
                          Phone: <span>{employer.contact_info.phone}</span>
                        </li>
                        <li>
                          Email: <span>{employer.contact_email}</span>
                        </li>
                        <li>
                          Location:{" "}
                          <span>{employer.contact_info.complete_address}</span>
                        </li>
                      </ul>
                     {/*  <div className="btn-box">
                        <a
                          href={`https://www.${employer.company_name}.com`}
                          className="theme-btn btn-style-three"
                          style={{ textTransform: "lowercase" }}
                        >
                          www.{employer.company_name}.com
                        </a>
                      </div> */}
                    </div>
                  </div>

                  <div className="sidebar-widget contact-widget mb-0">
                    <h4 className="widget-title">Contact Us</h4>
                    <div className="default-form">
                      <Contact id={id}/>
                    </div>
                  </div>
                </aside>
              </div>

              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <JobDetailsDescriptions description={employer.description}/>
               {/*  <div className="related-jobs">
                  <div className="title-box">
                    <h3>Other jobs available</h3>
                    <div className="text"></div>
                  </div>
                  <RelatedJobs id={id} />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EmployersSingleAdmin;
