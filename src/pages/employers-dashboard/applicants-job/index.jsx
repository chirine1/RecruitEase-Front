
import BreadCrumb from "@/components/dashboard-pages/BreadCrumb";
import MenuToggler from "@/components/dashboard-pages/MenuToggler";
import MobileMenu from "@/components/header/MobileMenu";
import DashboardEmployerHeaderCustom from "@/components/header/employer-header-custom";
import ApplicantManagementTable from "./table";

const ApplicantsPage = () => {
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

      <DashboardEmployerHeaderCustom/>
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <ApplicantManagementTable />
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      {/* <!-- End Copyright --> */}
    </div>
    </div>
  );
};

export default ApplicantsPage;
