import { Link } from "react-router-dom";
import { isActiveLink } from "../../utils/linkActiveChecker";
import { useLocation } from "react-router-dom";
import {
  allApplicantsNav,
  blogEmployer,
  companyProfileNav,
  dashboardNavEmployer,
  manageJobsNav,
  postJobNav,
  pricingEmployer,
} from "@/data/mainMenuDataEmployer";

const HeaderNavContentCandidate = () => {
  const { pathname } = useLocation();
  return (
    <>
      <nav className="nav main-menu">
        <ul className="navigation" id="navbar">
          {/* current dropdown */}
          <li
            className={`${
              isActiveLink(dashboardNavEmployer.routePath, pathname)
                ? "current"
                : ""
            } `}
          >
            <Link to={dashboardNavEmployer.routePath}>
              <span>Dashboard</span>
            </Link>
          </li>
          {/* End dashboard menu items */}

          <li
            className={`${
              isActiveLink(companyProfileNav.routePath, pathname)
                ? "current"
                : ""
            } `}
          >
            <Link to={companyProfileNav.routePath}>
              <span>Company Profile</span>
            </Link>
          </li>
          {/* End profile menu items */}

          <li
            className={`${
              isActiveLink(postJobNav.routePath, pathname) ? "current" : ""
            } `}
          >
            <Link to={postJobNav.routePath}>
              <span>Post Job</span>
            </Link>
          </li>
          {/* End resume menu items */}

          <li
            className={`${
              isActiveLink(manageJobsNav.routePath, pathname) ? "current" : ""
            } `}
          >
            <Link to={manageJobsNav.routePath}>
              <span>Manage Jobs</span>
            </Link>
          </li>
          {/* End applications menu items */}

          {/* <li
            className={`${
              isActiveLink(allApplicantsNav.routePath, pathname)
                ? "current"
                : ""
            }  `}
          >
            <Link to={allApplicantsNav.routePath}>
              <span>Applications</span>
            </Link>
          </li> */}
          {/* End findjobs menu items */}

          <li
            className={`${
              isActiveLink(blogEmployer.routePath, pathname) ? "current" : ""
            } `}
          >
            <Link to={blogEmployer.routePath}>
              <span>Blog</span>
            </Link>
          </li>

          <li
            className={`${
              isActiveLink(pricingEmployer.routePath, pathname) ? "current" : ""
            } `}
          >
            <Link to={pricingEmployer.routePath}>
              <span>Payment</span>
            </Link>
          </li>
          {/* End Blog menu items */}
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContentCandidate;
