import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
const HeaderEmpty = () => {
  const { pathname } = useLocation();
  const [navbar, setNavbar] = useState(true);

  const changeBackground = () => {
    if (window.scrollY >= 0) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  });

  return (
    // <!-- Main Header-->
    <header
      className={`main-header header-shaddow  ${navbar ? "fixed-header " : ""}`}
    >
      <div className="container-fluid">
        {/* <!-- Main box --> */}
        <div className="main-box">
          {/* <!--Nav Outer --> */}
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <img alt="brand" src="/images/logo.svg" />
              </div>
            </div>
            {/* End .logo-box */}

            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}

          {/* End outer-box */}
        </div>
      </div>
    </header>
  );
};

export default HeaderEmpty;
