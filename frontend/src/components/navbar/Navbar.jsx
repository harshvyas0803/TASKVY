import React from "react"; 
 import Darkmodetoggle from '../darkmodetoggle/Darkmodetoggle';
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar-3d  w-[98%] ml-4 flex items-center justify-between p-4 bg-white/80 dark:bg-gray-800/30 backdrop-blur-lg rounded-full mt-2 shadow-2xl border border-gray-200 dark:border-gray-700 transform transition-transform hover:-translate-y-1 max-h-20">
      {/* Left side: Search Bar */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search tasks..."
          className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-80 text-black dark:text-white"
        />
      </div>

      {/* Right side: Dark Mode Toggle and "+ Add task" Button */}
      <div className="flex items-center space-x-4">
        <Darkmodetoggle />
        <button className="relative p-1 group">
  {/* Outer gradient layer */}
  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg transition duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-90" />
  {/* Inner button layer */}
  <div className="relative px-8 py-2 bg-gray-900 dark:bg-gray-800 rounded-lg text-white transition duration-300 ease-in-out group-hover:bg-transparent">
    + Add Task
  </div>
</button>

      </div>
    </nav>
  );
};

export default Navbar;