import React, { useState } from "react";
import axiosInstance from "./../services/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddProjectForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const newProject = { title, description, status };
    console.log("Project submitted:", newProject);
    // Submit to backend or update state
    try {
      const result = await axiosInstance.post("/project/add", newProject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.data.project) {
        console.log(result.data);
        Swal.fire({
          text: "project added successfully",
          icon: "success",
        });
      }
      navigate("/projects");
    } catch (error) {
      Swal.fire({
        text: error?.response?.data?.message || "Someting went wrong",
        icon: "error",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 mx-auto bg-gray-900 text-white p-6 rounded-xl shadow space-y-4"
    >
      <h2 className="text-2xl font-bold text-emerald-400 mb-4">
        Add New Project
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
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-emerald-500"
        >
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 rounded"
      >
        Add Project
      </button>
    </form>
  );
};

export default AddProjectForm;
