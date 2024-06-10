import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { axiosPrivate } from "@/axios/axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      position: "nearest",
      mode: "index",
      intersect: false,
      yPadding: 10,
      xPadding: 10,
      caretSize: 4,
      backgroundColor: "#1967d2",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 4,
    },
  },
};

const labels = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const ProfileChart = () => {
  const [chartData, setChartData] = useState({
    labels,
    datasets: [
      {
        label: "Job Applications",
        data: Array(labels.length).fill(0), // Initial data set to zero
        borderColor: "#1967d2",
        backgroundColor: "#1967d2",
        fill: false,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/stats/employer_app");
        const data = response.data; // Assuming the API response format is [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
        
        // Ensure the data is in the correct format
        if (Array.isArray(data) && data.length === 12) {
          setChartData({
            labels,
            datasets: [
              {
                label: "Job Applications",
                data: data, // Use the fetched data here
                borderColor: "#1967d2",
                backgroundColor: "#1967d2",
                fill: false,
              },
            ],
          });
        } else {
          console.error("Unexpected data format: ", data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Your Job Applications</h4>
      </div>
      {/* End widget top bar */}

      <div className="widget-content">
        <Line options={options} data={chartData} />
      </div>
      {/* End profile chart */}
    </div>
  );
};

export default ProfileChart;
