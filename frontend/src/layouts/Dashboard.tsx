import React, { useState } from "react";
import type { ReactNode } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
// import logo from
interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex max-h-screen relative  w-full overflow-hidden bg-gray-950 text-white">
      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 border rounded-none md:rounded-md m-0 md:m-3 border-gray-200/10 shadow-md shadow-amber-50/10 min-h-screen md:min-h-[97vh]  w-64 bg-gray-950 text-white p-4 space-y-6 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="text-2xl font-bold  flex items-center justify-center bg-white rounded-md">
          <img src="/logo.png" alt="" className="w-20 h-20" />
        </div>
        <nav className="space-y-4 font-bold">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `block px-2 py-1 rounded ${
                isActive
                  ? "bg-emerald-400 text-gray-900"
                  : "hover:bg-emerald-800"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/projects"
            end
            className={({ isActive }) =>
              `block px-2 py-1 rounded ${
                isActive
                  ? "bg-emerald-400 text-gray-900"
                  : "hover:bg-emerald-800"
              }`
            }
          >
            Projects
          </NavLink>
        </nav>
      </aside>

      {/* Mobile Nav */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-gray-950 text-white flex justify-between items-center p-4 z-40">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button
          className="focus:outline-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 w-full mt-16 md:m-3  min-h-screen md:min-h-[97vh] border md:rounded-md border-gray-200/10 shadow-md shadow-amber-50/10 overflow-y-auto">
        <DashboardHeader />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
