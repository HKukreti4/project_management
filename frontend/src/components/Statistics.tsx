import { useEffect, useState } from "react";
import axiosInstance from "../services/api";

interface Task {
  _id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
}

interface Project {
  _id: string;
  title: string;
  status: string;
  tasks: Task[];
}

const Statistics = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await axiosInstance.get("/project-details", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (result.data.projects) {
          setProjects(result.data.projects);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProjects();
  }, []);

  const totalTasks = projects.reduce(
    (sum, project) => sum + (project.tasks?.length || 0),
    0
  );

  const pendingTasks = projects.reduce((sum, project) => {
    const pending = project.tasks.filter(
      (task) => task.status === "todo" || task.status === "in-progress"
    ).length;
    return sum + pending;
  }, 0);

  const completedTasks = projects.reduce((sum, project) => {
    const completed = project.tasks.filter(
      (task) => task.status === "done"
    ).length;
    return sum + completed;
  }, 0);

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-gray-900 shadow rounded p-6 text-center">
        <div className="text-4xl font-bold text-emerald-400">
          {projects.length}
        </div>
        <p className="text-white">Total Projects</p>
      </div>

      <div className="bg-gray-900 shadow rounded p-6 text-center">
        <div className="text-4xl font-bold text-red-400">{totalTasks}</div>
        <p className="text-white">Total Tasks</p>
      </div>

      <div className="bg-gray-900 shadow rounded p-6 text-center">
        <div className="text-4xl font-bold text-yellow-400">{pendingTasks}</div>
        <p className="text-white">Pending Tasks</p>
      </div>

      <div className="bg-gray-900 shadow rounded p-6 text-center">
        <div className="text-4xl font-bold text-green-400">
          {completedTasks}
        </div>
        <p className="text-white">Completed Tasks</p>
      </div>
    </div>
  );
};

export default Statistics;
