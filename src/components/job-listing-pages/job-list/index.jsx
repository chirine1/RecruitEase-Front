import FooterDefault from "../../footer/common-footer";
import LoginPopup from "../../common/form/login/LoginPopup";
import DefaulHeader2 from "../../header/DefaulHeader2";
import MobileMenu from "../../header/MobileMenu";
import FilterJobBox from "./FilterJobBox";
import JobSearchForm from "./JobSearchForm";
import CandidateCustomHeader from "@/components/header/candidate-custom";
import SearchBox from "../components/SearchBox";
import LocationBox from "../components/LocationBox";
import { useEffect, useState } from "react";
import axios from "@/axios/axios";

const index = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/job");
        console.log("Response from server:", response);
        setJobs(response.data);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
        toast.error("Failed to fetch jobs");
      }
    };

    fetchJobs();
  }, [title, location]);

  const findJob = async () => {
    try {
      const response = await axios.post("/job/filter", {
        job_title: title,
        country: location,
      });
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <CandidateCustomHeader />

      {/* End Header with upload cv btn */}

      <MobileMenu />
      {/* End MobileMenu */}

      <section className="page-title style-three">
        <div className="auto-container">
          <div className="job-search-form">
            <div className="row">
              <div className="form-group col-lg-4 col-md-12 col-sm-12">
                <SearchBox title={title} setTitle={setTitle} />
              </div>
              {/* <!-- Form Group --> */}

              <div className="form-group col-lg-3 col-md-12 col-sm-12 location">
                <LocationBox location={location} setLocation={setLocation} />
              </div>
              {/* <!-- Form Group --> */}

              <div className="form-group col-lg-3 col-md-12 col-sm-12 location"></div>
              {/* <!-- Form Group --> */}

              <div className="form-group col-lg-2 col-md-12 col-sm-12 text-right">
                <button type="submit" className="theme-btn btn-style-one" onClick={findJob}>
                  Find Jobs
                </button>
              </div>
              {/* <!-- Form Group --> */}
            </div>
          </div>
          {/*    <JobSelect /> */}
          {/* <!-- Job Search Form --> */}
        </div>
      </section>
      {/* <!--End Page Title--> */}

      <section className="ls-section style-three">
        <div className="auto-container">
          <div className="row">
            <div className="content-column col-lg-12">
              <div className="ls-outer">
                <FilterJobBox jobs={jobs} />
              </div>
            </div>
            {/* <!-- End Content Column --> */}
          </div>
          {/* End row */}
        </div>
        {/* End container */}
      </section>
      {/* <!--End Listing Page Section --> */}

      {/*  <FooterDefault footerStyle="alternate5" /> */}
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
