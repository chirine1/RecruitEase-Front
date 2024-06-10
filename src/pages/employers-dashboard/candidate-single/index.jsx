import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useParams } from "react-router-dom";
import axios from "@/axios/axios";
import MetaComponent from "@/components/common/MetaComponent";
import DashboardEmployerHeaderCustom from "@/components/header/employer-header-custom";
import MobileMenu from "@/components/header/MobileMenu";
import { useEffect, useState } from "react";

const metadata = {
  title: "Candidate Single Dynamic  ||  RecruitEase - Job Board",
  description: "RecruitEase - Job Board",
};

const CandidateSingleDynamicEmployer = () => {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const contentRef = useRef();

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await axios.get(`/candidate/${id}`);
        setCandidate(response.data);
      } catch (error) {
        console.error("Failed to fetch candidate data", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [id]);

  const handleDownloadPDF = async () => {
    const element = contentRef.current;
    
    // Calculate the height and width of the content
    const { clientWidth, clientHeight } = element;
  
    // Create a canvas with the same size as the content
    const canvas = await html2canvas(element, {
      width: clientWidth,
      height: clientHeight,
    });
  
    const data = canvas.toDataURL('image/png');
  
    // Define the standard PDF dimensions (A4 in pixels at 72 DPI)
    const pdfWidth = 600.28;
    const pdfHeight = 1100.89;
  
    // Calculate aspect ratio of the content
    const aspectRatio = clientWidth / clientHeight;
  
    // Calculate new dimensions to fit the PDF page while maintaining aspect ratio
    let newWidth, newHeight;
    if (aspectRatio > 1) {
      newWidth = pdfWidth;
      newHeight = pdfWidth / aspectRatio;
    } else {
      newHeight = pdfHeight;
      newWidth = pdfHeight * aspectRatio;
    }
  
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt', // Use points for units (1 pt = 1/72 inch)
      format: 'a4', // Use A4 format
    });
  
    // Calculate xOffset to center the image horizontally, yOffset set to 0 for no top margin
    const xOffset = (pdfWidth - newWidth) / 2;
    const yOffset = 0; // Set top margin to 0
  
    pdf.addImage(data, 'PNG', xOffset, yOffset, newWidth, newHeight);
    pdf.save('candidate-detail.pdf');
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading candidate data</div>;

  return (
    <>
      <MetaComponent meta={metadata} />
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <DashboardEmployerHeaderCustom />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      <section className="candidate-detail-section" ref={contentRef}>
        <div className="upper-box">
          <div className="auto-container">
            <div className="candidate-block-five">
              <div className="inner-box">
                <div className="content">
                  <figure className="image">
                    <img
                      src={
                        candidate?.img
                          ? `http://localhost:8000/static/images/${candidate.img}`
                          : "/images/avatar.webp"
                      }
                      alt="avatar"
                    />
                  </figure>
                  <h4 className="name">{candidate?.fullname}</h4>

                  <ul className="candidate-info">
                    <li className="designation">{candidate?.job_title}</li>
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {candidate?.contact_info?.country?.label || ""}
                    </li>
                  </ul>
                </div>

                <div className="btn-box">
                  <button
                    onClick={handleDownloadPDF}
                    className="theme-btn btn-style-one"
                  >
                    Download CV
                  </button>
                </div>
              </div>
            </div>
            {/*  <!-- Candidate block Five --> */}
          </div>
        </div>
        {/* <!-- Upper Box --> */}

        <div className="candidate-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="job-detail">
                  <div className="video-outer">
                    <h4>Candidates About</h4>
                  </div>
                  {/* <!-- About Video Box --> */}
                  <p>{candidate?.description || ""}</p>
                  <p></p>

                  {/* <!-- Portfolio --> */}
                  <div className="portfolio-outer">
                    <div className="row"></div>
                  </div>

                  {/* <!-- Candidate Resume Start --> */}
                  <div className={`resume-outer `}>
                    <div className="upper-title">
                      <h4>Education</h4>
                    </div>

                    {/* <!-- Start Resume Block --> */}
                    {candidate?.resume?.educations.map((education) => (
                      <div className="resume-block" key={education.id}>
                        <div className="inner">
                          <span className="name">{}</span>
                          <div className="title-box">
                            <div className="info-box">
                              <h3>{education.degree}</h3>
                              <span>{education.institution}</span>
                            </div>
                            <div className="edit-box">
                              <span className="year">{education.end_year}</span>
                            </div>
                          </div>
                          <div className="text">{education.field_of_study}</div>
                        </div>
                      </div>
                    ))}
                    {/* <!-- End Resume Block --> */}
                  </div>

                  <div className={`resume-outer theme-blue`}>
                    <div className="upper-title">
                      <h4>Work & Experience</h4>
                    </div>

                    {/* <!-- Start Resume Block --> */}
                    {candidate?.resume?.experiences.map((experience) => (
                      <div className="resume-block" key={experience.id}>
                        <div className="inner">
                          <span className="name">{}</span>
                          <div className="title-box">
                            <div className="info-box">
                              <h3>{experience?.job_title}</h3>
                              <span>{experience?.company_name}</span>
                            </div>
                            <div className="edit-box">
                              <span className="year">
                                {experience?.end_year}
                              </span>
                            </div>
                          </div>
                          <div className="text">
                            {experience?.job_description}
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* <!-- End Resume Block --> */}
                  </div>

                  <div className={`resume-outer theme-yellow`}>
                    <div className="upper-title">
                      <h4>Awards</h4>
                    </div>

                    {/* <!-- Start Resume Block --> */}
                    {candidate?.resume?.awards.map((award) => (
                      <div className="resume-block" key={award.id}>
                        <div className="inner">
                          <span className="name">{}</span>
                          <div className="title-box">
                            <div className="info-box">
                              <h3>{award.label}</h3>
                              <span>{award.awarded_by}</span>
                            </div>
                            <div className="edit-box">
                              <span className="year">{award.award_year}</span>
                            </div>
                          </div>
                          <div className="text">{award.text}</div>
                        </div>
                      </div>
                    ))}
                    {/* <!-- End Resume Block --> */}
                  </div>
                  {/* <!-- Candidate Resume End --> */}

                  {/* <!-- Candidate Resume End --> */}
                </div>
              </div>
              {/* End .content-column */}

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget">
                    <div className="widget-content">
                      <ul className="job-overview">
                        <li>
                          <i className="icon icon-expiry"></i>
                          <h5>Age:</h5>
                          <span>{candidate?.age || 18}</span>
                        </li>

                        <li>
                          <i className="icon icon-rate"></i>
                          <h5>Current Salary:</h5>
                          <span>{candidate?.current_salary}K </span>
                        </li>

                        <li>
                          <i className="icon icon-salary"></i>
                          <h5>Expected Salary:</h5>
                          <span>{candidate?.expected_salary || ""}K </span>
                        </li>

                        <li>
                          <i className="icon icon-user-2"></i>
                          <h5>Gender:</h5>
                          <span>{candidate?.gender || ""}</span>
                        </li>

                        <ul className="job-overview">
                          <li>
                            <i className="icon icon-language"></i>
                            <h5>Languages:</h5>
                            {candidate?.resume?.languages?.length ? (
                              <span>
                                {candidate.resume.languages.map(
                                  (language, index) => (
                                    <span key={index}>
                                      {language.label}
                                      {index <
                                        candidate.resume.languages.length - 1 &&
                                        ", "}
                                    </span>
                                  )
                                )}
                              </span>
                            ) : (
                              <span>No languages specified</span>
                            )}
                          </li>
                        </ul>
                        <li>
                          <i className="icon icon-degree"></i>
                          <h5>Education Level:</h5>
                          <span>{candidate?.education_level}</span>
                        </li>
                        <li>
                          <i className="icon icon-degree"></i>
                          <h5>Career Level:</h5>
                          <span>{candidate?.career_level}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* End .sidebar-widget candidate overview */}

                  <div className="sidebar-widget">
                    <h4 className="widget-title">Professional Skills</h4>
                    <div className="widget-content">
                      <ul className="job-skills">
                        {candidate?.resume?.skills.map((skill, i) => (
                          <li key={i}>
                            <a href="#">{skill.label}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* End .sidebar-widget skill widget */}
                </aside>
                {/* End .sidebar */}
              </div>
              {/* End .sidebar-column */}
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

export default CandidateSingleDynamicEmployer;
