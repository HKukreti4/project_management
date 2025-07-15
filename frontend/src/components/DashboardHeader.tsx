const DashboardHeader = () => {
  return (
    <div className="flex items-center space-x-4 bg-gray-900 overflow-hidden py-2 px-2 rounded-xl">
      <div className="flex">
        <img
          className="z-40 inline-block border border-cyan-500 h-10 w-10 rounded-full ring-2 ring-white ring-opacity-50"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        />
      </div>

      <h3 className="text-2xl md:text-3xl font-bold text-white">
        Welcome <span className="text-emerald-300 capitalize">user</span>
      </h3>
    </div>
  );
};

export default DashboardHeader;
