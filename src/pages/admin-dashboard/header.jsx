import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { isActiveLink } from "../../utils/linkActiveChecker";
import { useLocation } from "react-router-dom";



import HeaderNavContentAdmin from "./header-nav-content";
import { logoutUser } from "@/components/logout";

const AdminHeader = () => {
  const { pathname } = useLocation();
  const [navbar, setNavbar] = useState(true);
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
                <Link to="/">
                  <img alt="brand" src="/images/logo.svg" />
                </Link>
              </div>
            </div>
            {/* End .logo-box */}

            <HeaderNavContentAdmin />
            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}

          <div className="outer-box">
            <button className="menu-btn">
             {/*  <span className="count">1</span> */}
              <span className="icon flaticon-envelope"></span>
            </button>
            {/* wishlisted menu */}

            <button className="menu-btn">
              <span className="icon la la-bell"></span>
            </button>
            {/* End notification-icon */}

            {/* <!-- Dashboard Option --> */}
            <div className="dropdown dashboard-option">
              <a
                className="dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  alt="avatar"
                  className="thumb"
                  src="/src/images/face.jpg"
                />
                <span className="name">My Account</span>
              </a>

              <ul className="dropdown-menu">
                <li className="mb-1">
                  <Link
                    to="/admins-dashboard/change-password"
                    className="dropdown-item"
                  >
                    <i className=""></i> Manage Account
                  </Link>
                </li>
                <li className="mb-1">
                  <Link to="#" onClick={handleLogout} className="dropdown-item">
                    <i className="la la-sign-out"></i> Logout
                  </Link>
                </li>
              </ul>
            </div>
            {/* End dropdown */}
          </div>
          {/* End outer-box */}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
