"use client";
import React from "react";
import MainLayout from "@/app/layout/mainlayout";
import { DollarSign, Users, ShoppingCart, Eye, BarChart3, ArrowUp, ArrowDown, TrendingUp } from "lucide-react";
import BarChartComponent from "../ui/charts/BarChart";
import LineChartComponent from "../ui/charts/LineChart";
import PieChartComponent from "../ui/charts/PieChart";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$54,239",
      change: "+12.5%",
      isPositive: true,
      icon: DollarSign,
      bgColor: "bg-blue-500",
    },
    {
      title: "Active Users",
      value: "8,749",
      change: "+8.2%",
      isPositive: true,
      icon: Users,
      bgColor: "bg-green-500",
    },
    {
      title: "Total Orders",
      value: "1,423",
      change: "-3.1%",
      isPositive: false,
      icon: ShoppingCart,
      bgColor: "bg-orange-500",
    },
    {
      title: "Page Views",
      value: "125,742",
      change: "+18.7%",
      isPositive: true,
      icon: Eye,
      bgColor: "bg-purple-500",
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">
                  Welcome back! Here's what's happening with your business
                  today.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors cursor-pointer">
                  <BarChart3 className="w-4 h-4" />
                  <span className="font-medium">Analytics</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">
                        {stat.value}
                      </p>
                      <div className="flex items-center mt-2">
                        {stat.isPositive ? (
                          <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                        )}
                        <span
                          className={`text-sm font-medium ${stat.isPositive ? "text-green-600" : "text-red-600"
                            }`}
                        >
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className={`${stat.bgColor} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Revenue Trend */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Revenue Trend
                  </h3>
                  <p className="text-sm text-gray-600">
                    Monthly revenue over the past year
                  </p>
                </div>
                <TrendingUp className="w-5 h-5 text-blue-500" />
              </div>
              <LineChartComponent />
            </div>

            {/* Sales by Category */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Sales by Category
                  </h3>
                  <p className="text-sm text-gray-600">
                    Distribution of sales across categories
                  </p>
                </div>
                <BarChart3 className="w-5 h-5 text-green-500" />
              </div>
              <PieChartComponent />
            </div>
          </div>

          {/* Bottom Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Monthly Performance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Monthly Performance
                  </h3>
                  <p className="text-sm text-gray-600">
                    Comparison of key metrics by month
                  </p>
                </div>
                <BarChart3 className="w-5 h-5 text-orange-500" />
              </div>
              <BarChartComponent />
            </div>

            {/* Traffic Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Traffic Overview
                  </h3>
                  <p className="text-sm text-gray-600">
                    Website traffic patterns over time
                  </p>
                </div>
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
              <PieChartComponent />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
