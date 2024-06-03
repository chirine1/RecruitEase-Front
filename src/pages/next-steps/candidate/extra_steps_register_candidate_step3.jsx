/* import MobileMenu from "../../../header/MobileMenu";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import Resume from "./components";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
import MenuToggler from "../../MenuToggler"; */

import BreadCrumb from "@/components/dashboard-pages/BreadCrumb";
import MenuToggler from "@/components/dashboard-pages/MenuToggler";
import DashboardCandidatesHeader from "@/components/header/DashboardCandidatesHeader";
import MobileMenu from "@/components/header/MobileMenu";
import Resume from "@/components/dashboard-pages/candidates-dashboard/my-resume/components";
import CopyrightFooter from "@/components/dashboard-pages/CopyrightFooter";
import HeaderEmpty from "../header-empty";

const Extra_candidate_step3 = () => {
  return (
    <div
      style={{
        backgroundColor: "#f5f7fc",
        marginTop: "125px",
      }}
    >
      <div
        /* className="page-wrapper dashboard" */ style={{
          marginLeft: "200px",
          marginRight: "200px",
        }}
      >
        <span className="header-span"></span>
        {/* <!-- Header Span for hight --> */}

        {/* <LoginPopup /> */}
        {/* End Login Popup Modal */}

        <HeaderEmpty/>
        {/* End Header */}

        <MobileMenu />
        {/* End MobileMenu */}

        {/* <DashboardCandidatesSidebar /> */}
        {/* <!-- End Candidates Sidebar Menu --> */}

        {/* <!-- Dashboard --> */}
        <section className="user-dashboard">
          <div className="dashboard-outer">
            <BreadCrumb title="Step 3/3: please finish up you resume!" />
            {/* breadCrumb */}

            <MenuToggler />
            {/* Collapsible sidebar button */}

            <div className="row">
              <div className="col-lg-12">
                <div className="ls-widget">
                  <div className="tabs-box">
                    <div className="widget-title">
                      <h4>My Resume</h4>
                    </div>
                    {/* End widget-title */}

                    <div className="widget-content">
                      <Resume />
                    </div>
                    {/* End widget-content */}
                  </div>
                </div>
                {/* End ls-widget */}
              </div>
            </div>
            {/* End .row */}
          </div>
          {/* End dashboard-outer */}
        </section>
        {/* <!-- End Dashboard --> */}

        <CopyrightFooter />
        {/* <!-- End Copyright --> */}
      </div>
    </div>
  );
};

export default Extra_candidate_step3;
