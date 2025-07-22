import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaTwitter  
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const Footer = () => {
  const { user } = useAuth(); 
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  
const socialLinks = {
  twitter: 'https://x.com/GroupNiyat95176',
  facebook: 'https://www.facebook.com/profile.php?id=61578598741738',
 
  instagram: 'https://www.instagram.com/niyatigroup1/?hl=en',
};

  const IconMap = {
    twitter: FaTwitter,
    facebook: FaFacebookF,
    linkedin: FaLinkedinIn,
    instagram: FaInstagram
  };
    const protectedRoutes = ['/tax', '/loans', '/recruitment', '/faq', '/contact'];
    const handleNavigation = (path) => {
    if (protectedRoutes.includes(path) && !user) {
      navigate('/login');
      window.scrollTo(0, 0); 
      return false;
    }
    navigate(path);
    window.scrollTo(0, 0); 
    return true;
  };
    return (
    <footer className="relative bg-red-950 text-gray-300 pt-16 pb-10 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900/50 to-gray-950">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <div className="flex items-center">
              <motion.div 
                className="bg-red-600 w-10 h-10 rounded-xl flex items-center justify-center"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className="text-white font-bold text-xl">N</span>
              </motion.div>
              <span className="ml-3 text-xl font-bold text-gray-100">
                Niyati<span className="text-red-500">Group</span>
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-400">
          Offering <strong>Tax Consultancy</strong>, <strong>Loan Services</strong> &amp; <strong>Recruitment Solutions</strong>
        </p>
          <div className="flex space-x-3">
  {Object.entries(socialLinks).map(([social, url], index) => {
    const Icon = IconMap[social];
    return (
      <motion.a
        key={social}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -3, color: '#3b82f6' }}
        whileTap={{ scale: 0.95 }}
        className="bg-gray-900 p-2 rounded-lg border border-gray-800 hover:border-red-500/30 text-gray-400 hover:text-red-400 transition-all"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 * index }}
      >
        <Icon className="w-4 h-4" />
      </motion.a>
    );
  })}
</div>

          </motion.div>

          {/* Services Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            <h3 className="text-base font-bold text-gray-100">Our Services</h3>
            <ul className="space-y-2">
             {[
            { name: "Income Tax", path: "/tax" },
            { name: "GST", path: "/tax" },
            { name: 'Permanent Staffing', path: '/recruitment' },
            { name: 'Contract Staffing', path: '/recruitment' },
            { name: 'Executive Search', path: '/recruitment' },
            { name: 'IT Recruitment', path: '/recruitment' },
            { name: "Business Loans", path: "/loans" },
            { name: "Personal Loans", path: "/loans" },
            { name: "Home Loans", path: "/loans" }
          ].map((service, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <button 
                onClick={() => handleNavigation(service.path)}
                className="cursor-pointer flex items-center text-sm text-gray-400 hover:text-red-400 transition-colors group w-full text-left"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-400"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                {service.name}
              </button>
            </motion.li>
          ))}
            </ul>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            <h3 className="text-base font-bold text-gray-100">Quick Links</h3>
            <ul className="space-y-2">
             {[
            { name: 'Home', path: '/' },
            { name: 'About Us', path: '/about' },
            { name: 'Services', path: '/services' },
            { name: 'Contact', path: '/contact' }
          ].map((link, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + index * 0.05 }}
            >
              <button 
                onClick={() => handleNavigation(link.path)}
                className="flex cursor-pointer items-center text-sm text-gray-400 hover:text-red-400 transition-colors group w-full text-left"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-400"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                {link.name}
              </button>
            </motion.li>
          ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-5"
          >
            <h3 className="text-base font-bold text-gray-100">Contact Info</h3>
            <address className="not-italic space-y-3">
              <div className="flex items-start">
                <div className="bg-blue-500/10 p-1.5 rounded-lg mr-3 border border-blue-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <p className="text-sm text-gray-400">Rajni Niwas, 616, Ganesh Nagar,<br />Bareilly, Uttar Pradesh, 243001</p>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-500/10 p-1.5 rounded-lg mr-3 border border-blue-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <a href="mailto:info@niyatigroup.com" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">niyatigroup1@gmail.com</a>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-500/10 p-1.5 rounded-lg mr-3 border border-blue-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <a href="tel:+919997070599" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">+91 9997070599,   </a>
              <a href="tel:+917060439854" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">+91 7060439854 </a>
              </div>
            </address>

            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open(
                  "https://wa.me/+919997070599?text=Hi%2C%20I%20would%20like%20to%20request%20a%20consultation.",
                  "_blank"
                )}
                className="w-full px-4 py-2.5 bg-red-600 hover:bg-red-800 rounded-lg cursor-pointer text-sm text-white font-medium transition-colors"
              >
                Request Consultation
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Copyright */}
        <motion.div 
          className="border-t border-gray-800 pt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
     {/* Bottom Copyright Section */}
<div className="border-t border-gray-800 pt-6 text-center">
  <p className="text-sm text-gray-500">
    © {currentYear} Niyati Group. All rights reserved.
  </p>
  
  {/* Add Legal Links Here */}
  <div className="flex justify-center space-x-4 mt-2">
    <NavLink 
      to="/terms" 
      className="text-xs text-gray-400 hover:text-white transition-colors"
      onClick={() => window.scrollTo(0, 0)}
    >
      Terms of Service
    </NavLink>
    <NavLink 
      to="/privacy" 
      className="text-xs text-gray-400 hover:text-white transition-colors"
      onClick={() => window.scrollTo(0, 0)}
    >
      Privacy Policy
    </NavLink>
  </div>

  
</div>
        {/* New services line */}
       <p className="mt-4 text-xs text-gray-400 flex items-center justify-center space-x-1">
            <span>Made by</span>
            <a 
              href="https://www.click2biz.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center hover:text-red-400 transition-colors"
            >
              <img 
                src="/logo.png" 
                alt="Click2Biz Logo" 
                className="h-4 w-auto inline-block mr-1" 
              />
              <span>Team Click2Biz</span>
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;