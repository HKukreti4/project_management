import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axiosInstance from "../services/api";
import Swal from "sweetalert2";
import type { AxiosError } from "axios";

interface TaskType {
  _id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
}

const TaskList = () => {
  const [tasks, setTasks] = useState<TaskType[] | null>(null);
  const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | TaskType["status"]>(
    "all"
  );
  const params = useParams();

  const getTask = async () => {
    try {
      const result = await axiosInstance.get(`/tasks/${params.projectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (result) {
        setTasks(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id: string) => {
    try {
      const result = await axiosInstance.delete(`/task/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (result) {
        getTask();
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

  useEffect(() => {
    getTask();
  }, []);

  // Filter tasks based on selected status
  const filteredTasks =
    statusFilter === "all"
      ? tasks
      : tasks?.filter((task) => task.status === statusFilter);

  return (
    <div className="bg-gray-900 p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-emerald-300">Tasks</h2>
        <NavLink
          to={`/task/add/${params.projectId}`}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded"
        >
          + Add Task
        </NavLink>
      </div>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label className="text-white mr-2">Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as "all" | TaskType["status"])
          }
          className="px-3 py-1 rounded bg-gray-800 text-white"
        >
          <option value="all">All</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {filteredTasks?.length === 0 ? (
        <p className="text-gray-400">No tasks available.</p>
      ) : (
        <ul className="space-y-3">
          {filteredTasks?.map((task) => (
            <li
              key={task._id}
              className="flex justify-between items-center bg-gray-800 p-3 rounded relative group"
              onMouseEnter={() => setHoveredTaskId(task._id)}
              onMouseLeave={() => setHoveredTaskId(null)}
            >
              <span>{task.title}</span>
              <span
                className={`text-sm px-2 py-1 rounded-full ${
                  task.status === "todo"
                    ? "bg-red-500"
                    : task.status === "in-progress"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              >
                {task.status}
              </span>

              {hoveredTaskId === task._id && (
                <div className="absolute top-3 right-3 flex gap-2 bg-gray-700 p-2 rounded-md">
                  <NavLink
                    to={`/task/edit/${task._id}`}
                    className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                  >
                    View
                  </NavLink>
                  <button
                    className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded cursor-pointer"
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
                          deleteHandler(task._id);
                        }
                      });
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
