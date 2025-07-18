import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const location = useLocation();

  // Detect scroll to shrink header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(null);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    {
      name: 'Services',
      path: '/services',
      subLinks: [
        { name: 'Job Recruitment', path: '/recruitment' },
        { name: 'Taxes', path: '/tax' },
        { name: 'Loan Assistance', path: '/loans' },
      ],
    },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleMouseEnter = (idx) => {
    clearTimeout(hoverTimeout);
    setDropdownOpen(idx);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setDropdownOpen(null);
    }, 300); // 300ms delay before closing
    setHoverTimeout(timeout);
  };

  const toggleDropdown = (idx) => {
    setDropdownOpen(dropdownOpen === idx ? null : idx);
  };

  // Our page-wide gradient
  const pageBg = 'bg-gradient-to-br from-red-700/20 via-red-800/30 to-black/70';

  return (
    <header className={`${pageBg} fixed top-0 w-full z-50 transition-shadow duration-500 ${
      scrolled
        ? 'backdrop-blur-sm bg-red-950/80 shadow-xl'
        : 'bg-transparent'
    }`}>
      {/* Background floating particles */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-gray-950" />
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
            }}
            animate={{
              x: [null, `+=${Math.random() * 20 - 10}`],
              y: [null, `+=${Math.random() * 20 - 10}`],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <NavLink to="/" onClick={() => window.scrollTo(0, 0)}>
            <motion.div
              className="flex items-center cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="bg-gray-900/50 border border-gray-800 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shadow-md"
                whileHover={{ scale: 1.05 }}
              >
                <img src="/logo3.png" alt="Niyati Group Logo" className="w-8 h-8 md:w-10 md:h-10" />
              </motion.div>
              <motion.span
                className="ml-3 text-white font-bold text-lg md:text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Niyati<span className="text-gray-400">Group</span>
              </motion.span>
            </motion.div>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link, idx) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.subLinks && handleMouseEnter(idx)}
                onMouseLeave={() => link.subLinks && handleMouseLeave()}
              >
                <div className="flex items-center space-x-1 cursor-pointer">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `px-3 py-2 text-sm font-medium transition-colors ${
                        isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                  {link.subLinks && (
                    <motion.svg
                      className={`w-4 h-4 text-gray-300 ${
                        dropdownOpen === idx ? 'rotate-180' : ''
                      } transition-transform duration-200`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </motion.svg>
                  )}
                </div>

                {link.subLinks && dropdownOpen === idx && (
                  <motion.div
                    className="absolute left-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg z-50 border border-gray-800"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseEnter={() => handleMouseEnter(idx)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {link.subLinks.map(sl => (
                      <NavLink
                        key={sl.name}
                        to={sl.path}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm transition ${
                            isActive
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                          }`
                        }
                      >
                        {sl.name}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}

            <motion.div whileHover={{ scale: 1.05 }}>
              <NavLink
                to="/"
                className="px-4 py-2 bg-red-600 hover:bg-red-800 text-white text-sm font-medium rounded-lg transition"
              >
                Get Started
              </NavLink>
            </motion.div>
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-gray-300 p-2 rounded-lg hover:bg-gray-800 transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden bg-gray-900/80 backdrop-blur-sm"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link, idx) => (
                <div key={link.name}>
                  <div className="flex justify-between items-center">
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `block w-full px-3 py-2 text-base font-medium rounded-lg ${
                          isActive
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-300 hover:bg-gray-800'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                    {link.subLinks && (
                      <button
                        onClick={() => toggleDropdown(idx)}
                        className="p-2"
                      >
                        <svg
                          className={`w-5 h-5 text-gray-300 transition-transform ${
                            dropdownOpen === idx ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                  {link.subLinks && dropdownOpen === idx && (
                    <motion.div
                      className="pl-6 mt-1 space-y-1"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {link.subLinks.map(sl => (
                        <NavLink
                          key={sl.name}
                          to={sl.path}
                          className={({ isActive }) =>
                            `block px-3 py-2 text-sm rounded-lg ${
                              isActive
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-400 hover:bg-gray-800'
                            }`
                          }
                        >
                          {sl.name}
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}

              <NavLink
                to="/contact"
                className="block mt-4 px-4 py-2 bg-red-600 hover:bg-red-800 text-center text-white font-medium rounded-lg"
              >
                Contact Us
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;