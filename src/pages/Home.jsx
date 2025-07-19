import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-br from-red-700 via-red-800 to-black text-gray-300 min-h-screen overflow-hidden">

      {/* Background Grid Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900/50 to-gray-950">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6">
        <section className="max-w-screen-xl mx-auto py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row items-center lg:justify-between gap-16"
          >
            {/* LEFT: Text + Buttons */}
            <div className="w-full lg:w-3/5 space-y-6 text-center lg:text-left">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-100 leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Welcome to <span className="text-red-500">Niyati</span> Group
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Comprehensive business solutions through our specialized divisions in tax consultancy and recruitment services.
              </motion.p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
                <Link to="/services">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer px-6 py-3 bg-red-600 hover:bg-red-800 text-white font-medium rounded-lg transition-colors"
                  >
                    Explore Our Services
                  </motion.button>
                </Link>
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer px-6 py-3 bg-gray-900 hover:bg-gray-800 text-gray-100 border border-gray-700 rounded-lg font-medium transition-colors"
                  >
                    Contact Us Directly
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* RIGHT: Image */}
            <motion.div
              className="w-full max-w-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <img src="/logo3.png" alt="Niyati Group Logo" className="w-full h-auto" />
            </motion.div>
          </motion.div>
        </section>
      </div>

      {/* Office Locations Section */}
      <section className="relative z-10 bg-red-900 text-gray-200 py-20 px-4 sm:px-6">
        <div className="max-w-screen-xl mx-auto space-y-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-center text-white mb-12">
            Our Office Locations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Office 1 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Head Office - Bareilly</h3>
              <p className="text-gray-400">
                Rajni Niwas, 616, Ganesh Nagar, Bareilly, Uttar Pradesh 243001
              </p>
              <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3511.4097404534127!2d79.39968057600883!3d28.34645939701308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a001ad1ccdb735%3A0xe77d309c2ea8cc23!2sNiyati%20Tax%20%26%20Financial%20Services!5e0!3m2!1sen!2sin!4v1752819512806!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Office 2 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Branch Office - Khatima, Uttarakhand </h3>
              <p className="text-gray-400">
                Degree College Road, Khatima, Naugawa Thago, Uttarakhand 262308
              </p>
              <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d898683.7242003867!2d78.84490385571326!3d28.374467189673965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a051c9d994cd31%3A0xaeef5c9ab93ffca7!2sNiyati%20Tax%20%26%20Financial%20Services%2C%20Khatima!5e0!3m2!1sen!2sin!4v1752819508759!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
