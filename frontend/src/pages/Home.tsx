import { FaProjectDiagram, FaTasks, FaCheckCircle } from "react-icons/fa";
import Header from "../components/Header";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Navbar */}
      <Header />

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-around px-8 py-16 bg-gray-900">
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Manage Your <br /> Projects Efficiently
          </h1>
          <p className="mt-4 text-gray-300">
            Organize tasks, track progress, and collaborate with your team
            seamlessly.
          </p>
          <NavLink
            to="/login"
            className="mt-6 bg-emerald-600 text-white px-6 py-3 rounded hover:bg-emerald-500"
          >
            Get Started
          </NavLink>
        </div>
        <div className="w-full max-w-md mb-10 md:mb-0">
          <img
            src="/project.jpg"
            alt="Project Illustration"
            className="w-full"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-16 bg-gray-800 text-center">
        <h2 className="text-3xl font-bold text-emerald-400 mb-10">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          <div className="bg-gray-900 p-6 rounded-md shadow ">
            <FaProjectDiagram className="text-4xl text-emerald-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white">
              Project Overview
            </h3>
            <p className="mt-2 text-gray-300">
              Gain a comprehensive view of all projects.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-md shadow">
            <FaTasks className="text-4xl text-emerald-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white">
              Task Management
            </h3>
            <p className="mt-2 text-gray-300">
              Easily create, assign, and track tasks.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-md shadow">
            <FaCheckCircle className="text-4xl text-emerald-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white">
              Progress Tracking
            </h3>
            <p className="mt-2 text-gray-300">
              Monitor the status of tasks and milestones.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center p-4">
        &copy; 2025 Project Management, All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
