"use client";
import React from "react";
import { Menu } from "antd";
import { HomeOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = ({ collapsed }) => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { key: "/dashboard", icon: <HomeOutlined />, label: "Dashboard" },
    { key: "/users", icon: <UserOutlined />, label: "Users" },
    { key: "/settings", icon: <SettingOutlined />, label: "Settings" },
  ];

  const handleClick = ({ key }) => {
    router.push(key);
  };

  return (
    <>
      <div className="h-16 flex items-center justify-center text-white text-xl">
        {collapsed ? "L" : "Lizant"}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[pathname]}
        onClick={handleClick}
        className="bg-gray-800"
        items={menuItems}
      />
    </>
  );
};

export default Sidebar;
