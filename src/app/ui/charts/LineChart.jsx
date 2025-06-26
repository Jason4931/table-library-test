import React, { useEffect, useRef } from "react";
import { Line } from "@antv/g2plot";

const LineChart = () => {
  const containerRef = useRef < HTMLDivElement > null;
  const chartRef = (useRef < Line) | (null > null);

  const data = [
    { month: "Jan", revenue: 12400 },
    { month: "Feb", revenue: 15600 },
    { month: "Mar", revenue: 18900 },
    { month: "Apr", revenue: 16200 },
    { month: "May", revenue: 22100 },
    { month: "Jun", revenue: 25300 },
    { month: "Jul", revenue: 28900 },
    { month: "Aug", revenue: 31200 },
    { month: "Sep", revenue: 27800 },
    { month: "Oct", revenue: 35400 },
    { month: "Nov", revenue: 39600 },
    { month: "Dec", revenue: 42300 },
  ];

  useEffect(() => {
    if (containerRef.current) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const line = new Line(containerRef.current, {
        data,
        padding: "auto",
        xField: "month",
        yField: "revenue",
        smooth: true,
        color: "#3B82F6",
        lineStyle: {
          lineWidth: 3,
        },
        point: {
          size: 5,
          shape: "circle",
          style: {
            fill: "#3B82F6",
            stroke: "#ffffff",
            lineWidth: 2,
          },
        },
        tooltip: {
          formatter: (datum) => {
            return {
              name: "Revenue",
              value: `$${datum.revenue.toLocaleString()}`,
            };
          },
        },
        yAxis: {
          label: {
            formatter: (v) => `$${(parseInt(v) / 1000).toFixed(0)}K`,
          },
        },
        xAxis: {
          label: {
            style: {
              fill: "#6B7280",
            },
          },
        },
        theme: {
          colors10: ["#3B82F6"],
        },
      });

      line.render();
      chartRef.current = line;
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return <div ref={containerRef} style={{ height: "300px" }} />;
};

export default LineChart;
