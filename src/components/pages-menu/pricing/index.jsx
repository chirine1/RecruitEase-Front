import DashboardEmployerHeaderCustom from "@/components/header/employer-header-custom";
import Breadcrumb from "../../common/Breadcrumb";

import MobileMenu from "../../header/MobileMenu";
import Pricing from "../../pricing/Pricing";

const index = () => {
  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

   

      <DashboardEmployerHeaderCustom/>
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      <Breadcrumb title="Pricing" meta="Pricing" />
      {/* <!--End Page Title--> */}

      <section className="pricing-section">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Pricing Packages</h2>
            
          </div>
          {/* End title */}
          <Pricing />
          {/* End .{/* <!--Pricing Tabs--> */}
        </div>
      </section>
      {/* <!-- End Pricing Section --> */}

      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
