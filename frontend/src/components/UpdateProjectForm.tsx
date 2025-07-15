import React, { useState } from "react";

type ProjectStatus = "active" | "completed";
type title = string;
type description = string;

const UpdateProjectForm = () => {
  const [title, setTitle] = useState<title>("");
  const [description, setDescription] = useState<description>("");
  const [status, setStatus] = useState<ProjectStatus>("active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject = { title, description, status };
    console.log("Project submitted:", newProject);
    // Submit to backend or update state
  };
  return (
    <div>
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
            onChange={(e) => setStatus(e.target.value as ProjectStatus)}
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-emerald-500"
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 rounded"
        >
          Add Project
        </button>
      </form>
    </div>
  );
};

export default UpdateProjectForm;
