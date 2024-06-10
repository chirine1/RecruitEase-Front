import MobileMenu from "@/components/header/MobileMenu";
import DetailsContent from "./details.jsx";
import blogs from "@/data/blogs";
import { useParams } from "react-router-dom";
import CandidateCustomHeader from "@/components/header/candidate-custom";
import MetaComponent from "@/components/common/MetaComponent";
import { useEffect, useState } from "react";
import axios from "@/axios/axios.jsx";

const metadata = {
  title: "Blog Details Dynamic V1 || RecruitEase - Job Board",
  description: "RecruitEase - Job Board",
};

const BlogDetailsCandidate = () => {
  let params = useParams();
  const id = params.id;
  const [blogPost, setBlogPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(`/blog_post/${id}`, {
          withCredentials: true,
        });
        setBlogPost(response.data);
      } catch (error) {
        setError("Error fetching blog post data");
        console.error("Error fetching blog post data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]); // Include id in the dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  // Format the created_at date using toLocaleDateString
  const formattedDate = blogPost?.created_at
    ? new Date(blogPost.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <>
      <MetaComponent meta={metadata} />
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <CandidateCustomHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!-- Blog Single --> */}
      <section className="blog-single">
        <div className="auto-container">
          <div className="upper-box">
            <h3>{blogPost?.title}</h3>

            <ul className="post-info">
              <li>
                
                {blogPost?.creator?.fullname}
              </li>
              <li>{formattedDate}</li>
            </ul>
            {/* End post info */}
          </div>
        </div>
        {/* End auto-container */}

        <figure className="main-image">
          <img
            src={`http://localhost:8000/static/images/${blogPost.image}`}
            alt="resource"
          />
        </figure>

        {/* Pass the id prop to the Index component */}
        <DetailsContent id={id} />
      </section>
      {/* <!-- End Blog Single --> */}

      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default BlogDetailsCandidate;
