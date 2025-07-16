import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/Dashboard";
import axiosInstance from "../services/api";
import { useParams } from "react-router-dom";
import TaskList from "../components/TaskList";

type projectData = {
  _id: string;
  title: string;
  description: string;
  status: string;
  userId: string;
};

const ProjectDetails = () => {
  // Sample project data
  const [project, setProject] = useState<projectData | null>(null);
  const params = useParams();
  const getProjectById = async () => {
    try {
      const result = await axiosInstance.get(`/project/${params.projectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(result);
      if (result.data.projects) {
        setProject(result.data.projects[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProjectById();
  }, []);

  return (
    <DashboardLayout>
      <div className="py-6 text-white bg-gray-950 ">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {/* Project Info */}
          <div className="bg-gray-900 p-6 rounded  shadow">
            <h2 className="text-2xl font-semibold text-emerald-300 mb-4">
              Project Info
            </h2>
            <p>
              <span className="font-bold text-gray-300">Title:</span>{" "}
              {project?.title}
            </p>
            <p className="mt-2">
              <span className="font-bold text-gray-300">Description:</span>{" "}
              {project?.description}
            </p>
            <p className="mt-2">
              <span className="font-bold text-gray-300">Status:</span>{" "}
              <span
                className={`inline-block px-3 py-1 text-sm rounded-full ${
                  project?.status === "Active"
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-600"
                }`}
              >
                {project?.status}
              </span>
            </p>
          </div>

          {/* Task List */}
          <TaskList />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetails;
