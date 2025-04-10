import React, { useEffect, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import { usePage } from "@inertiajs/react"; 


const BudgetChartCard = () => {

   
  const { stats_total_sales_by_otc, stats_total_sales_by_GCASH } = usePage().props;

  const chartRef = useRef(null);
  const [chartReady, setChartReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setChartReady(true), 100);

    const mainContainer = document.querySelector("#main");

    if (mainContainer) {
      const resizeObserver = new ResizeObserver(() => {
        if (chartRef.current) {
          chartRef.current.getEchartsInstance().resize();
        }
      });

      resizeObserver.observe(mainContainer);
      return () => resizeObserver.disconnect();
    }
  }, []);

  // Bar chart options
  const options = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["GCASH", "Over The Counter"],
      top: "top",
    },
    xAxis: {
      type: "category",
 
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "GCASH",
        type: "bar",
        data: [stats_total_sales_by_GCASH],
        itemStyle: { color: "#4CAF50" }, // Green color
      },
      {
        name: "Over The Counter",
        type: "bar",
        data: [stats_total_sales_by_otc], 
        itemStyle: { color: "#800080" }, // Violet color
      },
    ],
  };

  return (
    <div className="card">
      <div className="card-body pb-0">
        <h5 className="card-title">
  
          Payment Method Reports 
        </h5>
        {/* Bar Chart */}
        <div style={{ minHeight: "400px" }}>
          {chartReady && (
            <ReactECharts
              ref={chartRef}
              option={options}
              notMerge={true}
              lazyUpdate={true}
              style={{ height: "400px", width: "100%" }}
            />
          )}
        </div>
        {/* End Bar Chart */}
      </div>
    </div>
  );
};

export default BudgetChartCard;