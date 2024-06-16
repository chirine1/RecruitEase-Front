import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "@/axios/axios";
import { toast } from "react-toastify";

const FilterJobBox = ({jobs}) => {
 
  const [sort, setSort] = useState("");
  const [perPage, setPerPage] = useState({ start: 0, end: 0 });



  const sortHandler = (e) => {
    setSort(e.target.value);
  };

  const perPageHandler = (e) => {
    const pageData = JSON.parse(e.target.value);
    setPerPage(pageData);
  };

  const clearAll = () => {
    setSort("");
    setPerPage({ start: 0, end: 0 });
  };

  const sortedJobs = [...jobs].sort((a, b) => {
    if (sort === "asc") {
      return new Date(a.created_at) - new Date(b.created_at);
    } else if (sort === "des") {
      return new Date(b.created_at) - new Date(a.created_at);
    } else {
      return 0;
    }
  });

  const paginatedJobs = sortedJobs.slice(perPage.start, perPage.end || 32);

  return (
    <>
      <div className="ls-switcher">
        <div className="showing-result">
          <div className="text">
            <strong>{paginatedJobs.length}</strong> jobs
          </div>
        </div>

        {/* <div className="sort-by">
          {(sort !== "" || perPage.start !== 0 || perPage.end !== 0) && (
            <button
              onClick={clearAll}
              className="btn btn-danger text-nowrap me-2"
              style={{ minHeight: "45px", marginBottom: "15px" }}
            >
              Clear All
            </button>
          )}

          <select
            value={sort}
            className="chosen-single form-select"
            onChange={sortHandler}
          >
            <option value="">Sort by (default)</option>
            <option value="asc">Newest</option>
            <option value="des">Oldest</option>
          </select>

          <select
            onChange={perPageHandler}
            className="chosen-single form-select ms-3"
            value={JSON.stringify(perPage)}
          >
            <option value={JSON.stringify({ start: 0, end: 0 })}>All</option>
            <option value={JSON.stringify({ start: 0, end: 35 })}>
              35 per page
            </option>
            <option value={JSON.stringify({ start: 0, end: 40 })}>
              40 per page
            </option>
          </select>
        </div> */}
      </div>

      <div className="row">
        {paginatedJobs.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
      </div>
    </>
  );
};

const JobCard = ({ job }) => {
  return (
    <div className="job-block-four col-xl-3 col-lg-4 col-md-6 col-sm-12">
      <div className="inner-box">
       {/*  <ul className="job-other-info">
          {job.map((val, i) => (
            <li key={i} className={val.styleClass}>
              {val.type}
            </li>
          ))}
        </ul> */}
        <span className="company-logo">
          <img src={"/images/job.png"} alt="featured job" />
        </span>
        <span className="company-name">{job.company.company_name}</span>
        <h4>
          <Link to={`${job.id}`}>{job.title}</Link>
        </h4>
        <div className="location">
          <span className="icon flaticon-map-locator"></span>
          {job?.company?.contact_info?.country?.label || ""}
        </div>
      </div>
    </div>
  );
};

export default FilterJobBox;