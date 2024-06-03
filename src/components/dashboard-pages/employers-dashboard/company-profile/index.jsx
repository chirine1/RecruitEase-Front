import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import MyProfile from "./components/my-profile";
import SocialNetworkBox from "./components/SocialNetworkBox";
import ContactInfoBox from "./components/ContactInfoBox";
import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";
import DashboardEmployerHeaderCustom from "@/components/header/employer-header-custom";

const index = () => {
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
                    <BreadCrumb title="Company Profile!" />
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

                            {/* <div className="ls-widget">
                                <div className="tabs-box">
                                    <div className="widget-title">
                                        <h4>Social Network</h4>
                                    </div>
                                    
                                    <div className="widget-content">
                                        <SocialNetworkBox />
                                    </div>
                                </div>
                            </div> */}
                            {/* <!-- Ls widget --> */}

                           {/*  <div className="ls-widget">
                                <div className="tabs-box">
                                    <div className="widget-title">
                                        <h4>Contact Information</h4>
                                    </div>
                                    

                                    <div className="widget-content">
                                     
                                    </div>
                                </div>
                            </div> */}
                            {/* <!-- Ls widget --> */}
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

export default index;
