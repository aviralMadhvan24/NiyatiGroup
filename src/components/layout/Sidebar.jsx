// src/components/layout/Sidebar.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  FiHome, FiUser, FiServer, FiHelpCircle, FiPhone, FiLogOut,
  FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp
} from 'react-icons/fi';
import { useNavigate, NavLink } from 'react-router-dom';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [servicesOpen, setServicesOpen] = useState(false);

  

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 border-r
        ${isCollapsed ? 'w-16' : 'w-64'}
        bg-gradient-to-br from-red-900 via-red-950 to-black text-gray-300`}
    >
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900/50 to-gray-950">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
      </div>

      <div className="flex flex-col h-full relative z-10">
        {/* Collapse Toggle Button */}
        <div className="p-4 flex justify-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-red-600 text-gray-100"
          >
            {isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
          </button>
        </div>

        {!isCollapsed && (
          <>
            {/* User Profile */}
            <div className="flex items-center mb-6 px-4">
              {user?.photoURL && (
                <img
                  src={user?.photoURL}
                  alt="User"
                  className="rounded-full w-10 h-10 border-2 border-gray-400"
                />
              )}
              <div className="ml-3 text-gray-100">
                <p className="font-medium truncate">{user?.displayName || 'User'}</p>
                <p className="text-xs truncate opacity-75">{user?.email}</p>
              </div>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 px-2 space-y-2">
              <SidebarLink to="/" icon={<FiHome />} label="Home" />
              <SidebarLink to="/about" icon={<FiUser />} label="About" />

              {/* Services Dropdown */}
              <div className="space-y-1">
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-600 text-left text-gray-200"
                >
                  <span className="flex items-center">
                    <FiServer size={20} />
                    <span className="ml-3">Services</span>
                  </span>
                  {servicesOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                </button>
                {servicesOpen && (
                  <div className="ml-8 space-y-1">
                    <SidebarLink to="/tax" label="Taxes" />
                    <SidebarLink to="/loans" label="Loan Assistance" />
                    <SidebarLink to="/recruitment" label="Job Recruitment" />
                  </div>
                )}
              </div>

              <SidebarLink to="/faq" icon={<FiHelpCircle />} label="FAQ" />
              <SidebarLink to="/contact" icon={<FiPhone />} label="Contact" />
            </nav>

            {/* Logout */}
            <div className="px-4 pb-4 mt-auto">
              <button
                onClick={handleLogout}
                className="flex items-center w-full p-3 rounded-lg hover:bg-red-600 text-gray-200"
              >
                <FiLogOut size={20} />
                <span className="ml-3">Logout</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Reusable NavLink component
const SidebarLink = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center p-3 rounded-lg hover:bg-red-600 ${
        isActive ? 'bg-red-900 text-white' : 'text-gray-200'
      }`
    }
  >
    {icon && icon}
    <span className={icon ? 'ml-3' : ''}>{label}</span>
  </NavLink>
);

export default Sidebar;
