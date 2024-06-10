import { Link } from "react-router-dom";
import {
  isActiveParent,
  isActiveLink,
  isActiveParentChaild,
} from "../../utils/linkActiveChecker";

import { useLocation } from "react-router-dom";
import {
  applicationsCand,
  blogItemsCand,
  contact,
  dashboardItemsCand,
  findJobItemsCand,
  myProfileCand,
  myResumeCand,
} from "@/data/mainMenuCandidate";

const HeaderNavContentCandidate = () => {
  const { pathname } = useLocation();
  return (
    <>
      <nav className="nav main-menu">
        <ul className="navigation" id="navbar">
          {/* current dropdown */}
          <li
            className={`${
              isActiveLink(dashboardItemsCand[0].routePath, pathname)
                ? "current"
                : ""
            } `}
          >
            <Link to={dashboardItemsCand[0].routePath}>
              <span>Dashboard</span>
            </Link>
          </li>
          {/* End dashboard menu items */}

          <li
            className={`${
              isActiveLink(myProfileCand[0].routePath, pathname)
                ? "current"
                : ""
            } `}
          >
            <Link to={myProfileCand[0].routePath}>
              <span>Profile</span>
            </Link>
          </li>
          {/* End profile menu items */}

          <li
            className={`${
              isActiveLink(myResumeCand[0].routePath, pathname) ? "current" : ""
            } `}
          >
            <Link to={myResumeCand[0].routePath}>
              <span>Resume</span>
            </Link>
          </li>
          {/* End resume menu items */}

          <li
            className={`${
              isActiveLink(applicationsCand[0].routePath, pathname)
                ? "current"
                : ""
            } `}
          >
            <Link to={applicationsCand[0].routePath}>
              <span>Applications</span>
            </Link>
          </li>
          {/* End applications menu items */}

          <li
            className={`${
              isActiveLink(findJobItemsCand[0].routePath, pathname)
                ? "current"
                : ""
            }  `}
          >
            <Link to={findJobItemsCand[0].routePath}>
              <span>Find Jobs</span>
            </Link>
          </li>
          {/* End findjobs menu items */}

          <li
            className={`${
              isActiveLink(blogItemsCand[0].routePath, pathname)
                ? "current"
                : ""
            } `}
          >
            <Link to={blogItemsCand[0].routePath}>
              <span>Blog</span>
            </Link>
          </li>
          <li
            className={`${
              isActiveLink(contact[0].routePath, pathname)
                ? "current"
                : ""
            }  `}
          >
            <Link to={contact[0].routePath}>
              <span>Contact Admin</span>
            </Link>
          </li>
          {/* End Blog menu items */}
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContentCandidate;
