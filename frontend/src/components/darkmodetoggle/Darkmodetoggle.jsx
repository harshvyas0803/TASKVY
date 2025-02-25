// // src/components/darkmodetoggle/Darkmodetoggle.jsx
// import React, { useEffect, useState } from "react";
// import { FaMoon, FaSun } from "react-icons/fa";

// const Darkmodetoggle = () => {
//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem("theme") === "dark"
//   );

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [darkMode]);

//   return (
//     <button
//       onClick={() => setDarkMode(!darkMode)}
//       className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800"
//     >
//       {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
//     </button>
//   );
// };

// export default Darkmodetoggle;

import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Darkmodetoggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? true
      : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 transition-all"
    >
      {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
    </button>
  );
};

export default Darkmodetoggle;
