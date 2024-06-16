import MobileMenu from "../../../header/MobileMenu";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import WidgetContentBox from "./components/WidgetContentBox";
import WidgetTopFilterBox from "./components/WidgetTopFilterBox";
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


      <DashboardEmployerHeaderCustom/>
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="All Applicants!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    
                  </div>
                  {/* End top widget filter bar */}

                  <WidgetContentBox />
                  {/* End widget-content */}
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
