"use client";

import React, { useState, useEffect } from 'react';
import './DarkmodeToggle.css';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  // On initial mount, read from localStorage and update the DOM accordingly
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Update the document and localStorage when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const handleToggle = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        className="theme-checkbox"
        checked={darkMode}
        onChange={handleToggle}
        id="theme-toggle"
      />
 
      <label htmlFor="theme-toggle" className="cursor-pointer select-none">
        {darkMode ? "Light Mode" : "Dark Mode"}
      </label>
    </div>
  );
};

export default DarkModeToggle;
