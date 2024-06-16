import Hero17 from "../hero";
import Footer from "./Footer";
import Header from "./Header";
import Partner2 from "../common/partner/Partner2";
import JobCategorie6 from "../job-categories/JobCategorie6";
import About6 from "../about/About6";
import About7 from "../about/About7";
import About8 from "../about/About8";
import Blog4 from "../../components/blog/Blog4";
import JobFeatured8 from "../job-featured/JobFeatured8";
import CallToAction11 from "../call-to-action/CallToAction11";
import Pricing3 from "../pricing/Pricing3";
import Funfact from "../fun-fact-counter/Funfact";
import MobileMenu from "../header/MobileMenu";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <>
      {/* <LoginPopup /> */}
      {/* End Login Popup Modal */}

      <Header />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      <Hero17 />
      {/* End Hero Section */}

      <section className="clients-section-two layout-pt-40 layout-pb-60">
        <div className="auto-container">
          <div className="sponsors-outer wow fadeInUp">
            <div className="sponsors-carousel">
              <Partner2 />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End Clients Section--> */}

 
      {/* <!-- End Job Categories --> */}

     {/*  <About6 /> */}
      {/* <!-- End About Section -->  */}

 {/*      <About7 /> */}
      {/* <!-- End About Section -->  */}

   {/*    <About8 /> */}
      {/* <!-- End About Section -->  */}

     
      {/* <!-- End Job Section --> */}

  
      {/* <!-- End Section --> */}

     
      {/* <!-- End Pricing Section --> */}

     
      {/* <!-- End News Section --> */}

      {/* <CallToAction11 /> */}
      {/* <!-- End CallToAction Section --> */}

      <Footer />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
