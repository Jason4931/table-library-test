import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";



const BarChartComponent = ({ barColor, title, data }) => {
  return (
    <div className="w-full h-96 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill={barColor} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
