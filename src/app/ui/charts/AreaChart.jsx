import React, { useEffect, useRef } from "react";
import { Area } from "@antv/g2plot";

const AreaChart = () => {
  const containerRef = useRef < HTMLDivElement > null;
  const chartRef = (useRef < Area) | (null > null);

  const data = [
    { date: "2024-01", visitors: 1200, pageViews: 3400 },
    { date: "2024-02", visitors: 1680, pageViews: 4200 },
    { date: "2024-03", visitors: 1450, pageViews: 3800 },
    { date: "2024-04", visitors: 1980, pageViews: 5100 },
    { date: "2024-05", visitors: 2240, pageViews: 5800 },
    { date: "2024-06", visitors: 2680, pageViews: 6900 },
    { date: "2024-07", visitors: 2950, pageViews: 7600 },
    { date: "2024-08", visitors: 3200, pageViews: 8200 },
    { date: "2024-09", visitors: 2890, pageViews: 7400 },
    { date: "2024-10", visitors: 3450, pageViews: 8900 },
    { date: "2024-11", visitors: 3680, pageViews: 9500 },
    { date: "2024-12", visitors: 4120, pageViews: 10600 },
  ];

  useEffect(() => {
    if (containerRef.current) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const area = new Area(containerRef.current, {
        data,
        padding: "auto",
        xField: "date",
        yField: "pageViews",
        smooth: true,
        color: "#8B5CF6",
        areaStyle: {
          fill: "l(270) 0:#8B5CF6 0.5:#C4B5FD 1:#ffffff",
          fillOpacity: 0.6,
        },
        line: {
          color: "#8B5CF6",
          size: 2,
        },
        point: {
          size: 4,
          shape: "circle",
          style: {
            fill: "#8B5CF6",
            stroke: "#ffffff",
            lineWidth: 2,
          },
        },
        tooltip: {
          formatter: (datum) => {
            return {
              name: "Page Views",
              value: datum.pageViews.toLocaleString(),
            };
          },
        },
        xAxis: {
          label: {
            formatter: (v) => v.slice(-2),
            style: {
              fill: "#6B7280",
            },
          },
        },
        yAxis: {
          label: {
            formatter: (v) => `${(parseInt(v) / 1000).toFixed(0)}K`,
            style: {
              fill: "#6B7280",
            },
          },
        },
      });

      area.render();
      chartRef.current = area;
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return <div ref={containerRef} style={{ height: "300px" }} />;
};

export default AreaChart;
