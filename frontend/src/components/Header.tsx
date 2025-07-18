import { FaProjectDiagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-6 bg-gray-800 shadow">
      <div className="flex items-center space-x-2">
        <FaProjectDiagram className="text-2xl text-emerald-400" />
        <span className="text-xl font-bold text-emerald-400">
          Project Management
        </span>
      </div>

      <NavLink
        to="/login"
        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-500"
      >
        Log in
      </NavLink>
    </header>
  );
};

export default Header;
