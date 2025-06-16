import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-20"> {/* Padding top agar isi tidak ketimpa navbar */}
        <Outlet />
      </main>
    </>
  );
};

export default Layout;