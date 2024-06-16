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
  dashboardItemsCand,
  findJobItemsCand,
  myProfileCand,
  myResumeCand,
} from "@/data/mainMenuCandidate";
import {
  ManageItemsAdmin,
  blogItemsAdmin,
  dashboardItemsAdmin,
} from "@/data/mainMenuAdmin";

const HeaderNavContentAdmin = () => {
  const { pathname } = useLocation();
  return (
    <>
      <nav className="nav main-menu">
        <ul className="navigation" id="navbar">
          {/* current dropdown */}
          <li
            className={`${
              isActiveLink(dashboardItemsAdmin[0].routePath, pathname)
                ? "current"
                : ""
            } `}
          >
            <Link to={dashboardItemsAdmin[0].routePath}>
              <span>Dashboard</span>
            </Link>
          </li>
          {/* End dashboard menu items */}

          <li
            className={`${
              isActiveLink(ManageItemsAdmin[0].routePath, pathname)
                ? "current"
                : ""
            } `}
          >
            <Link to={ManageItemsAdmin[0].routePath}>
              <span>Manage</span>
            </Link>
          </li>
          {/* End applications menu items */}

          <li
            className={`${
              isActiveLink(blogItemsAdmin[0].routePath, pathname)
                ? "current"
                : ""
            } `}
          >
            <Link to={blogItemsAdmin[0].routePath}>
              <span>Blog</span>
            </Link>
          </li>
          {/* End Blog menu items */}
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContentAdmin;
