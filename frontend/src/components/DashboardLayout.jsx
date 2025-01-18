import Navbar from "../components/Navbar";
import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <Navbar />

        {/* Main Content Area (Dynamic) */}
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />  {/* This is where dynamic content will be loaded */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
