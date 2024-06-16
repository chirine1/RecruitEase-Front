import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import PostJobSteps from "./components/PostJobSteps";
import PostBoxForm from "./components/PostBoxForm";
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

        
        {/* End Login Popup Modal */}

        <DashboardEmployerHeaderCustom />
        {/* End Header */}

        <MobileMenu />
        {/* End MobileMenu */}
          
        {/* <!-- End User Sidebar Menu --> */}

        {/* <!-- Dashboard --> */}
        <section className="user-dashboard">
          <div className="dashboard-outer">
            <BreadCrumb title="Post a New Job!" />
            {/* breadCrumb */}

            <MenuToggler />
            {/* Collapsible sidebar button */}

            <div className="row">
              <div className="col-lg-12">
                {/* <!-- Ls widget --> */}
                <div className="ls-widget">
                  <div className="tabs-box">
                    <div className="widget-title">
                      {/* <h4>Post Job</h4> */}
                    </div>

                    <div className="widget-content">
                      
                      {/* End job steps form */}
                      <PostBoxForm />
                      {/* End post box form */}
                    </div>
                  </div>
                </div>
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
