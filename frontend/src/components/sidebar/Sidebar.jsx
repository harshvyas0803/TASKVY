import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaTasks,
  FaStickyNote,
  FaCalendarAlt,
  FaBell,
  FaChartLine,
  FaCog,
} from "react-icons/fa";
import Hamburger from "hamburger-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  // Auto-collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { label: "Dashboard", icon: <FaTachometerAlt />, route: "/" },
    { label: "Todos", icon: <FaTasks />, route: "/todos" },
    { label: "Notes", icon: <FaStickyNote />, route: "/notes" },
    { label: "Calendar", icon: <FaCalendarAlt />, route: "/calendar" },
    { label: "Reminder", icon: <FaBell />, route: "/reminder" },
    { label: "Analytics", icon: <FaChartLine />, route: "/analytics" },
    { label: "Settings", icon: <FaCog />, route: "/settings" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar Container */}
      <div
        className={`flex flex-col h-full transition-all duration-300 shadow-lg 
          ${isOpen ? "w-60" : "w-16"} 
          bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4">
          {/* Toggle Button */}
          <button onClick={toggleSidebar} className="p-2 focus:outline-none">
            <Hamburger
              toggled={isOpen}
              toggle={toggleSidebar}
              size={24}
              color={isOpen ? "#000" : "#fff"} // Adjusted for dark mode
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-6">
          {navItems.map((item, index) => (
            <NavLink
              to={item.route}
              key={index}
              className={({ isActive }) =>
                `group flex items-center gap-4 p-3 mx-3 rounded-md transition-all duration-200 
                hover:bg-gray-300 dark:hover:bg-gray-700 
                ${
                  isActive
                    ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
                    : "text-gray-900 dark:text-gray-300"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span
                className={`text-lg font-medium transition-all duration-200 
                  ${isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}
              >
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
