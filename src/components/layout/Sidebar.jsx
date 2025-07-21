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
        toggleSidebar();
      }
      navigate('/login');
      return false;
    }
    return true;
  };

  // Return null for desktop view (we'll handle desktop sidebar separately)
  if (!isMobile) {
    return null;
  }

  // Mobile view
  return (
    <>
      {/* Mobile Menu Button in Header is now handled by Header component */}
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-gradient-to-b from-red-900 via-red-950 to-black text-gray-300 pt-16 overflow-y-auto">
          <div className="p-4">
            {user && (
              <div className="mb-4 text-center">
                <p className="font-medium text-white">{user?.displayName || 'User'}</p>
                <p className="text-xs opacity-75">{user?.email}</p>
              </div>
            )}

            <nav className="space-y-2">
              <MobileSidebarLink 
                to="/" 
                icon={<FiHome />} 
                label="Home" 
                onClick={() => setMobileMenuOpen(false)}
              />
              <MobileSidebarLink 
                to="/about" 
                icon={<FiUser />} 
                label="About" 
                onClick={() => setMobileMenuOpen(false)}
              />

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
                    <MobileSidebarLink 
                      to="/tax" 
                      label="Taxes" 
                      onClick={() => setMobileMenuOpen(false)}
                    />
                    <MobileSidebarLink 
                      to="/loans" 
                      label="Loan Assistance" 
                      onClick={() => setMobileMenuOpen(false)}
                    />
                    <MobileSidebarLink 
                      to="/recruitment" 
                      label="Job Recruitment" 
                      onClick={() => setMobileMenuOpen(false)}
                    />
                  </div>
                )}
              </div>

              <MobileSidebarLink 
                to="/faq" 
                icon={<FiHelpCircle />} 
                label="FAQ" 
                onClick={() => setMobileMenuOpen(false)}
              />
              <MobileSidebarLink 
                to="/contact" 
                icon={<FiPhone />} 
                label="Contact" 
                onClick={() => setMobileMenuOpen(false)}
              />
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

const MobileSidebarLink = ({ to, icon, label, onClick, handleNavigation }) => (
  <NavLink
    to={to}
    onClick={(e) => {
      if (handleNavigation && !handleNavigation(to)) {
        e.preventDefault();
      }
      if (onClick) onClick();
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