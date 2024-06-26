
import MobileMenu from "@/components/header/MobileMenu";
import AdminHeader from "@/pages/admin-dashboard/header";
import BreadCrumb from "../BreadCrumb";
import MenuToggler from "../MenuToggler";
import TopCardBlock from "./components/TopCardBlock";
import ProfileChart from "./components/ProfileChart";
import Notification from "./components/Notification";
import JobPostingsChart from "./components/jobpostchart";


const Index = () => {
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

        {/* <LoginPopup /> */}
        {/* End Login Popup Modal */}

        <AdminHeader/>
        {/* End Header */}

        <MobileMenu />
        {/* End MobileMenu */}

        {/* <DashboardCandidatesSidebar /> */}
        {/* <!-- End Candidates Sidebar Menu --> */}

        {/* <!-- Dashboard --> */}
        <section className="user-dashboard">
          <div className="dashboard-outer">
            <BreadCrumb title="Howdy, Admin!!" />
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


            
            </div>
            {/* End .row profile and notificatins */}
             {/* <!-- Graph widget --> */}
             <div className="graph-widget ls-widget">
                  <JobPostingsChart/>
                </div>
          </div>
          {/* End dashboard-outer */}
        </section>
        {/* <!-- End Dashboard --> */}

      
        {/* <!-- End Copyright --> */}
      </div>
    </div>
  );
};

export default Index;
