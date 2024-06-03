import MobileMenu from "@/components/header/MobileMenu";
import AdminHeader from "../../header";
import MenuToggler from "@/components/dashboard-pages/MenuToggler";
import BreadCrumb from "@/components/dashboard-pages/BreadCrumb";
import AdminSidebar from "@/components/header/AdminSidebar";

import RecruitersTable from "./list";

const ManageRecruiters = () => {
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <AdminHeader />

      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <AdminSidebar />
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Manage Candidates" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  
                  <RecruitersTable />
                </div>
              </div>
              {/* <!-- Ls widget --> */}

              {/* <!-- Ls widget --> */}

              {/* <!-- Ls widget --> */}
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default ManageRecruiters;
