import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ReportsCard = () => {

  // Chart Data
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Membership Plan",
        data: [30, 50, 40, 70, 90, 100],  
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4,
      },
      {
        label: "Book a Trainer",
        data: [20, 10, 50, 120, 100, 80],  
        borderColor: "rgb(98, 192, 75)",
        backgroundColor: "rgba(75, 77, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="col-12">
      <div className="card">
         
        <div className="card-body">
          <h5 className="card-title">
            Sales Reports <span> | All-Time</span>
          </h5>
          {/* Line Chart */}
          <div style={{ height: "300px" }}>
            <Line data={data} options={options} />
          </div>
          {/* End Line Chart */}
        </div>
      </div>
    </div>
  );
};

export default ReportsCard;
