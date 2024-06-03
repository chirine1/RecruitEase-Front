
import FooterDefault from "../../footer/common-footer";

import MobileMenu from "../../header/MobileMenu";
import BlogPagination from "../blog-sidebar/BlogPagination";
import CandidateCustomHeader from "@/components/header/candidate-custom";
import Blog7 from "../../blog/Blog7";
import Breadcrumb from "../../common/Breadcrumb";
import { useNavigate } from "react-router-dom";


const Index = () => {

  const navigate = useNavigate()

  const buttonStyle = {
    backgroundColor: "#007bff", // Blue color
    color: "#fff", // White text
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    textTransform: "uppercase",
    transition: "background-color 0.3s ease",
    display: "inline-block",
    marginBottom: "20px" // Add margin for spacing
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3" // Darker blue on hover
  };

  const handleMouseEnter = (e) => {
    Object.assign(e.target.style, buttonHoverStyle);
  };

  const handleMouseLeave = (e) => {
    Object.assign(e.target.style, buttonStyle);
  };

  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      {/* End Login Popup Modal */}
      <CandidateCustomHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      <Breadcrumb title="Blog" meta="Blog" />
      {/* <!--End Page Title--> */}

      <div className="sidebar-page-container">
        <div className="auto-container">
          <div className="row">
            <div className="content-side col-lg-8 col-md-12 col-sm-12">
              <div className="blog-grid">
                <div className="add-blog-post">
                  <button
                    style={buttonStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={()=>navigate("/candidates-dashboard/add-blog-post")}
                  >
                    Add Blog Post
                  </button>
                </div>
                <Blog7 />
              </div>
              {/* End blog-grid */}

              <BlogPagination />
              {/* End blog pagination */}
            </div>
            {/* <!--End Content Side--> */}

            <div className="sidebar-side col-lg-4 col-md-12 col-sm-12">
              {/* <BlogSidebar /> */}
            </div>
            {/* <!--End Sidebar Side--> */}
          </div>
          {/* End .row */}
        </div>
      </div>
      {/* <!-- End Sidebar Container --> */}

  
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default Index;
