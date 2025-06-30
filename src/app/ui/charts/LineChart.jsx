import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const LineChartComponent = ({ data, linecolor, type, title }) => {
  return (
    <div className="w-full h-96 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type={type}
            dataKey="value"
            stroke={linecolor}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
