import MobileMenu from "../../../header/MobileMenu";
import BreadCrumb from "../../BreadCrumb";
import MyProfile from "./components/my-profile";
import SocialNetworkBox from "./components/SocialNetworkBox";
import ContactInfoBox from "./components/ContactInfoBox";
import CopyrightFooter from "../../CopyrightFooter";
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

        <CandidateCustomHeader />
        {/* End Header */}

        <MobileMenu />
        {/* End MobileMenu */}

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
                      <h4>My Profile</h4>
                    </div>
                    <MyProfile />
                  </div>
                </div>
                {/* <!-- Ls widget --> */}

               
                {/* <!-- Ls widget --> */}

               {/*  <div className="ls-widget">
                  <div className="tabs-box">
                    <div className="widget-title">
                      <h4>Contact Information</h4>
                    </div>
                    {/* End widget-title 
                    <div className="widget-content">
                      {/* <ContactInfoBox /> 
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
