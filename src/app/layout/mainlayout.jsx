"use client";
import React, { useEffect } from "react";
import { Layout } from "antd";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { redirect } from "next/navigation";
import '@ant-design/v5-patch-for-react-19';

const { Sider, Content } = Layout;

const MainLayout = ({ children }) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/login");
    }
  }, []);

  const [collapsed, setCollapsed] = React.useState(false);
  const toggle = () => setCollapsed(!collapsed);

  return (
    <Layout className="h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="bg-gray-800 fixed top-0 left-0 h-screen"
      >
        <Sidebar collapsed={collapsed} />
      </Sider>
      <Layout>
        <Navbar collapsed={collapsed} toggle={toggle} />
        <Content className="m-4 p-4 bg-gray-50 overflow-y-auto max-h-screen">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
