import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axiosInstance from "../services/api";
import Swal from "sweetalert2";
import type { AxiosError } from "axios";

interface Project {
  id: number;
  title: string;
  status: "active" | "completed";
}

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const getProjects = async () => {
    try {
      const result = await axiosInstance.get("/projects", {
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
  useEffect(() => {
    getProjects();
  }, []);
  // Filtered data
  const filteredProjects = projects?.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const deleteHandler = async (id: string) => {
    try {
      const result = await axiosInstance.delete(`/project/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (result.data.project) {
        getProjects();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      Swal.fire({
        title: err?.response?.data?.message || "Something Went Wrong",
        icon: "error",
      });
    }
  };
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
            {filteredProjects?.length > 0 ? (
              filteredProjects?.map((project, index) => (
                <tr
                  key={project.id}
                  className="bg-gray-900 hover:bg-gray-800 border-b border-b-gray-50/10"
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
                      <NavLink to={`/project/${project._id}`}>
                        <FaEye />
                      </NavLink>
                    </button>
                    <button className="text-blue-600 hover:text-blue-800 cursor-pointer text-xl">
                      <NavLink to={`/update/${project._id}`}>
                        <FaEdit />
                      </NavLink>
                    </button>

                    <button
                      className="text-red-600 hover:text-red-800 cursor-pointer text-xl"
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteHandler(project._id);
                          }
                        });
                      }}
                    >
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
