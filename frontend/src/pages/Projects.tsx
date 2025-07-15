import ProjectList from "../components/ProjectList";

import DashboardLayout from "../layouts/Dashboard";

const Projects = () => {
  return (
    <DashboardLayout>
      <div className="mt-4 ">
        <ProjectList />
      </div>
    </DashboardLayout>
  );
};

export default Projects;
