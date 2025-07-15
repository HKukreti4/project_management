import React, { useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";

interface Project {
  id: number;
  title: string;
  status: "active" | "completed";
}

// Sample data
const sampleProjects: Project[] = Array.from({ length: 27 }, (_, i) => ({
  id: i + 1,
  title: `Project ${i + 1}`,
  status: ["active", "completed"][i % 2] as "active" | "completed",
}));

const ProjectList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered data
  const filteredProjects = sampleProjects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-2 rounded-md text-white">
      {/* Top bar */}
      <div className="search flex justify-between items-center gap-4 flex-wrap">
        <h3 className="text-xl font-bold text-emerald-400 uppercase">
          Projects
        </h3>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            className="outline-none px-2 py-1 text-gray-950 bg-white rounded-md"
            placeholder="Search"
            onChange={(e) => {
              setSearchQuery(e.target.value);
              // Reset to first page when searching
            }}
          />
          <button className="bg-emerald-400 py-1 px-2 rounded-md">
            <NavLink to={"/project/add"}> Add New</NavLink>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-md mt-4">
        <table className="min-w-full table-auto text-white">
          <thead>
            <tr className="bg-gray-700 text-left text-gray-100 uppercase text-sm">
              <th className="py-3 px-4">S.No</th>
              <th className="py-3 px-4">Project Title</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <tr
                  key={project.id}
                  className="bg-gray-900 hover:bg-gray-800 border-b"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-medium">{project.title}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded-full ${
                        project?.status === "active"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 space-x-2 flex items-center ">
                    <button className="text-emerald-600 hover:text-emerald-800 cursor-pointer text-xl">
                      <NavLink to={`/project/${project.id}`}>
                        <FaEye />
                      </NavLink>
                    </button>
                    <button className="text-blue-600 hover:text-blue-800 cursor-pointer text-xl">
                      <NavLink to={`/update/${project.id}`}>
                        <FaEdit />
                      </NavLink>
                    </button>

                    <button className="text-red-600 hover:text-red-800 cursor-pointer text-xl">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-300">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectList;
