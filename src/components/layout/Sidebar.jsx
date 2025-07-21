// src/components/layout/Sidebar.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiHome,FiServer, FiUser, FiSettings, FiLogOut, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useNavigate, NavLink } from 'react-router-dom';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 border-r ${isCollapsed ? 'w-16' : 'w-64'} bg-gradient-to-br from-red-900 via-red-950 to-black text-gray-300`}>      
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900/50 to-gray-950">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
      </div>
      <div className="flex flex-col h-full">
        {/* Toggle Button Always Visible */}
        <div className="p-4 flex justify-center">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-red-600 text-gray-100"
          >
            {isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
          </button>
        </div>
        {/* Rest of Sidebar only when expanded */}
        {!isCollapsed && (
          <>
            {/* User Profile */}
            <div className="flex items-center mb-6 px-4">
              {user.photoURL && (
                <img 
                  src={user.photoURL} 
                  alt="User" 
                  className="rounded-full w-10 h-10 border-2 border-gray-400"
                />
              )}
              <div className="ml-3 text-gray-100">
                <p className="font-medium truncate">{user.displayName || 'User'}</p>
                <p className="text-xs truncate opacity-75">{user.email}</p>
              </div>
            </div>
            {/* Navigation */}
            <nav className="flex-1 px-2 space-y-2">
              <NavLink to="/" className={({ isActive }) => ` cursor-pointer flex items-center p-3 rounded-lg hover:bg-red-600 ${isActive ? 'bg-red-900 text-gray-100' : 'text-gray-200'}`}>
                <FiHome size={20} />
                <span className="ml-3">Home</span>
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => `cursor-pointer flex items-center p-3 rounded-lg hover:bg-red-600 ${isActive ? 'bg-red-900 text-gray-100' : 'text-gray-200'}`}>
                <FiUser size={20} />
                <span className="ml-3">About Us</span>
              </NavLink>
              <NavLink to="/services" className={({ isActive }) => `cursor-pointer flex items-center p-3 rounded-lg hover:bg-red-600 ${isActive ? 'bg-red-900 text-gray-100' : 'text-gray-200'}`}>
                <FiServer size={20} />
                <span className="ml-3">Services</span>
              </NavLink>
            </nav>
            {/* Logout Button */}
            <div className="px-4 pb-4">
              <button 
                onClick={handleLogout}
                className="cursor-pointer flex items-center w-full p-3 rounded-lg hover:bg-red-600 text-gray-200"
              >
                <FiLogOut size={20} />
                <span className="cursor-pointer ml-3">Logout</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
