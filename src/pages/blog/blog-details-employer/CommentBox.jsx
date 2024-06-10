import React from "react";

const CommentBox = ({ comments, loading, error }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h4>Comments</h4>
      {comments.map((comment) => (
        <div className="comment-box" key={comment.id}>
          <div className="comment">
            <div className="user-thumb">
              <img
                src={
                  comment?.creator?.img
                    ? `http://localhost:8000/static/images/${comment.creator.img}`
                    : "/images/avatar.webp"
                }
                alt="resource"
              />
            </div>
            <div className="comment-info">
              <div className="user-name">{comment?.creator?.fullname}</div>
            </div>
            <div className="text">{comment.content}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommentBox;
