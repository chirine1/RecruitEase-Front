import React, { useEffect, useState } from "react";
import { axiosPrivate } from "@/axios/axios";

const TopCardBlock = () => {
  // State to hold the card data
  const [postedJobs, setPostedJobs] = useState(0);
  const [messages, setMessages] = useState(0);

  // Function to fetch posted jobs data from backend
  const fetchPostedJobs = async () => {
    try {
      const response = await axiosPrivate.get("/stats/posted_jobs");
      setPostedJobs(response.data);
    } catch (error) {
      console.error("Error fetching posted jobs:", error);
    }
  };

  // Function to fetch messages data from backend
  const fetchMessages = async () => {
    try {
      const response = await axiosPrivate.get("/stats/messages");
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Fetch data for each card item when the component mounts
  useEffect(() => {
    fetchPostedJobs();
    fetchMessages();
  }, []);

  // Define the card content with dynamic data
  const cardContent = [
    {
      id: 1,
      icon: "flaticon-briefcase",
      countNumber: postedJobs,
      metaName: "Posted Jobs",
      uiClass: "ui-blue",
    },
    {
      id: 2,
      icon: "la-comment-o",
      countNumber: messages,
      metaName: "Messages",
      uiClass: "ui-yellow",
    },
  ];

  return (
    <>
      {cardContent.map((item) => (
        <div
          className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12"
          key={item.id}
        >
          <div className={`ui-item ${item.uiClass}`}>
            <div className="left">
              <i className={`icon la ${item.icon}`}></i>
            </div>
            <div className="right">
              <h4>{item.countNumber}</h4>
              <p>{item.metaName}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopCardBlock;
