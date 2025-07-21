// src/components/layout/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  FiHome, FiUser, FiServer, FiHelpCircle, FiPhone, FiLogOut,
  FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp, FiMenu, FiX
} from 'react-icons/fi';
import { useNavigate, NavLink } from 'react-router-dom';

// Define which routes are protected
const protectedRoutes = ['/tax', '/loans', '/recruitment', '/faq', '/contact'];

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    setShowLogoutModal(false);
    await logout();
    navigate('/login');
  };

  const handleNavigation = (to) => {
    // If route is protected and user is not logged in
    if (protectedRoutes.includes(to) && !user) {
      if (isMobile) {
        setMobileMenuOpen(false);
      } else {
        toggleSidebar(); // Collapse the sidebar on desktop
      }
      navigate('/login');
      return false; // Prevent default navigation
    }
    return true; // Allow default navigation
  };

  // Desktop Sidebar
  if (!isMobile) {
    return (
      <>
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
                {/* User Profile - Only shown when logged in */}
                {user && (
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
                )}

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
                        <SidebarLink to="/tax" label="Taxes" handleNavigation={handleNavigation} />
                        <SidebarLink to="/loans" label="Loan Assistance" handleNavigation={handleNavigation} />
                        <SidebarLink to="/recruitment" label="Job Recruitment" handleNavigation={handleNavigation} />
                      </div>
                    )}
                  </div>

                  <SidebarLink to="/faq" icon={<FiHelpCircle />} label="FAQ" handleNavigation={handleNavigation} />
                  <SidebarLink to="/contact" icon={<FiPhone />} label="Contact" handleNavigation={handleNavigation} />
                </nav>

                {/* Logout - Only shown when logged in */}
                {user && (
                  <div className="px-4 pb-4 mt-auto">
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className="flex items-center w-full p-3 rounded-lg hover:bg-red-600 text-gray-200"
                    >
                      <FiLogOut size={20} />
                      <span className="ml-3">Logout</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Logout Confirmation Modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gradient-to-br from-red-900 via-red-950 to-black rounded-lg p-6 max-w-sm w-full mx-4 border border-red-800">
              <h3 className="text-xl font-semibold text-white mb-4">Confirm Logout</h3>
              <p className="text-gray-300 mb-6">Are you sure you want to log out?</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Mobile Top Navigation
  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-900 via-red-950 to-black text-gray-300 p-2 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full hover:bg-red-600 text-gray-100"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            {user?.photoURL && (
              <img
                src={user?.photoURL}
                alt="User"
                className="rounded-full w-8 h-8 border-2 border-gray-400 ml-2"
              />
            )}
          </div>
          {user ? (
            <button
              onClick={() => setShowLogoutModal(true)}
              className="p-2 rounded-full hover:bg-red-600 text-gray-100"
            >
              <FiLogOut size={20} />
            </button>
          ) : (
            <NavLink 
              to="/login" 
              className="p-2 rounded-full hover:bg-red-600 text-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </NavLink>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-gradient-to-b from-red-900 via-red-950 to-black text-gray-300 border-b shadow-lg">
          <div className="p-4">
            {user && (
              <div className="mb-4 text-center">
                <p className="font-medium text-white">{user?.displayName || 'User'}</p>
                <p className="text-xs opacity-75">{user?.email}</p>
              </div>
            )}

            <nav className="space-y-2">
              <MobileSidebarLink to="/" icon={<FiHome />} label="Home" />
              <MobileSidebarLink to="/about" icon={<FiUser />} label="About" />

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
                    <MobileSidebarLink to="/tax" label="Taxes" handleNavigation={handleNavigation} />
                    <MobileSidebarLink to="/loans" label="Loan Assistance" handleNavigation={handleNavigation} />
                    <MobileSidebarLink to="/recruitment" label="Job Recruitment" handleNavigation={handleNavigation} />
                  </div>
                )}
              </div>

              <MobileSidebarLink to="/faq" icon={<FiHelpCircle />} label="FAQ" handleNavigation={handleNavigation} />
              <MobileSidebarLink to="/contact" icon={<FiPhone />} label="Contact" handleNavigation={handleNavigation} />
            </nav>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal (Mobile) */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gradient-to-br from-red-900 via-red-950 to-black rounded-lg p-6 max-w-sm w-full mx-4 border border-red-800">
            <h3 className="text-xl font-semibold text-white mb-4">Confirm Logout</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Reusable NavLink components
const SidebarLink = ({ to, icon, label, handleNavigation }) => (
  <NavLink
    to={to}
    onClick={(e) => {
      if (handleNavigation && !handleNavigation(to)) {
        e.preventDefault();
      }
    }}
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

const MobileSidebarLink = ({ to, icon, label, handleNavigation }) => (
  <NavLink
    to={to}
    onClick={(e) => {
      if (handleNavigation && !handleNavigation(to)) {
        e.preventDefault();
      }
      window.innerWidth < 768 && document.activeElement.blur();
    }}
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