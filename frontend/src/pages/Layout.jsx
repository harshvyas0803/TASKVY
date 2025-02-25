import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <Navbar />
        <div className=" m-3 bg-amber-50 text-black  dark:bg-black dark:text-white p-4 h-[86%] max-w-[99%] rounded-4xl">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
