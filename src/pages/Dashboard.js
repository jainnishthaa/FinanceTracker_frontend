import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dashboard-div">
      <Sidebar />
      <div className="info">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
