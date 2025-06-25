"use client";
import React from "react";
import { ConfigProvider, Form } from "antd";
import AuthForm from "@/app/ui/AuthForm"; // Assuming AuthForm is in a separate file
import "@ant-design/v5-patch-for-react-19";

const LoginComponent = () => {
  return (
    <div className="flex h-[95%] rounded-xl w-3xl bg-amber-50 shadow-lg">
      {/* Left Banner Area */}
      <div className="w-1/2 bg-blue-600 flex flex-col rounded-s-xl justify-center items-center text-white p-8">
        {/* <h1 className="text-4xl font-bold mb-4">Lizant</h1>
        <p className="text-lg">Start your journey with us.</p>
        <p className="text-md">
          It brings together your tasks, projects, timelines, files, and more.
        </p>
        <p className="text-sm mt-4">
          © 2025 Lizant. Crafted with ♥ by Themesbrand
        </p> */}
      </div>
      {/* Right Form Area */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="font-semibold text-3xl text-black text-center mb-3">
            Welcome Back!
          </h2>
          <p className="text-center text-xl text-gray-600 mb-6">
            Sign in to continue.
          </p>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#1890ff",
              },
            }}
          >
            <AuthForm />
          </ConfigProvider>
          <div className="text-center mt-4 text-gray-600">
            Don&apos;t have an account?{" "}
            <a href="#" className="text-purple-600">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
