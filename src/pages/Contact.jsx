import React from 'react';
import ContactForm from '../components/sections/ContactForm';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="relative min-h-screen niyati-bg-pattern bg-[#e8f4f8] pt-32 pb-20 overflow-hidden">
      
      {/* Content Section */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            className="inline-flex items-center px-4 py-2 mb-6 font-bold rounded-full text-teal-700 bg-teal-50 border border-teal-100 shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
            </span>
            Get in Touch
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold text-slate-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Connect with Our <span className="text-teal-600">Experts</span>
          </motion.h1>

          <motion.p
            className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            Reach out to our professionals for expert advice, support, and personalized solutions tailored to your financial and staffing goals.
          </motion.p>
        </div>

        {/* Contact Form Wrapper - Updated for theme consistency */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[3rem] overflow-hidden shadow-2xl shadow-teal-900/10 border border-teal-50"
          >
            <ContactForm />
          </motion.div>
        </div>

        {/* Map Section */}
        <div className="mt-24 max-w-6xl mx-auto">
          <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-slate-800">Visit Our <span className="text-teal-600">Head Office</span></h2>
             <div className="w-16 h-1 bg-teal-600 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full aspect-[2/1] rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl"
          >
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3511.409896550413!2d79.39968057549034!3d28.34645467582223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a001ad1ccdb735%3A0xe77d309c2ea8cc23!2sNiyati%20Tax%20%26%20Financial%20Services!5e0!3m2!1sen!2sin!4v1752815570141!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
