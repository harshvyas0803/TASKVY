"use client";

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
  const [isOpen, setIsOpen] = useState(true);

  // Automatically adjust sidebar based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

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
        className={`h-screen p-5 transition-all duration-300 ${
          isOpen ? 'w-60' : 'w-12'
        } bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-900 dark:to-black text-gray-900 dark:text-white`}
      >
        <div className="flex items-center justify-between">
          {isOpen && (
            <h1 className="text-2xl font-bold">
              <Image src={taskvylogo} alt="Logo" width={100} height={100} />
            </h1>
          )}
          <button onClick={toggleSidebar} className="p-2 md:p-0 focus:outline-none">
            <Hamburger toggled={isOpen} toggle={toggleSidebar} size={24} color="#fff" />
          </button>
        </div>
        <nav className="mt-10 space-y-6">
          {navItems.map((item, index) => (
            <Link href={item.route} key={index} className="group block">
              <div className="flex items-center gap-3 p-2 rounded-lg transition-colors duration-200 hover:bg-gray-300 dark:hover:bg-gray-700">
                <span className="text-xl">{item.icon}</span>
                {isOpen && (
                  <span className="text-lg font-medium group-hover:text-gray-700 dark:group-hover:text-gray-200">
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
