

import ChatBox from "./components";

import { useSelector } from "react-redux";

import MobileMenu from "@/components/header/MobileMenu";
import BreadCrumb from "@/components/dashboard-pages/BreadCrumb";
import MenuToggler from "@/components/dashboard-pages/MenuToggler";
import CandidateCustomHeader from "@/components/header/candidate-custom";

const CandMessages = () => {
  const { chatSidebar } = useSelector((state) => state.toggle);
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


        <CandidateCustomHeader />
        {/* End Header */}

        <MobileMenu />
        {/* End MobileMenu */}

        {/* <!-- End User Sidebar Menu --> */}

        {/* <!-- Dashboard --> */}
        <section className="user-dashboard">
          <div className="dashboard-outer">
            <BreadCrumb title="Messages!" />
            {/* breadCrumb */}

            <MenuToggler />
            {/* Collapsible sidebar button */}

            <div className="row">
              <div
                className={`col-lg-12 ${
                  chatSidebar ? "active-chat-contacts" : ""
                }`}
              >
                <div className="chat-widget">
                  <div className="widget-content">
                    <ChatBox />
                  </div>
                </div>
                {/* <!-- Chat Widget --> */}
              </div>
            </div>
            {/* End row */}
          </div>
          {/* End dashboard-outer */}
        </section>
        {/* <!-- End Dashboard --> */}

       
        {/* <!-- End Copyright --> */}
      </div>
    </div>
  );
};

export default CandMessages;
