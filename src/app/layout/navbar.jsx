"use client";
import React from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const Navbar = ({ collapsed, toggle }) => {
  return (
    <header className="bg-white px-4 flex items-center justify-between shadow h-16">
      <div>
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "text-xl cursor-pointer",
            onClick: toggle,
          }
        )}
      </div>
      <div className="flex items-center space-x-4">//profile & notif
        <div className="w-8 h-8 bg-gray-200 rounded-full" />
        <div className="w-8 h-8 bg-gray-200 rounded-full" />
        <div className="w-8 h-8 bg-gray-200 rounded-full" />
      </div>
    </header>
  );
};

export default Navbar;