import React, { useEffect, useState } from "react";
import ChatHamburger from "./ChatHamburger";
import axios from "axios";
import { toast } from "react-toastify";
import { axiosPrivate } from "@/axios/axios";

const ContentField = ({ message, onNewMessage }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axiosPrivate.get("/auth/user/curent");
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Failed to fetch current user", error);
        toast.error("Failed to fetch current user");
      }
    };

    fetchCurrentUser();
  }, []);

  const handleReplyClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleReplyContentChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post("/message", {
        subject: message.subject,
        content: replyContent,
        receiver_id:
          currentUser === message.sender.id
            ? message.receiver.id
            : message.sender.id,
      });
      setReplyContent("");
      setShowPopup(false);
      toast.success("Message sent");
      onNewMessage(response.data); // Pass the new message to the parent component
    } catch (error) {
      console.error("Failed to send reply", error);
      toast.error("Failed to send message");
      console.log(message.sender.id);
      console.error(error);
    }
  };

  return (
    <div className="card message-card">
      <div className="card-header msg_head">
        <div className="d-flex bd-highlight">
          <div className="img_cont">
            <img
              src={
                message?.receiver?.img
                  ? `http://localhost:8000/static/images/${message?.receiver?.img}`
                  : "/images/avatar.webp"
              }
              alt="candidates"
              className="rounded-circle user_img"
            />
          </div>
          <div className="user_info">
            <span>
              {message.sender.id === currentUser
                ? message.receiver.fullname
                : message.sender.fullname}
            </span>
          </div>
        </div>
      </div>
      {/* End .cart-header */}

      <div className="card-body msg_card_body">
        <h5>Subject: {message.subject}</h5>
        <p>{message.content}</p>
      </div>

      <div className="d-flex justify-content-end mb-2 reply"></div>

      <div className="card-footer">
        <button
          onClick={handleReplyClick}
          className="theme-btn btn-style-one submit-btn"
        >
          Reply
        </button>
      </div>
      {/* End .card-footer */}

      {showPopup && (
        <>
          <div style={overlayStyles} onClick={handlePopupClose}></div>
          <div style={popupStyles}>
            <div style={popupHeaderStyles}>
              <span>Reply to {message.sender.fullname}</span>
              <button onClick={handlePopupClose} style={closeButtonStyles}>
                &times;
              </button>
            </div>
            <div style={popupBodyStyles}>
              <form onSubmit={handleReplySubmit}>
                <textarea
                  style={textareaStyles}
                  value={replyContent}
                  onChange={handleReplyContentChange}
                  placeholder="Type your reply..."
                  required
                ></textarea>
                <button
                  type="submit"
                  className="theme-btn btn-style-one submit-btn"
                  style={submitButtonStyles}
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const overlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 999,
};

const popupStyles = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  backgroundColor: "white",
  border: "1px solid #ccc",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  zIndex: 1000,
  padding: "20px",
  borderRadius: "8px",
};

const popupHeaderStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #ccc",
  paddingBottom: "10px",
  marginBottom: "10px",
};

const closeButtonStyles = {
  background: "none",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
};

const popupBodyStyles = {
  display: "flex",
  flexDirection: "column",
};

const textareaStyles = {
  width: "100%",
  height: "100px",
  marginBottom: "10px",
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const submitButtonStyles = {
  alignSelf: "flex-end",
};

export default ContentField;
