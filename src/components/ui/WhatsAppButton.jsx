import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/+919997070599"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-center border-2 border-white/20"
      >
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-teal-300 rounded-full border-2 border-white animate-pulse"></div>
        <FaWhatsapp className="text-3xl" />
      </motion.div>
      
      {/* Tooltip */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none border border-white/10">
        Chat with our experts
        <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-slate-900 rotate-45 border-r border-t border-white/10"></div>
      </div>
    </motion.a>
  );
};

export default WhatsAppButton;