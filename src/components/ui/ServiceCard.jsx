import React from 'react';
import { motion } from 'framer-motion';

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6,
        delay: 0.2 + index * 0.1
      }}
      whileHover={{ 
        y: -8,
        backgroundColor: "rgba(17, 24, 39, 1)", // gray-900
        boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.25)"
      }}
      className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 relative"
    >
      {/* Main Content */}
      <div className="p-8 h-full flex flex-col z-10 relative">
        {/* Icon Container */}
        <motion.div 
          className="bg-gray-700 p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 border border-gray-600"
          whileHover={{ 
            rotate: 5,
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderColor: 'rgba(239, 68, 68, 0.3)'
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: 0.3 + index * 0.1,
              type: "spring",
              stiffness: 500,
              damping: 15
            }}
          >
            {service.icon || (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="28" 
                height="28" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-red-400" // Changed to red for consistency
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            )}
          </motion.div>
        </motion.div>
        
        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-50 mb-3">{service.title}</h3>
          <p className="text-gray-300 leading-relaxed">{service.description}</p>
        </div>
        
        {/* CTA Button */}
        <motion.div 
          className="mt-8"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <a 
            href={service.whatsappLink} 
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-gray-500 rounded-lg text-gray-50 font-medium transition-all duration-300 group"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-5 h-5 mr-2 text-green-400 group-hover:text-green-300 transition-colors"
            >
              <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
            </svg>
            Get Expert Help
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
              className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </motion.div>
      </div>
      
      {/* Floating Decoration */}
      <motion.div 
        className="absolute top-0 right-0 w-16 h-16 bg-red-900/20 rounded-bl-2xl border-t border-r border-red-800/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 + index * 0.1 }}
      />

      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;