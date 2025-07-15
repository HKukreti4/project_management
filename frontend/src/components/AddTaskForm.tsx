import React, { useState } from "react";

const AddTaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const task = { title, description, status, dueDate };
    console.log("Task submitted:", task);
    // Call API or state update logic here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-gray-900 text-white p-6 rounded shadow space-y-4"
    >
      <h2 className="text-2xl font-bold text-emerald-400 mb-4">Add New Task</h2>

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
        <label className="block mb-1 font-semibold" htmlFor="dueDate">
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          required
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-emerald-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 rounded"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
