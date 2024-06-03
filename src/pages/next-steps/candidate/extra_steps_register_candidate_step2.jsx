import BreadCrumb from "@/components/dashboard-pages/BreadCrumb";
import CopyrightFooter from "@/components/dashboard-pages/CopyrightFooter";
import MenuToggler from "@/components/dashboard-pages/MenuToggler";
import ContactInfoBox from "@/components/dashboard-pages/candidates-dashboard/my-profile/components/ContactInfoBox";
import SocialNetworkBox from "@/components/dashboard-pages/candidates-dashboard/my-profile/components/SocialNetworkBox";
import DashboardCandidatesHeader from "@/components/header/DashboardCandidatesHeader";
import MobileMenu from "@/components/header/MobileMenu";
import MyProfile from "@/components/dashboard-pages/candidates-dashboard/my-profile/components/my-profile";
import HeaderEmpty from "../header-empty";

const Extra_candidate_step2 = () => {
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

        <HeaderEmpty></HeaderEmpty>
        {/* End Header */}

        <MobileMenu />
        {/* End MobileMenu */}

        {/* <DashboardCandidatesSidebar /> */}
        {/* <!-- End Candidates Sidebar Menu --> */}

        {/* <!-- Dashboard --> */}
        <section className="user-dashboard">
          <div className="dashboard-outer" style={{}}>
            <BreadCrumb title="Step 2/3: please finish setting up your profile" />
            {/* breadCrumb */}

            <MenuToggler />
            {/* Collapsible sidebar button */}

            <div className="row">
              <div className="col-lg-12">
                <div className="ls-widget">
                  <div className="tabs-box">
                    <div className="widget-title">
                      <h4>My Profile</h4>
                    </div>
                    <MyProfile />
                  </div>
                </div>
                {/* <!-- Ls widget --> */}

                <div className="ls-widget">
                  <div className="tabs-box">
                    <div className="widget-title">
                      <h4>Social Network</h4>
                    </div>
                    {/* End widget-title */}

                    <div className="widget-content">
                      <SocialNetworkBox />
                    </div>
                  </div>
                </div>
                {/* <!-- Ls widget --> */}

                <div className="ls-widget">
                  <div className="tabs-box">
                    <div className="widget-title">
                      <h4>Contact Information</h4>
                    </div>
                    {/* End widget-title */}
                    <div className="widget-content">
                      <ContactInfoBox />
                    </div>
                  </div>
                </div>
                {/* <!-- Ls widget --> */}
              </div>
            </div>
            {/* End .row */}
          </div>
          {/* End dashboard-outer */}
        </section>
        {/* <!-- End Dashboard --> */}
        
        {/* 
        <CopyrightFooter /> */}

        {/* <!-- End Copyright --> */}
      </div>
      // End page-wrapper
    </div>
  );
};

export default Extra_candidate_step2;
