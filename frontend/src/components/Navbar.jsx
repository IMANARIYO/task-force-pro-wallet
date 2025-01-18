import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-blue-500 p-4 shadow-md">
      <div className="flex items-center justify-between">
        {/* Logo or App Name */}
        <div className="text-white text-2xl font-bold">TaskForce Wallet</div>

        {/* Links in Navbar */}
        <div>
          <ul className="flex space-x-6">
            {navLinks.map(link => (
              <li key={link.to}>

                <NavLink
                  to={link.to}
                  className={({ isActive }) => (isActive ? "text-yellow-500" : "text-white hover:text-blue-200")}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
