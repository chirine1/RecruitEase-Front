import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import TopCardBlock from "./components/TopCardBlock";
import ProfileChart from "./components/ProfileChart";
import Notification from "./components/Notification";
import Applicants from "./components/Applicants";
import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";
import DashboardEmployerHeaderCustom from "@/components/header/employer-header-custom";

const Index = () => {
  return (
    <div
    className="page-wrapper"
    style={{
      backgroundColor: "#f5f7fc",
      marginTop: "100px",
      minHeight: "calc(100vh - 100px)",
      overflowY: "auto",
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

        <LoginPopup />
        {/* End Login Popup Modal */}

        <DashboardEmployerHeaderCustom />
        {/* End Header */}

        <MobileMenu />
        {/* End MobileMenu */}

        {/* <!-- End User Sidebar Menu --> */}

        {/* <!-- Dashboard --> */}
        <section className="user-dashboard">
          <div className="dashboard-outer">
            <BreadCrumb title="Dashboard Home!" />
            {/* breadCrumb */}

            <MenuToggler />
            {/* Collapsible sidebar button */}

            <div className="row">
              <TopCardBlock />
            </div>
            {/* End .row top card block */}

            <div className="row">
              <div className="col-xl-7 col-lg-12">
                {/* <!-- Graph widget --> */}
                <div className="graph-widget ls-widget">
                  <ProfileChart />
                </div>
                {/* End profile chart */}
              </div>
              {/* End .col */}

              <div className="col-xl-5 col-lg-12">
                {/* <!-- Notification Widget --> */}
                <div className="notification-widget ls-widget">
                  <div className="widget-title">
                    <h4>Notifications</h4>
                  </div>
                  <div className="widget-content">
                    <Notification />
                  </div>
                </div>
              </div>
              {/* End .col */}

              <div className="col-lg-12">
                {/* <!-- applicants Widget --> */}
                <div className="applicants-widget ls-widget">
                  <div className="widget-title">
                    <h4>Recent Applicants</h4>
                  </div>
                  <div className="widget-content">
                    <div className="row">
                      {/* <!-- Candidate block three --> */}

                      <Applicants />
                    </div>
                  </div>
                </div>
              </div>
              {/* End .col */}
            </div>
            {/* End .row profile and notificatins */}
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

export default Index;
