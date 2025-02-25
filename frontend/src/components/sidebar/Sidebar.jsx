 

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import taskvylogo from '../../../public/assets/taskvylogo.png';
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
  // State to control whether the sidebar is expanded (true) or collapsed (false)
  const [isOpen, setIsOpen] = useState(true);

  // Automatically collapse/expand sidebar based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Run on mount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle the sidebar open/closed
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Navigation items with labels, icons, and routes
  const navItems = [
    { label: 'Dashboard', icon: <FaTachometerAlt />, route: '/' },
    { label: 'Todos', icon: <FaTasks />, route: '/todos' },
    { label: 'Notes', icon: <FaStickyNote />, route: '/notes' },
    { label: 'Calendar', icon: <FaCalendarAlt />, route: '/calender' },
    { label: 'Reminder', icon: <FaBell />, route: '/reminder' },
    { label: 'Analytics', icon: <FaChartLine />, route: '/analytics' },
    { label: 'Settings', icon: <FaCog />, route: '/settings' },
  ];

  return (
    <div className="flex">
      <div
        className={`h-screen  transition-all duration-300 p-0 md:p-2 ${
          isOpen ? 'w-35 md:w-60' : 'w-12 md:w-16'
        } bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-900 dark:to-black text-black dark:text-white`}
      >
        <div className="flex items-center justify-between mt-9">
          <button onClick={toggleSidebar} className="p-2 md:p-0 focus:outline-none">
            <Hamburger toggled={isOpen} toggle={toggleSidebar} size={24} color="#fff" />
          </button>
        </div>
        <nav className="mt-10 space-y-6">
          {navItems.map((item, index) => (
            <Link href={item.route} key={index} className="group block">
              <div className="flex items-center gap-3 p-2 rounded-lg transition-colors duration-200 hover:bg-gray-700">
                <span className="text-xl">{item.icon}</span>
                {isOpen && (
                  <span className="text-lg font-medium group-hover:text-gray-200">
                    {item.label}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
