import DashboardLayout from "../layouts/Dashboard";

const ProjectDetails = () => {
  // Sample project data
  const project = {
    title: "Website Redesign",
    description: "Redesign the homepage and product pages for better UX.",
    status: "Active",
  };

  // Sample tasks data
  const tasks = [
    { id: 1, title: "Design homepage mockup", status: "in-progress" },
    { id: 2, title: "Update product listing UI", status: "todo" },
    { id: 3, title: "Test responsiveness", status: "done" },
  ];

  return (
    <DashboardLayout>
      <div className="py-6 text-white bg-gray-950 ">
        <h1 className="text-3xl font-bold text-emerald-400 mb-6">
          Project Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project Info */}
          <div className="bg-gray-900 p-6 rounded  shadow">
            <h2 className="text-2xl font-semibold text-emerald-300 mb-4">
              Project Info
            </h2>
            <p>
              <span className="font-bold text-gray-300">Title:</span>{" "}
              {project.title}
            </p>
            <p className="mt-2">
              <span className="font-bold text-gray-300">Description:</span>{" "}
              {project.description}
            </p>
            <p className="mt-2">
              <span className="font-bold text-gray-300">Status:</span>{" "}
              <span
                className={`inline-block px-3 py-1 text-sm rounded-full ${
                  project.status === "Active"
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-600"
                }`}
              >
                {project.status}
              </span>
            </p>
          </div>

          {/* Task List */}
          <div className="bg-gray-900 p-6 rounded shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-emerald-300">Tasks</h2>
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded">
                + Add Task
              </button>
            </div>

            {tasks.length === 0 ? (
              <p className="text-gray-400">No tasks available.</p>
            ) : (
              <ul className="space-y-3">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex justify-between items-center bg-gray-800 p-3 rounded"
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
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetails;
