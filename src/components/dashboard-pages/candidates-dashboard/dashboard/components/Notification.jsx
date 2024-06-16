import React, { useState, useEffect } from "react";
import { axiosPrivate } from "@/axios/axios";

const Notification = () => {
  // State to hold notifications data
  const [notifications, setNotifications] = useState([]);

  // Function to fetch notifications from the database
  const fetchNotifications = async () => {
    try {
      const response = await axiosPrivate.get("/notif/current"); // Adjust the endpoint as per your backend API
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Fetch notifications when the component mounts
  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <ul className="notification-list">
      {notifications.map((notification, index) => (
        <li key={index} className={"success" }>
          <span className="icon flaticon-briefcase"></span>
           {notification.content}
        </li>
      ))}
    </ul>
  );
};

export default Notification;
