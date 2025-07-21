// src/components/layout/Header.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

const Header = ({ toggleSidebar, isCollapsed }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    {
      name: 'Services',
      path: '/services',
      subLinks: [
        { name: 'Taxes', path: '/tax' },
        { name: 'Loan Assistance', path: '/loans' },
        { name: 'Job Recruitment', path: '/recruitment' },
      ],
    },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const pageBg = 'bg-gradient-to-br from-red-700/20 via-red-800/30 to-black/70';

  return (
    <header
      className={`
        ${pageBg}
        fixed top-0 left-0 w-full z-50 transition-shadow duration-500
        ${scrolled ? 'backdrop-blur-sm bg-red-950/80 shadow-xl' : 'bg-transparent'}
      `}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-gray-950" />
        {[...Array(6)].map((_, i) => (
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
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Menu button - visible on all screens */}
          <button
            onClick={toggleSidebar}
            className="cursor-pointer absolute ml-1 top-1/2 transform -translate-y-1/2 p-2 text-gray-300 hover:text-white"
            aria-label={isCollapsed ? 'Show sidebar' : 'Hide sidebar'}
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <NavLink to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center ml-12">
            <motion.div
              className="bg-gray-900/50 border border-gray-800 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shadow-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <img src="/logo3.png" alt="Logo" className="w-8 h-8 md:w-10 md:h-10" />
            </motion.div>
            <motion.span
              className="ml-3 text-white font-bold text-lg md:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Niyati<span className="text-gray-400">Group</span>
            </motion.span>
          </NavLink>

          {/* Desktop Nav Links only (hidden on mobile) */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map(link => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium ${
                    isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                  } transition-colors`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
