
import CopyrightFooter from "./CopyrightFooter";
import FooterContent from "./FooterContent";

const index = ({ footerStyle = "" }) => {
  return (
    <footer className={`main-footer ${footerStyle}`}>
      <div className="auto-container">
        {/* <!--Widgets Section--> */}
        <div className="widgets-section" data-aos="fade-up">
          <div className="row">
            <div className="big-column col-xl-4 col-lg-3 col-md-12">
              <div className="footer-column about-widget">
                <div className="logo">
                  <a href="#">
                    <img
                      
                      src="/images/logo.svg"
                      alt="brand"
                    />
                  </a>
                </div>
                <p className="phone-num">
                  <span>Call us </span>
                  <a href="RecruitEase@gmail.com">123 456 7890</a>
                </p>
                <p className="address">
                  Campus Universitaire BP 05 Mahdia - 5111 Mahdia
                   <br/>Tunisie. <br />
                  <a href="mailto:RecruitEase@gmail.com" className="email">
                   RecruitEase@gmail.com
                  </a>
                </p>
              </div>
            </div>
            {/* End footer left widget */}

            <div className="big-column col-xl-8 col-lg-9 col-md-12">
              <div className="row">
                <FooterContent />
              </div>
            </div>
            {/* End col-xl-8 */}
          </div>
        </div>
      </div>
      {/* End auto-container */}

      <CopyrightFooter />
      {/* <!--Bottom--> */}
    </footer>
    //   {/* <!-- End Main Footer --> */}
  );
};

export default index;