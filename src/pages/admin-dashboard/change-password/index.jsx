import MobileMenu from "@/components/header/MobileMenu";
import AdminHeader from "../header";
import MenuToggler from "@/components/dashboard-pages/MenuToggler";
import BreadCrumb from "@/components/dashboard-pages/BreadCrumb";
import FormPassAdmin from "./form";

const PassPageAdmin = () => {
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

      

      <AdminHeader/>
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

     
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Change Password!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="ls-widget">
            <div className="widget-title">
              <h4>Change Password</h4>
            </div>

            <div className="widget-content">
              <FormPassAdmin />
            </div>
          </div>
          {/* <!-- Ls widget --> */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

   
      {/* <!-- End Copyright --> */}
    </div>
    </div>
  );
};

export default PassPageAdmin;
