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

const ADMIN_EMAIL = 'niyatigroup1@gmail.com';

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

  const isAdmin = user && user.email === ADMIN_EMAIL;

  const protectedRoutes = [
    '/tax', '/loans', '/recruitment', '/faq', '/contact', '/jobpost', '/addloan'
  ];

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
    if (!protectedRoutes.includes(to)) {
      setIsMenuOpen(false);
      return true;
    }
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
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-teal-900/5 py-2' 
          : 'bg-white/80 backdrop-blur-sm py-4'
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
                className="bg-gradient-to-br from-teal-600 to-teal-700 w-10 h-10 rounded-full flex items-center justify-center shadow-md border-2 border-white"
                whileHover={{ scale: 1.05 }}
              >
                <img src="/logo3.png" alt="Logo" className="w-8 h-8" />
              </motion.div>
              <span className="text-slate-800 font-bold text-lg">
                Niyati<span className="text-teal-600">Group</span>
              </span>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <div key={link.name} className="relative" ref={link.subLinks ? dropdownRef : null}>
                  {link.subLinks ? (
                    <>
                      <NavLink
                        to={link.path}
                        onClick={(e) => handleServicesClick(e, link.path)}
                        className={({ isActive }) => 
                          `flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                            isActive 
                              ? 'text-teal-700 bg-teal-50' 
                              : 'text-slate-600 hover:text-teal-700 hover:bg-teal-50/50'
                          }`
                        }
                      >
                        {link.icon}
                        <span className="ml-2">{link.name}</span>
                        {servicesOpen ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />}
                      </NavLink>
                      {servicesOpen && (
                        <div className="absolute left-0 mt-2 w-52 rounded-xl shadow-xl bg-white border border-teal-100 z-50 overflow-hidden">
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
                                className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition-colors"
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
                        `px-4 py-2 text-sm font-medium flex items-center rounded-lg transition-all duration-200 ${
                          isActive 
                            ? 'text-teal-700 bg-teal-50' 
                            : 'text-slate-600 hover:text-teal-700 hover:bg-teal-50/50'
                        }`
                      }
                    >
                      {link.icon}
                      <span className="ml-2">{link.name}</span>
                    </NavLink>
                  )}
                </div>
              ))}

              {isAdmin && (
                <NavLink
                  to="/admin"
                  onClick={(e) => {
                    if (!handleNavigation('/admin')) {
                      e.preventDefault();
                    }
                  }}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'text-teal-700 bg-teal-50' 
                        : 'text-slate-600 hover:text-teal-700 hover:bg-teal-50/50'
                    }`
                  }
                >
                  <FiUser />
                  <span className="ml-2">Admin</span>
                </NavLink>
              )}

              {/* User/Auth Section */}
              {user ? (
                <div className="flex items-center space-x-3 ml-4">
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-8 h-8 rounded-full border-2 border-teal-200"
                    />
                  )}
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="cursor-pointer flex items-center px-3 py-2 text-sm font-medium text-slate-500 hover:text-red-500 transition-colors"
                  >
                    <FiLogOut className="mr-1" />
                    Logout
                  </button>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="cursor-pointer ml-4 px-5 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors shadow-md shadow-teal-600/20"
                >
                  Login
                </NavLink>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-teal-700 hover:bg-teal-50 transition-colors"
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
              className="lg:hidden bg-white border-t border-teal-100 shadow-xl overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-3">
                {user && (
                  <div className="mb-4 p-3 bg-teal-50 rounded-lg">
                    <p className="font-medium text-slate-800">{user.displayName || 'User'}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
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
                                setServicesOpen(!servicesOpen);
                                handleNavigation(link.path);
                              }}
                              className={({ isActive }) => 
                                `px-3 py-2.5 text-sm font-medium flex items-center rounded-lg ${
                                  isActive ? 'text-teal-700 bg-teal-50' : 'text-slate-600 hover:text-teal-700'
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
                              className="p-1 text-slate-400 hover:text-teal-600 focus:outline-none ml-auto"
                            >
                              {servicesOpen ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
                            </button>
                          </div>
                          {servicesOpen && (
                            <div className="ml-4 mt-1 mb-2 rounded-lg bg-teal-50/50 border border-teal-100">
                              <div className="py-1">
                                {link.subLinks.map((subLink) => (
                                  <NavLink
                                    key={subLink.name}
                                    to={subLink.path}
                                    onClick={() => {
                                      setServicesOpen(false);
                                      handleNavigation(subLink.path, true);
                                    }}
                                    className="block px-4 py-2 text-sm text-slate-600 hover:bg-teal-100 hover:text-teal-700 rounded-md"
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
                            `px-3 py-2.5 text-sm font-medium flex items-center rounded-lg ${
                              isActive ? 'text-teal-700 bg-teal-50' : 'text-slate-600 hover:text-teal-700'
                            }`
                          }
                        >
                          {link.icon}
                          <span className="ml-2">{link.name}</span>
                        </NavLink>
                      )}
                    </div>
                  ))}

                  {isAdmin && (
                    <NavLink
                      to="/admin"
                      onClick={() => handleNavigation('/admin')}
                      className={({ isActive }) =>
                        `px-3 py-2.5 text-sm font-medium flex items-center rounded-lg ${
                          isActive ? 'text-teal-700 bg-teal-50' : 'text-slate-600 hover:text-teal-700'
                        }`
                      }
                    >
                      <FiUser />
                      <span className="ml-2">Admin</span>
                    </NavLink>
                  )}
                </div>
                <div className="mt-3 pt-3 border-t border-teal-100">
                  {user ? (
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className="cursor-pointer w-full flex items-center justify-center p-3 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-medium transition-colors"
                    >
                      <FiLogOut className="mr-2" />
                      Logout
                    </button>
                  ) : (
                    <NavLink
                      to="/login"
                      className="cursor-pointer block w-full text-center p-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium shadow-md"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 border border-teal-100 shadow-2xl">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Confirm Logout</h3>
            <p className="text-slate-500 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="cursor-pointer px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="cursor-pointer px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Login Required Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 border border-teal-100 shadow-2xl">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Login Required</h3>
            <p className="text-slate-500 mb-6">Please login to access this page.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLoginModal(false)}
                className="cursor-pointer px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  navigate('/login', { state: { from: protectedRouteTarget } });
                }}
                className="cursor-pointer px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors"
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
