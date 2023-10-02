"use client";
import React, { useState } from "react";
import Sidebar from "../components/sidebar";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <html>
      <body>
        <div className="flex">
        <Sidebar />
        {children}
        </div>
      </body>
    </html>
  );
};

export default DashboardLayout;
