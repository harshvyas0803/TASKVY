"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import {
  FaTachometerAlt,
  FaTasks,
  FaStickyNote,
  FaCalendarAlt,
  FaBell,
  FaChartLine,
  FaCog,
} from 'react-icons/fa';
import Hamburger from 'hamburger-react';

const Sidebar = () => {
  // When isOpen is true, the sidebar is expanded.
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { label: 'Dashboard', icon: <FaTachometerAlt />, route: '/' },
    { label: 'Todos', icon: <FaTasks />, route: '/todos' },
    { label: 'Notes', icon: <FaStickyNote />, route: '/notes' },
    { label: 'Calendar', icon: <FaCalendarAlt />, route: '/calendar' },
    { label: 'Reminder', icon: <FaBell />, route: '/reminder' },
    { label: 'Analytics', icon: <FaChartLine />, route: '/analytics' },
    { label: 'Settings', icon: <FaCog />, route: '/setting' },
  ];

  return (
    <div className="flex">
      <div
        className={`bg-black text-white h-screen p-4 transition-all duration-300 ${
          isOpen ? 'w-52' : 'w-16'
        }`}
      >
        <div className="flex items-center justify-between">
          {isOpen && <h1 className="text-2xl font-bold">MyApp</h1>}
          <button onClick={toggleSidebar} className="hover:scale-110 focus:outline-none">
            <Hamburger toggled={isOpen} toggle={setIsOpen} />
          </button>
        </div>
        <nav className="mt-8">
          {navItems.map((item, index) => (
            <Link
              href={item.route}
              key={index}
              className="flex items-center gap-4 p-2 my-2 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              <span>{item.icon}</span>
              {isOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
      
    </div>
  );
};

export default Sidebar;
