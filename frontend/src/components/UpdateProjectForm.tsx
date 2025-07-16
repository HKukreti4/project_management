import React, { useEffect, useState } from "react";
import axiosInstance from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

type ProjectStatus = "active" | "completed";
type title = string;
type description = string;

const UpdateProjectForm = () => {
  const [title, setTitle] = useState<title>("");
  const [description, setDescription] = useState<description>("");
  const [status, setStatus] = useState<ProjectStatus>("active");
  const navigate = useNavigate();
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
        setTitle(result.data.projects[0].title);
        setDescription(result.data.projects[0].description);
        setStatus(result.data.projects[0].status);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProjectById();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProject: {
      title: title;
      description: description;
      status: ProjectStatus;
    } = { title, description, status };

    // Submit to backend or update state
    try {
      const result = await axiosInstance.put(
        `/project/${params.projectId}`,
        updatedProject,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (result.data.project) {
        navigate(`/project/${params.projectId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mt-4 mx-auto bg-gray-900 text-white p-6 rounded-xl shadow space-y-4"
      >
        <h2 className="text-2xl font-bold text-emerald-400 mb-4">
          Update Project
        </h2>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ProjectStatus)}
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-emerald-500"
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 cursor-pointer hover:bg-emerald-500 text-white font-semibold py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProjectForm;
