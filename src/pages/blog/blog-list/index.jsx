import BlogPagination from "@/components/blog-meu-pages/blog-sidebar/BlogPagination";
import Blog7 from "./blog7";

import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import FooterDefault from "@/components/footer/common-footer";
import Breadcrumb from "@/components/common/Breadcrumb";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogListAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6; // Number of items to display per page

  const navigate = useNavigate();

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
    marginBottom: "20px", // Add margin for spacing
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3", // Darker blue on hover
  };

  const handleMouseEnter = (e) => {
    Object.assign(e.target.style, buttonHoverStyle);
  };

  const handleMouseLeave = (e) => {
    Object.assign(e.target.style, buttonStyle);
  };

  useEffect(() => {
    const fetchTotalPages = async () => {
      try {
        const response = await axios.get("/blog_post", {
          withCredentials: true,
        });
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      } catch (error) {
        console.error("Error fetching total pages:", error);
      }
    };

    fetchTotalPages();
  }, [itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      {/* End Login Popup Modal */}
      <DefaulHeader />
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
                {/* <div className="add-blog-post">
                  <button
                    style={buttonStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => navigate("/admins-dashboard/add-blog-post")}
                  >
                    Add Blog Post
                  </button>
                </div> */}
                <Blog7 currentPage={currentPage} itemsPerPage={itemsPerPage} />
              </div>
              {/* End blog-grid */}

              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
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
    </>
  );
};

export default BlogListAdmin;
