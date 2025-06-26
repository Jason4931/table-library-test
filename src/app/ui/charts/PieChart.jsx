import React, { useEffect, useRef } from "react";
import { Pie } from "@antv/g2plot";

const PieChart = () => {
  const containerRef = useRef < HTMLDivElement > null;
  const chartRef = (useRef < Pie) | (null > null);

  const data = [
    { category: "Electronics", value: 45, color: "#3B82F6" },
    { category: "Clothing", value: 25, color: "#10B981" },
    { category: "Home & Garden", value: 15, color: "#F59E0B" },
    { category: "Sports", value: 10, color: "#EF4444" },
    { category: "Books", value: 5, color: "#8B5CF6" },
  ];

  useEffect(() => {
    if (containerRef.current) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const pie = new Pie(containerRef.current, {
        data,
        angleField: "value",
        colorField: "category",
        radius: 0.8,
        innerRadius: 0.5,
        padding: "auto",
        color: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
        label: {
          type: "inner",
          offset: "-30%",
          content: (obj) => `${obj.percentage}%`,
          style: {
            fontSize: 14,
            fill: "white",
            textAlign: "center",
            fontWeight: "bold",
          },
        },
        legend: {
          position: "bottom",
          offsetY: -5,
          itemName: {
            style: {
              fill: "#374151",
              fontSize: 12,
            },
          },
        },
        tooltip: {
          formatter: (datum) => {
            return { name: datum.category, value: `${datum.value}%` };
          },
        },
        pieStyle: {
          stroke: "#ffffff",
          lineWidth: 2,
        },
      });

      pie.render();
      chartRef.current = pie;
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return <div ref={containerRef} style={{ height: "300px" }} />;
};

export default PieChart;
