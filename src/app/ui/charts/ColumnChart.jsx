import React, { useEffect, useRef } from "react";
import { Column } from "@antv/g2plot";

const ColumnChart = () => {
  const containerRef = useRef < HTMLDivElement > null;
  const chartRef = (useRef < Column) | (null > null);

  const data = [
    { month: "Jan", sales: 850, orders: 120 },
    { month: "Feb", sales: 1240, orders: 180 },
    { month: "Mar", sales: 980, orders: 145 },
    { month: "Apr", sales: 1580, orders: 220 },
    { month: "May", sales: 1350, orders: 190 },
    { month: "Jun", sales: 1920, orders: 270 },
    { month: "Jul", sales: 2100, orders: 295 },
    { month: "Aug", sales: 1850, orders: 260 },
  ];

  useEffect(() => {
    if (containerRef.current) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const column = new Column(containerRef.current, {
        data,
        padding: "auto",
        isGroup: true,
        xField: "month",
        yField: "sales",
        seriesField: "type",
        color: ["#F97316", "#10B981"],
        columnStyle: {
          radius: [4, 4, 0, 0],
        },
        tooltip: {
          formatter: (datum) => {
            return { name: "Sales", value: `$${datum.sales.toLocaleString()}` };
          },
        },
        yAxis: {
          label: {
            formatter: (v) => `$${(parseInt(v) / 1000).toFixed(1)}K`,
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
          colors10: ["#F97316"],
        },
      });

      column.render();
      chartRef.current = column;
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return <div ref={containerRef} style={{ height: "300px" }} />;
};

export default ColumnChart;
