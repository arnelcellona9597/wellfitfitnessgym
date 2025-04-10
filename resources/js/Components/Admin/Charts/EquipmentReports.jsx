import React, { useEffect, useRef, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { usePage } from "@inertiajs/react";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const TrafficChartCard = () => {


  const { stats_total_inventory } = usePage().props; 
  

  const chartRef = useRef(null);
  const [chartReady, setChartReady] = useState(false);

  useEffect(() => {
    // Ensure chart initializes correctly after mounting
    const timeout = setTimeout(() => setChartReady(true), 100);

    // Auto-resize chart when container resizes
    const mainContainer = document.querySelector("#main");

    if (mainContainer) {
      const resizeObserver = new ResizeObserver(() => {
        document.querySelectorAll(".echart").forEach((chartDom) => {
          const chartInstance = ChartJS.getChart(chartDom);
          if (chartInstance) {
            chartInstance.resize();
          }
        });
      });

      resizeObserver.observe(mainContainer);

      return () => {
        clearTimeout(timeout);
        resizeObserver.disconnect();
      };
    }

    return () => clearTimeout(timeout);
  }, []);

  // Pie Chart Data
// Pie Chart Data
const data = {
  labels: stats_total_inventory.map((item) => item.inventory_name), // returns an array of strings
  datasets: [
    {
      data: stats_total_inventory.map((item) => item.inventory_quantity), // You might want to replace these with dynamic values too
      backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4caf50"],
      hoverBackgroundColor: ["#ff4f72", "#2a92d8", "#e6b800", "#388e3c"],
    },
  ],
};


  // Pie Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="card">
      <div className="card-body pb-0">
        <h5 className="card-title">
          Inventory Reports  
        </h5>
        {/* Pie Chart */}
        <div ref={chartRef} className="echart" style={{ minHeight: "400px" }}>
          {chartReady && <Pie data={data} options={options} />}
        </div>
        {/* End Pie Chart */}
      </div>
    </div>
  );
};

export default TrafficChartCard;