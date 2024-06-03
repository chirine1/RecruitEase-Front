import FooterDefault from "../../footer/common-footer";

import MobileMenu from "../../header/MobileMenu";
import BlogPagination from "../blog-sidebar/BlogPagination";
import CandidateCustomHeader from "@/components/header/candidate-custom";
import Blog7 from "../../blog/Blog7";
import Breadcrumb from "../../common/Breadcrumb";
import { useNavigate } from "react-router-dom";
import LogoUpload from "@/components/dashboard-pages/candidates-dashboard/my-profile/components/my-profile/LogoUpload";
import BlogPostForm from "./add-post-form";
import { useState } from "react";

const AddBlogPostPageCand = () => {
  
  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      {/* End Login Popup Modal */}
      <CandidateCustomHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      <Breadcrumb title="Add Blog Post" meta="Blog" />
      {/* <!--End Page Title--> */}

      <div className="sidebar-page-container">
        <div className="auto-container">
          <div className="row">
            <div className="content-side col-lg-8 col-md-12 col-sm-12">
              <div className="blog-grid">
                
                <BlogPostForm />
              </div>
              {/* End blog-grid */}

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

export default AddBlogPostPageCand;
