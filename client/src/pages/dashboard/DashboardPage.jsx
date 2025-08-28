import React from "react";
import { Sidebar } from "../../components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/dashboard/Header";

export const DashboardPage = () => {
  return (
    <section className="flex h-screen">
      <Sidebar />
      <div className="w-full px-5">
        <Header />
        <Outlet />
      </div>
    </section>
  );
};
