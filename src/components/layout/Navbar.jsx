import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiUser, FiServer, FiHelpCircle, FiPhone, FiLogOut,
  FiChevronDown, FiChevronUp, FiMenu, FiX 
} from 'react-icons/fi';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';
const Navbar = () => {
const [showLoginModal, setShowLoginModal] = useState(false);
const [protectedRouteTarget, setProtectedRouteTarget] = useState(null);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef(null);
    const handleLogin = async () => {
      try {
        await signInWithPopup(auth, provider);
        navigate("/");
      } catch (err) {
        console.error(err);
      }}

  // Define protected routes
  const protectedRoutes = ['/tax', '/loans', '/recruitment', '/faq', '/contact'];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setShowLogoutModal(false);
    await logout();
    navigate('/login');
  };

const handleNavigation = (to, isSubLink = false) => {
  // Always allow navigation to non-protected routes
  if (!protectedRoutes.includes(to)) {
    setIsMenuOpen(false);
    return true;
  }
  
  // For protected routes, check if user is logged in
  if (!user) {
    setIsMenuOpen(false);
    setProtectedRouteTarget(to);
    setShowLoginModal(true);
    return false;
  }
  
  setIsMenuOpen(false);
  return true;
};

  const navLinks = [
    { name: 'Home', path: '/', icon: <FiHome /> },
    { name: 'About', path: '/about', icon: <FiUser /> },
    { 
      name: 'Services', 
      path: '/services', 
      icon: <FiServer />,
      subLinks: [
        { name: 'Taxes', path: '/tax' },
        { name: 'Loan Assistance', path: '/loans' },
        { name: 'Job Recruitment', path: '/recruitment' },
      ]
    },
    { name: 'FAQ', path: '/faq', icon: <FiHelpCircle /> },
    { name: 'Contact', path: '/contact', icon: <FiPhone /> },
  ];

  // Handle services click - navigate and toggle dropdown
  const handleServicesClick = (e, path) => {
    e.preventDefault();
    if (handleNavigation(path)) {
      navigate(path);
    }
    setServicesOpen(!servicesOpen);
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-gradient-to-r from-red-900/95 via-red-950/95 to-black/95 shadow-lg py-2' : 
        'bg-gradient-to-r from-red-900 via-red-950 to-black py-4'
      }`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <NavLink 
              to="/" 
              className="flex items-center space-x-3"
              onClick={() => window.scrollTo(0, 0)}
            >
              <motion.div
                className="bg-gray-900/50 border border-gray-800 w-10 h-10 rounded-lg flex items-center justify-center shadow-md"
                whileHover={{ scale: 1.05 }}
              >
                <img src="/logo3.png" alt="Logo" className="w-8 h-8" />
              </motion.div>
              <span className="text-white font-bold text-lg">
                Niyati<span className="text-gray-400">Group</span>
              </span>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <div key={link.name} className="relative" ref={link.subLinks ? dropdownRef : null}>
                  {link.subLinks ? (
                    <>
                      <NavLink
                        to={link.path}
                        onClick={(e) => handleServicesClick(e, link.path)}
                        className={({ isActive }) => 
                          `flex items-center px-3 py-2 text-sm font-medium ${
                            isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                          }`
                        }
                      >
                        {link.icon}
                        <span className="ml-2">{link.name}</span>
                        {servicesOpen ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />}
                      </NavLink>
                      {servicesOpen && (
                        <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gradient-to-b from-red-900 via-red-950 to-black border border-red-800 z-50">
                          <div className="py-1">
                            {link.subLinks.map((subLink) => (
                              <NavLink
                                key={subLink.name}
                                to={subLink.path}
                                onClick={(e) => {
                                  if (!handleNavigation(subLink.path, true)) {
                                    e.preventDefault();
                                  }
                                }}
                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-red-600 hover:text-white"
                              >
                                {subLink.name}
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={link.path}
                      onClick={(e) => {
                        if (!handleNavigation(link.path)) {
                          e.preventDefault();
                        }
                      }}
                      className={({ isActive }) => 
                        `px-3 py-2 text-sm font-medium flex items-center ${
                          isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                        }`
                      }
                    >
                      {link.icon}
                      <span className="ml-2">{link.name}</span>
                    </NavLink>
                  )}
                </div>
              ))}

              {/* User/Auth Section */}
              {user ? (
                <div className="flex items-center space-x-4">
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-8 h-8 rounded-full border-2 border-gray-400"
                    />
                  )}
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="cursor-pointer flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
                  >
                    <FiLogOut className="mr-1" />
                    Logout
                  </button>
                </div>
              ) : (
                <NavLink
                  to={"/login"}
                  className="cursor-pointer px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-md hover:bg-green-800 transition-colors"
                >
                  Login
                </NavLink>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-red-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden bg-gradient-to-b from-red-900 via-red-950 to-black shadow-lg overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-3">
                {user && (
                  <div className="mb-4 p-3 bg-red-900/30 rounded-lg">
                    <p className="font-medium text-white">{user.displayName || 'User'}</p>
                    <p className="text-xs text-gray-300">{user.email}</p>
                  </div>
                )}

                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <div key={link.name} className="relative" ref={link.subLinks ? dropdownRef : null}>
                      {link.subLinks ? (
                        <>
                          <div className="flex items-center">
          <NavLink
            to={link.path}
            onClick={() => {
              setServicesOpen(false); // Close dropdown when main link is clicked
              handleNavigation(link.path);
            }}
            className={({ isActive }) => 
              `px-3 py-2 text-sm font-medium flex items-center ${
                isActive ? 'text-white' : 'text-gray-300 hover:text-white'
              }`
            }
          >
            {link.icon}
            <span className="ml-2">{link.name}</span>
          </NavLink>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setServicesOpen(!servicesOpen);
            }}
            className="p-1 text-gray-300  hover:text-white focus:outline-none ml-auto"
          >
            {servicesOpen ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
          </button>
        </div>
        {servicesOpen && (
          <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gradient-to-b from-red-900 via-red-950 to-black border border-red-800 z-50">
            <div className="py-1">
              {link.subLinks.map((subLink) => (
                <NavLink
                  key={subLink.name}
                  to={subLink.path}
                  onClick={() => {
                    setServicesOpen(false);
                    handleNavigation(subLink.path, true);
                  }}
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-red-600 hover:text-white"
                >
                  {subLink.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </>
    ) : (
      <NavLink
        to={link.path}
        onClick={() => handleNavigation(link.path)}
        className={({ isActive }) => 
          `px-3 py-2 text-sm font-medium flex items-center ${
            isActive ? 'text-white' : 'text-gray-300 hover:text-white'
          }`
        }
      >
        {link.icon}
        <span className="ml-2">{link.name}</span>
      </NavLink>
    )}
  </div>
))}
                </div>

                <div className="mt-3 pt-3 border-t border-red-800">
                  {user ? (
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className="cursor-pointer w-full flex items-center justify-center p-3 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                    >
                      <FiLogOut className="mr-2" />
                      Logout
                    </button>
                  ) : (
                    <NavLink
                      to="/login"
                      className="cursor-pointer block w-full text-center p-3 rounded-lg bg-green-700 hover:bg-green-800 text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </NavLink>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gradient-to-br from-red-900 via-red-950 to-black rounded-lg p-6 max-w-sm w-full mx-4 border border-red-800">
            <h3 className="text-xl font-semibold text-white mb-4">Confirm Logout</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="cursor-pointer px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="cursor-pointer px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      {showLoginModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-gradient-to-br from-red-900 via-red-950 to-black rounded-lg p-6 max-w-sm w-full mx-4 border border-red-800">
      <h3 className="text-xl font-semibold text-white mb-4">Login Required</h3>
      <p className="text-gray-300 mb-6">Please login to access this page.</p>
      <div className="flex justify-end space-x-3">
        <button
          onClick={() => setShowLoginModal(false)}
          className="cursor-pointer px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            setShowLoginModal(false);
            navigate('/login', { state: { from: protectedRouteTarget } });
          }}
          className="cursor-pointer px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
        >
          Login
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default Navbar;