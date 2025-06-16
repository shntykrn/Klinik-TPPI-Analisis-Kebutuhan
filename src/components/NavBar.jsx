import React from "react";
import { Link, useLocation } from "react-router-dom";
import logoImage from "../assets/logo-tppi.png";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "REGISTRASI", path: "/registrasi" },
    { name: "REKAM MEDIS", path: "/rekam-medis" },
    { name: "SURAT SAKIT", path: "/surat-sakit" },
    { name: "STOCK OBAT", path: "/stok-obat" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="print:hidden fixed top-0 left-0 w-full z-50 bg-white shadow">
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/registrasi">
          <img src={logoImage || "/placeholder.svg"} alt="TPPI Logo" className="h-16" />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-12">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-lg font-medium ${
                isActive(item.path) ? "text-[#3a2a6d] font-semibold" : "text-gray-800 hover:text-[#3a2a6d]"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Orange bottom border */}
      <div className="h-1 w-full bg-[#f7941d]"></div>
    </nav>
  );
};

export default Navbar;