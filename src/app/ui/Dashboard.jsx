"use client";
import React from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

export default function Dashboard({ children }) {
  const [collapsed, setCollapsed] = React.useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="bg-gray-800"
      >
        <div className="h-16 flex items-center justify-center text-white text-xl">
          {collapsed ? "L" : "Lizant"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          className="bg-gray-800"
          items={[
            { key: "1", icon: <HomeOutlined />, label: "Dashboard" },
            { key: "2", icon: <UserOutlined />, label: "Users" },
            { key: "3", icon: <SettingOutlined />, label: "Settings" },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="bg-white px-4 flex items-center justify-between shadow">
          <div>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "text-xl cursor-pointer",
                onClick: toggle,
              }
            )}
          </div>
          <div className="flex items-center space-x-4">
            {/* Placeholder untuk search, notifikasi, avatar */}
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
          </div>
        </Header>
        <Content className="m-4 p-4 bg-gray-50">{children}</Content>
      </Layout>
    </Layout>
  );
}
