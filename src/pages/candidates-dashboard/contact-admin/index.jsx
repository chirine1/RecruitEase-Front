import MobileMenu from "@/components/header/MobileMenu";
import Address from "@/components/pages-menu/contact/Address";
import ContactForm from "@/components/pages-menu/contact/ContactForm";
import MapBox from "@/components/pages-menu/contact/MapBox";
import CandidateCustomHeader from "@/components/header/candidate-custom";
const ContactPageCand = () => {
  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

  

      <CandidateCustomHeader/>
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      <section className="map-section">
        <div className="map-outer">
          <MapBox />
        </div>
      </section>
      {/* <!-- End Map Section --> */}

      <section className="contact-section">
        <div className="auto-container">
          <div className="upper-box">
            <div className="row">
              <Address />
            </div>
            {/* End .row */}
          </div>
          {/* End upperbox */}

          {/* <!-- Contact Form --> */}
          <div className="contact-form default-form">
            <h3>Leave A Message</h3>
            <ContactForm />
            {/* <!--Contact Form--> */}
          </div>
          {/* <!--End Contact Form --> */}
        </div>
      </section>
      {/* <!-- Contact Section --> */}

    
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default ContactPageCand;
