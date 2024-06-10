import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '@/axios/axios';

const TopCardBlock = () => {
  const [messageCount, setMessageCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessageCount = async () => {
      try {
        const response = await axiosPrivate.get('/stats/messages'); // Replace with your API endpoint
        console.log('API response:', response.data); // Log the response data for debugging
        setMessageCount(response.data); // Assuming the API returns an object with a 'count' property
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchMessageCount();
  }, []);

  // Log the current message count state
  console.log('Current message count:', messageCount);

  const cardContent = [
    {
      id: 3,
      icon: "la-comment-o",
      countNumber: messageCount !== null ? messageCount : "74", // Use fetched count or default
      metaName: "Messages",
      uiClass: "ui-yellow",
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
