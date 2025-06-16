import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar"; // ganti dari Navigasi ke NavBar
  
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
