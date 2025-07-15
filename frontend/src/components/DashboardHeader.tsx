import { FaPowerOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="flex items-center justify-between space-x-4 bg-gray-900 overflow-hidden py-2 px-2 rounded-xl">
      <div className="flex gap-2">
        <img
          className="z-40 inline-block border border-cyan-500 h-10 w-10 rounded-full ring-2 ring-white ring-opacity-50"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        />
        <h3 className="text-2xl md:text-3xl font-bold text-white">
          Welcome
          {/* <span className="text-emerald-300 capitalize">user</span> */}
        </h3>
      </div>

      <button
        className="px-3 py-2 text-white bg-emerald-400 rounded-md cursor-pointer"
        onClick={logoutHandler}
      >
        <FaPowerOff />
      </button>
    </div>
  );
};

export default DashboardHeader;
