import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  isActiveLink,
  isActiveParent,
  isActiveParentChaild,
} from "@/utils/linkActiveChecker";
import {
  aboutItems,
  blogItems,
  faq,
  findJobItems,
  homeItems,
  recruiterItems,
  termsItems,
} from "@/data/mainMenuDataHome";

const HeaderNavContentHomeCustom = () => {
  const { pathname } = useLocation();
  return (
    <>
      <nav className="nav main-menu">
        <ul className="navigation" id="navbar">
          {/* current dropdown */}
          <li
            className={`${
              isActiveLink(homeItems[0].routePath, pathname) ? "current" : ""
            } `}
          >
            <Link to={homeItems[0].routePath}>
              <span>Home</span>
            </Link>
          </li>
          {/* End homepage menu items */}

        {/*   <li
            className={`${
              isActiveLink(findJobItems[0].routePath, pathname) ? "current" : ""
            }  `}
          >
            <Link to={findJobItems[0].routePath}>
              <span>Find Jobs</span>
            </Link>
          </li> */}
          {/* End findjobs menu items */}

          <li
            className={`${
              isActiveLink(blogItems[0].routePath, pathname) ? "current" : ""
            } `}
          >
            <Link to={blogItems[0].routePath}>
              <span>Blog</span>
            </Link>
          </li>
          {/* End Blog menu items */}

          <li
            className={`${
              isActiveLink(termsItems[0].routePath, pathname) ? "current" : ""
            } `}
          >
            <Link to={termsItems[0].routePath}>
              <span>Terms</span>
            </Link>
          </li>
          {/* end terms */}

          <li
            className={`${
              isActiveLink(faq[0].routePath, pathname) ? "current" : ""
            } `}
          >
            <Link to={faq[0].routePath}>
              <span>FAQ</span>
            </Link>
          </li>

          <li
            className={`${
              isActiveLink(aboutItems[0].routePath, pathname) ? "current" : ""
            } `}
          >
            <Link to={aboutItems[0].routePath}>
              <span>About Us</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContentHomeCustom;
