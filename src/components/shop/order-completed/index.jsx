import DashboardEmployerHeaderCustom from "@/components/header/employer-header-custom";
import LoginPopup from "../../common/form/login/LoginPopup";
import FooterDefault from "../../footer/common-footer";
import DefaulHeader from "../../header/DefaulHeader";
import MobileMenu from "../../header/MobileMenu";
import Breadcrumb from "../Breadcrumb";
import CompleteOrder from "./components";

const index = () => {
  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <DashboardEmployerHeaderCustom/>

      <MobileMenu />
      {/* End MobileMenu */}

     
      {/* <!--End Page Title--> */}

      {/* <!-- Order Confirmation --> */}
      <section className="order-confirmation">
        <div className="auto-container">
          <CompleteOrder />
        </div>
      </section>
      {/* <!-- End Order Confirmation --> */}

      
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
