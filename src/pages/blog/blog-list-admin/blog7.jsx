import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "@/axios/axios";

const Blog7 = ({ currentPage, itemsPerPage }) => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get("/blog_post", { withCredentials: true });
        const formattedPosts = response.data.map(post => ({
          ...post,
          formattedDate: formatDate(post.created_at),
        }));
        setBlogPosts(formattedPosts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogPosts();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate the indices for slicing
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = blogPosts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      {currentItems.map((item) => (
        <div className="news-block-two" key={item.id}>
          <div className="inner-box">
            <div className="image-box">
              <figure className="image">
                <img src={`http://localhost:8000/static/images/${item.image}`} alt="blog post" />
              </figure>
            </div>
            {/* End image-box */}

            <div className="content-box">
              <ul className="post-meta">
                <li>
                  <a href="#">{item.formattedDate}</a>
                </li>
              </ul>
              <h3>
                <Link to={`/admins-dashboard/blog-details/${item.id}`}>{item.title}</Link>
              </h3>
              <p className="text">{item.synopsis}</p>
              <Link to={`/admins-dashboard/blog-details/${item.id}`} className="read-more">
                Read More <i className="fa fa-angle-right"></i>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Blog7;
