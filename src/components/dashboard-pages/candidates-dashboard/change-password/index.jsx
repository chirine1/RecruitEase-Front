import MobileMenu from "../../../header/MobileMenu";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardCandidatesSidebar from "../../../header/DashboardCandidatesSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import Form from "./components/Form";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
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
            <BreadCrumb title="Change Password!" />
            {/* breadCrumb */}

            <MenuToggler />
            {/* Collapsible sidebar button */}

            <div className="ls-widget">
              <div className="widget-title">
                <h4>Change Password</h4>
              </div>

              <div className="widget-content">
                <Form />
              </div>
            </div>
            {/* <!-- Ls widget --> */}
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

export default index;
