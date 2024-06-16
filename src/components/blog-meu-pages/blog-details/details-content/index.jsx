import React, { useState, useEffect } from "react";
import axios from "@/axios/axios";
import CommentBox from "./CommentBox";
import Form from "./Form";

const Index = ({ id }) => {
  const [blogPost, setBlogPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(`/blog_post/${id}`, { withCredentials: true });
        setBlogPost(response.data);
      } catch (error) {
        setError("Error fetching blog post data");
        console.error("Error fetching blog post data:", error);
      }
    };

    fetchBlogPost();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/comment/byblog/${id}`);
        setComments(response.data);
        setLoadingComments(false);
      } catch (error) {
        setError("Error fetching comments");
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [id]);

  const addComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  return (
    <div className="auto-container">
      <h4>{blogPost.title1}</h4>
      <p>{blogPost.paragraph1}</p>
      <h4>{blogPost.title2}</h4>
      {blogPost.paragraph2 && <p>{blogPost.paragraph2}</p>}

      <div className="comments-area">
        <CommentBox comments={comments} loading={loadingComments} error={error} />
      </div>
{/* 
      <div className="comment-form default-form">
        <h4>Leave your thought here</h4>
        <Form id={id} addComment={addComment} />
      </div> */}
    </div>
  );
};

export default Index;
