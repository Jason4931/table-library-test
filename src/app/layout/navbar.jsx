"use client";
import React, { useEffect, useState } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined, BellOutlined } from "@ant-design/icons";
import { Drawer } from "antd";

const Navbar = ({ collapsed, toggle }) => {
  const [userName, setUserName] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsed = JSON.parse(user);
        setUserName(parsed.name || "");
      } catch (e) {
        console.error("Invalid user in localStorage");
      }
    }
  }, []);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const showDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

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
      <div className="flex items-center space-x-4 my-3">
        {/* Notification Button */}
        <BellOutlined
          className="text-xl cursor-pointer"
          onClick={showDrawer}
        />

        {/* Profile Circle */}
        {userName && (
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
            {getInitials(userName)}
          </div>
        )}
      </div>

      {/* Notification Drawer */}
      <Drawer
        title="Notifikasi"
        placement="right"
        onClose={closeDrawer}
        open={isDrawerOpen}
      >
        <p>Belum ada notifikasi.</p>
      </Drawer>
    </header>
  );
};

export default Navbar;