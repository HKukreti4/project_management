import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import DashboardHome from "./pages/DashboardHome";
import Projects from "./pages/Projects";
import AddProject from "./pages/AddProject";
import ProjectDetails from "./pages/ProjectDetails";
import UpdateProject from "./pages/UpdateProject";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/add" element={<AddProject />} />
        <Route path="/project/:projectId" element={<ProjectDetails />} />
        <Route path="/update/:projectId" element={<UpdateProject />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
