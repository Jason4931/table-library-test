"use client";
import React from "react";
import { Menu, Button } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { usePathname, useRouter, redirect } from "next/navigation";

const Sidebar = ({ collapsed }) => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { key: "/dashboard", icon: <HomeOutlined />, label: "Dashboard" },
    { key: "/test", icon: <AppstoreOutlined />, label: "Test" },
  ];

  const handleClick = ({ key }) => {
    router.push(key);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    redirect('/');
  }

  return (
    <>
      <div className="flex flex-col h-full justify-between">
        <div>
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
        </div>
        <div className="p-4">
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            block
            onClick={handleLogout}
          >
            {!collapsed && "Logout"}
          </Button>
        </div>
      </div>More actions
    </>
  );
};

export default Sidebar;
