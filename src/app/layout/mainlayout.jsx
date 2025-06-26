"use client";
import React from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const { Sider, Content } = Layout;

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const toggle = () => setCollapsed(!collapsed);

  return (
    <Layout className="h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="bg-gray-800"
      >
        <Sidebar collapsed={collapsed} />
      </Sider>
      <Layout>
        <Navbar collapsed={collapsed} toggle={toggle} />
        <Content className="m-4 p-4 bg-gray-50">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;