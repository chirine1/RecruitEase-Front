import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import LoginWithSocial from "./LoginWithSocial";
import FormContent2 from "./FormContent2";
import FormContentCandidate from "./FormContentCandidate";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "@/axios/axios";

const Register2 = () => {
  const [registerError, setRegisterError] = useState(""); // New state for registration error message

  return (
    <div className="form-inner">
      <h3>Create a Free RecruitEase Account</h3>

      <Tabs>
        <div className="form-group register-dual">
          <TabList className="btn-box row">
            <Tab className="col-lg-6 col-md-12">
              <button className="theme-btn btn-style-four">
                <i className="la la-user"></i> Candidate
              </button>
            </Tab>

            <Tab className="col-lg-6 col-md-12">
              <button className="theme-btn btn-style-four">
                <i className="la la-briefcase"></i> Recruiter
              </button>
            </Tab>
          </TabList>
        </div>
        {/* End .form-group */}

        <TabPanel>
          <FormContentCandidate />
        </TabPanel>
        {/* End cadidates Form */}

        <TabPanel>
          <FormContent2 />
        </TabPanel>
        {/* End Employer Form */}
      </Tabs>
      {/* End form-group */}

      <div className="bottom-box">
        <div className="text">
          Already have an account?{" "}
          <Link to="/login" className="call-modal login">
            LogIn
          </Link>
        </div>
      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default Register2;
