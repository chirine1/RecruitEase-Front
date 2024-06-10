import React, { useEffect, useState } from "react";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { axiosPrivate } from "@/axios/axios";

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltips: {
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
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const JobPostingsChart = () => {
  const [chartData, setChartData] = useState({
    labels,
    datasets: [
      {
        label: "Job Postings",
        data: Array(labels.length).fill(0), // Initial data set to zero
        borderColor: "#1967d2",
        backgroundColor: "#1967d2",
        fill: false,
      },
    ],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/stats/jobs");
        console.log("API Response:", response.data);
        const fetchedData = response.data;

        if (Array.isArray(fetchedData) && fetchedData.length === 12) {
          setChartData((prevData) => ({
            ...prevData,
            datasets: [
              {
                ...prevData.datasets[0],
                data: fetchedData,
              },
            ],
          }));
        } else {
          console.log("Invalid data format:", fetchedData);
          throw new Error("Invalid data format");
        }

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Job Postings Per Month</h4>
        <div className="chosen-outer">{/* <!--Tabs Box--> */}</div>
      </div>
      {/* End widget top bar */}

      <div className="widget-content">
        <Line options={options} data={chartData} />
      </div>
      {/* End job postings chart */}
    </div>
  );
};

export default JobPostingsChart;
