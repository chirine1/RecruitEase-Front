import React, { useState, useEffect } from "react";
import axios, { axiosPrivate } from "@/axios/axios";
import { Link } from "react-router-dom";

const RelatedJobs = ({ id }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axiosPrivate
      .post(`/job/bycompany`, { id: id })
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the jobs data!", error);
      });
  }, [id]);

  if (jobs.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {jobs.map((item) => (
        <div className="job-block" key={item.id}>
          <div className="inner-box">
            <div className="content">
              <span className="company-logo">
                <img
                  src={
                    item?.company?.img
                      ? `http://localhost:8000/static/images/${item?.company?.img}`
                      : "/images/avatar.webp"
                  }
                  alt="resource"
                />
              </span>
              <h4>
                <Link to={`/candidates-dashboard/find-jobs/${item.id}`}>
                  {item.title}
                </Link>
              </h4>

              <ul className="job-info">
                <li>
                  <span className="icon flaticon-briefcase"></span>
                  {item.company.company_name}
                </li>
                <li>
                  <span className="icon flaticon-map-locator"></span>
                  {item.location}
                </li>
                <li>
                  <span className="icon flaticon-clock-3"></span>
                  {item.time}
                </li>
                <li>
                  <span className="icon flaticon-money"></span>
                  {item.salary}
                </li>
              </ul>

              <button className="bookmark-btn">
                <span className="flaticon-bookmark"></span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default RelatedJobs;
