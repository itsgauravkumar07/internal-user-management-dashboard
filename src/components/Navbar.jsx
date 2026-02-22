import { useState } from "react";
import { useAppContext } from "../context/AppProvider";
import { MdMenu, MdClose } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const { currentRole } = useAppContext();
  const [menu, setMenu] = useState(false);

  return (
    <nav className="bg-gray-900 border-b border-white/10 sticky top-0 z-50">
      <div className="flex items-center justify-between px-5 py-4">

        {/* Logo / Title */}
        <h1 className="text-white font-semibold text-lg md:text-2xl tracking-tight">
          Internal Dashboard
        </h1>

        {/* Mobile Section */}
        <div className="flex items-center gap-3 ">
          <span className="text-xs px-2 py-1 md:text-sm md:px-4 md:py-2 bg-blue-800/60 text-white font-medium rounded-lg border border-blue-600/40">
            {currentRole}
          </span>

          <button onClick={() => setMenu(!menu)} className="md:hidden">
            {menu ? (
              <MdClose className="text-white w-6 h-6" />
            ) : (
              <MdMenu className="text-white w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menu && (
        <div className="md:hidden bg-gray-900 border-t border-white/10">
          <div className="flex flex-col px-5 py-4 gap-3">
            <NavbarItem to="/dashboard" label="Dashboard" end />
            <NavbarItem to="/dashboard/users" label="Users" />
            <NavbarItem to="/dashboard/requests" label="Requests" />
          </div>
        </div>
      )}
    </nav>
  );
}

function NavbarItem({ to, label, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `
        text-sm font-medium transition-colors duration-200
        ${isActive
          ? "text-white"
          : "text-slate-400 hover:text-white"}
        `
      }
    >
      {label}
    </NavLink>
  );
}