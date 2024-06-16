import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { chatSidebarToggle } from "../../../../../features/toggle/toggleSlice";
import { axiosPrivate } from "@/axios/axios";
import ContactList from "./ContactList";
import ContentField from "./ContentField";

const ChatBox = () => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axiosPrivate.get("/auth/user/curent");
        console.log("Fetched current user:", response.data); // Log the response data
        setCurrentUserId(response.data); // Directly set the user ID
      } catch (error) {
        console.error("Failed to fetch current user", error);
      }
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosPrivate.get("/message/user_messages");
        console.log("Fetched messages:", response.data); // Log the response data
        setMessages(response.data);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };
    fetchMessages();
  }, []);

  const handleSelectMessage = (index) => {
    setSelectedMessageIndex(index);
  };

  const handleNewMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const chatToggle = () => {
    dispatch(chatSidebarToggle());
  };

  return (
    <div className="row">
      <div
        className="contacts_column col-xl-4 col-lg-5 col-md-12 col-sm-12 chat"
        id="chat_contacts"
      >
        <div className="card contacts_card">
          <div className="card-header">
            {/* Startclose chatbox in mobile menu */}
            <div
              className="fix-icon position-absolute top-0 end-0 show-1023"
              onClick={chatToggle}
            >
              <span className="flaticon-close"></span>
            </div>
            {/* close chatbox in mobile menu */}
            {/* <div className="search-box-one">
              <SearchBox />
            </div> */}
          </div>
          {/* End cart-heaer */}

          <div className="card-body contacts_body">
            <ContactList
              messages={messages}
              currentUserId={currentUserId}
              selectedMessageIndex={selectedMessageIndex}
              onSelectMessage={handleSelectMessage}
            />
          </div>
        </div>
      </div>
      {/* End chat_contact */}

      <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12 chat">
        {messages.length > 0 && (
          <ContentField 
            message={messages[selectedMessageIndex]} 
            onNewMessage={handleNewMessage}
          />
        )}
      </div>
      {/* chatbox-field-content */}
    </div>
  );
};

export default ChatBox;
