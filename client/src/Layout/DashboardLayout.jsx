import { Sidebar } from "../components/dashboard/Sidebar";
import { Navbar } from "../components/dashboard/Navbar";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
