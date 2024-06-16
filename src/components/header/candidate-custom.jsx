import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderNavContentCandidate from "./HeaderNavContentCandidate";
import { useLocation } from "react-router-dom";
import axios, { axiosPrivate } from "@/axios/axios";
import { logoutUser } from "../logout";

const DashboardCandidatesHeader = () => {
  const { pathname } = useLocation();
  const [navbar, setNavbar] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // State to store user data

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const popupStyles = {
    position: "absolute",
    top: "50px",
    right: "0",
    width: "300px",
    maxHeight: "400px",
    backgroundColor: "white",
    border: "1px solid #ccc",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    zIndex: 1000,
  };

  const headerStyles = {
    padding: "10px",
    backgroundColor: "#f0f0f0",
    borderBottom: "1px solid #ccc",
    fontWeight: "bold",
  };

  const listStyles = {
    maxHeight: "350px",
    overflowY: "auto",
  };

  const itemStyles = {
    padding: "10px",
    borderBottom: "1px solid #ccc",
  };

  const dateStyles = {
    fontSize: "12px",
    color: "#888",
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const changeBackground = () => {
    if (window.scrollY >= 0) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosPrivate.get("/notif/current");
        setNotifications(response.data);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axiosPrivate.get("/auth/current");
        setUser(response.data);
        console.log(user);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

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

            <HeaderNavContentCandidate />
            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}

          <div className="outer-box">
            <Link to={"/candidates-dashboard/messages"}>
              <button className="menu-btn">
                <span className="icon la la-envelope"></span>
              </button>
            </Link>

            {/* Notifications button */}
            <button className="menu-btn" onClick={toggleNotifications}>
              <span className="icon la la-bell"></span>
            </button>
            {showNotifications && (
              <div style={popupStyles}>
                <div style={headerStyles}>Notifications</div>
                <div style={listStyles}>
                  {notifications.map((notification) => (
                    <div key={notification.id} style={itemStyles}>
                      <div>{notification.content}</div>
                      <div style={dateStyles}>
                        {new Date(notification.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                  src={
                    user?.img
                      ? `http://localhost:8000/static/images/${user.img}`
                      : "/images/avatar.webp"
                  }
                />
                <span className="name">My Account</span>
              </a>

              <ul className="dropdown-menu">
                <li className="mb-1">
                  <Link
                    to="/candidates-dashboard/change-password"
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

export default DashboardCandidatesHeader;
