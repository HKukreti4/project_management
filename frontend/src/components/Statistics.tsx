import { useEffect, useState } from "react";
import axiosInstance from "../services/api";

const Statistics = () => {
  const [totalProjects, setTotalProjects] = useState(0);
  const getProjects = async () => {
    try {
      const result = await axiosInstance.get("/projects", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (result.data.projects) {
        setTotalProjects(result.data.projects.length);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProjects();
  }, []);
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-gray-900 shadow rounded p-6 text-center">
        <div className="text-4xl font-bold text-emerald-400">
          {totalProjects}
        </div>
        <p className="text-white">Total Projects</p>
      </div>
      <div className="bg-gray-900 shadow rounded p-6 text-center">
        <div className="text-4xl font-bold text-emerald-400">7</div>
        <p className="text-white">Total Tasks</p>
      </div>
      <div className="bg-gray-900 shadow rounded p-6 text-center">
        <div className="text-4xl font-bold text-emerald-400">2</div>
        <p className="text-white">Total Pending Tasks</p>
      </div>
    </div>
  );
};

export default Statistics;
