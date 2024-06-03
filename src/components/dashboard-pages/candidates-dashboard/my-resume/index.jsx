import MobileMenu from "../../../header/MobileMenu";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import Resume from "./components";
import MenuToggler from "../../MenuToggler";
import CandidateCustomHeader from "@/components/header/candidate-custom";

const index = () => {
  return (
    <div
      style={{
        backgroundColor: "#f5f7fc",
        marginTop: "100px",
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

        {/* <LoginPopup />
      {/* End Login Popup Modal */}

        <CandidateCustomHeader />

        {/* End Header */}

        <MobileMenu />
        {/* End MobileMenu */}

        {/* <DashboardCandidatesSidebar /> */}
        {/* <!-- End Candidates Sidebar Menu --> */}

        {/* <!-- Dashboard --> */}
        <section className="user-dashboard">
          <div className="dashboard-outer">
            <BreadCrumb title="" />
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
      {/* // End page-wrapper */}
    </div>
    /* end page big wrapper grey */
  );
};

export default index;
