import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import ChatBox from "./components";
import MenuToggler from "../../MenuToggler";
import { useSelector } from "react-redux";
import DashboardEmployerHeaderCustom from "@/components/header/employer-header-custom";

const Index = () => {
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

        <CopyrightFooter />
        {/* <!-- End Copyright --> */}
      </div>
    </div>
  );
};

export default Index;
