import React, { useState, useEffect } from "react";
import axiosInstance from "../services/api";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";

const UpdateTaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState("");

  const params = useParams();
  const navigate = useNavigate();
  const taskId = params.taskId;

  // ✅ Fetch and set task data
  const getTaskDetails = async () => {
    try {
      const result = await axiosInstance.get(`/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const task = result.data;
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setDueDate(task.dueDate?.substring(0, 10)); // format to yyyy-mm-dd
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      Swal.fire({
        title: err?.response?.data?.message || "Error loading task",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    if (taskId) {
      getTaskDetails();
    }
  }, [taskId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const task = { title, description, status, dueDate };

    try {
      const result = await axiosInstance.put(`/task/${taskId}`, task, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (result) {
        Swal.fire({
          title: "Successfully Updated Task",
          icon: "success",
        });
        navigate(-1); // go back
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      Swal.fire({
        title: err?.response?.data?.message || "Update Failed",
        icon: "error",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto bg-gray-900 text-white p-6 mt-4 rounded shadow space-y-4"
    >
      <h2 className="text-2xl font-bold text-emerald-400 mb-4">Update Task</h2>

      <div>
        <label className="block mb-1 font-semibold" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div>
        <label
          className="block mb-1 font-semibold text-white"
          htmlFor="dueDate"
        >
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          required
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-emerald-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 rounded"
      >
        Update Task
      </button>
    </form>
  );
};

export default UpdateTaskForm;
