import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaTwitter  
} from 'react-icons/fa';
const Footer = () => {
  const currentYear = new Date().getFullYear();
const socials = ['twitter', 'facebook', 'linkedin', 'instagram'];

    const IconMap = {
    twitter: FaTwitter,            // use FaTwitter for the X / Twitter logo
    facebook: FaFacebookF,
    linkedin: FaLinkedinIn,
    instagram: FaInstagram
  };
  
  return (
     <footer className="relative bg-red-950 text-gray-300 pt-20 pb-12 overflow-hidden">
           {/* Background elements */}
           <div className="absolute inset-0 overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900/50 to-gray-950">
               <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
             </div>
           </div>
   
           <div className="container mx-auto px-4 md:px-6 relative z-10">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
               {/* Brand Column */}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6 }}
                 className="space-y-6"
               >
                 <div className="flex items-center">
                   <motion.div 
                     className="bg-red-600 w-12 h-12 rounded-xl flex items-center justify-center"
                     whileHover={{ rotate: 5, scale: 1.05 }}
                     transition={{ type: "spring", stiffness: 400 }}
                   >
                     <span className="text-white font-bold text-2xl">N</span>
                   </motion.div>
                   <span className="ml-4 text-2xl font-bold text-gray-100">
                     Niyati<span className="text-red-500">Group</span>
                   </span>
                 </div>
                 <p className="text-gray-400 leading-relaxed">
                   Connecting exceptional talent with leading organizations through innovative recruitment solutions.
                 </p>
                 <div className="flex space-x-4">
                   {['twitter', 'facebook', 'linkedin', 'instagram'].map((social, index) => {
                     const Icon = IconMap[social];
                     return(
                       <motion.a
                         key={social}
                       href="#"
                       whileHover={{ y: -5, color: '#3b82f6' }}
                       whileTap={{ scale: 0.95 }}
                       className="bg-gray-900 p-3 rounded-lg border border-gray-800 hover:border-red-500/30 text-gray-400 hover:text-red-400 transition-all"
                       initial={{ opacity: 0 }}
                       whileInView={{ opacity: 1 }}
                       viewport={{ once: true }}
                       transition={{ delay: 0.1 * index }}
                     >
                         <Icon className="w-5 h-5" />
                     </motion.a>
                   )})}

                 </div>
               </motion.div>
   
               {/* Services Column */}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.1 }}
                 className="space-y-6"
               >
                 <h3 className="text-lg font-bold text-gray-100">Our Services</h3>
                 <ul className="space-y-3">
                   {['Permanent Staffing', 'Contract Staffing', 'Executive Search', 'IT Recruitment', 'HR Consulting'].map((service, index) => (
                     <motion.li
                       key={index}
                       initial={{ opacity: 0, x: -10 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: 0.1 + index * 0.05 }}
                     >
                       <Link 
                         to="/services" 
                         className="flex items-center text-gray-400 hover:text-red-400 transition-colors group"
                       >
                         <svg 
                           xmlns="http://www.w3.org/2000/svg" 
                           width="16" 
                           height="16" 
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
                         {service}
                       </Link>
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
                 className="space-y-6"
               >
                 <h3 className="text-lg font-bold text-gray-100">Quick Links</h3>
                 <ul className="space-y-3">
                   {[
                     { name: 'Home', path: '/' },
                     { name: 'About Us', path: '/about' },
                     { name: 'Services', path: '/services' },
                     { name: 'Careers', path: '/careers' },
                     { name: 'Contact', path: '/contact' }
                   ].map((link, index) => (
                     <motion.li
                       key={index}
                       initial={{ opacity: 0, x: -10 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: 0.15 + index * 0.05 }}
                     >
                       <Link 
                         to={link.path} 
                         className="flex items-center text-gray-400 hover:text-red-400 transition-colors group"
                       >
                         <svg 
                           xmlns="http://www.w3.org/2000/svg" 
                           width="16" 
                           height="16" 
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
                       </Link>
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
                 className="space-y-6"
               >
                 <h3 className="text-lg font-bold text-gray-100">Contact Info</h3>
                 <address className="not-italic space-y-4">
                   <div className="flex items-start">
                     <div className="bg-blue-500/10 p-2 rounded-lg mr-4 border border-blue-500/20">
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                         <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                         <circle cx="12" cy="10" r="3"></circle>
                       </svg>
                     </div>
                     <p className="text-gray-400">123 Corporate Tower,<br />Mumbai, MH 400001</p>
                   </div>
                   
                   <div className="flex items-start">
                     <div className="bg-blue-500/10 p-2 rounded-lg mr-4 border border-blue-500/20">
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                         <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                         <polyline points="22,6 12,13 2,6"></polyline>
                       </svg>
                     </div>
                     <a href="mailto:info@niyatigroup.com" className="text-gray-400 hover:text-blue-400 transition-colors">info@niyatigroup.com</a>
                   </div>
                   
                   <div className="flex items-start">
                     <div className="bg-blue-500/10 p-2 rounded-lg mr-4 border border-blue-500/20">
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                         <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                       </svg>
                     </div>
                     <a href="tel:+919876543210" className="text-gray-400 hover:text-blue-400 transition-colors">+91 98765 43210</a>
                   </div>
                 </address>
   
                 <div className="pt-4">
                   <motion.button
                     whileHover={{ scale: 1.03 }}
                     whileTap={{ scale: 0.98 }}
                     className="w-full px-6 py-3 bg-red-600 hover:bg-red-800 rounded-lg cursor-pointer text-white font-medium transition-colors"
                   >
                     Request Consultation
                   </motion.button>
                 </div>
               </motion.div>
             </div>
   
             {/* Bottom Copyright */}
             <motion.div 
               className="border-t border-gray-800 pt-8 text-center"
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.4 }}
             >
               <p className="text-gray-500">
                 © {currentYear} Niyati Group. All rights reserved.
               </p>
               <p className="mt-2 text-sm text-gray-600">
                 Transforming organizations through strategic talent acquisition
               </p>
             </motion.div>
           </div>
         </footer>
  );
};

export default Footer;