import MenuToggler from "@/components/dashboard-pages/MenuToggler";
import PaymentPageContent from "./paymentPageContent";
import BreadCrumb from "@/components/dashboard-pages/BreadCrumb";
import MobileMenu from "@/components/header/MobileMenu";
import DashboardEmployerHeaderCustom from "@/components/header/employer-header-custom";

const PaymentPage = () => {
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

        <DashboardEmployerHeaderCustom />
        {/* End Header */}

        <MobileMenu />
        {/* End MobileMenu */}

        {/* <!-- Dashboard --> */}
        <section className="user-dashboard">
          <div className="dashboard-outer">
            <BreadCrumb title="payment!" />
            {/* breadCrumb */}

            <MenuToggler />
            {/* Collapsible sidebar button */}

            <div className="row">
              <div className="col-lg-12">
                <div className="ls-widget">
                  <div className="tabs-box">
                    <div className="widget-title"></div>
                    {/* End widget-title */}

                    <div className="widget-content">
                      <div className="table-outer">
                        <PaymentPageContent />
                      </div>
                    </div>
                    {/* End widget-content */}
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
      </div>
    </div>
  );
};

export default PaymentPage;
