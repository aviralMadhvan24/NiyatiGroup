import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// import businessMeeting from '../assets/business-meeting.jpg'; // Replace with your actual image path
// import taxConsulting from '../assets/tax-consulting.jpg';    // Replace with your actual image path

const MainComponent = () => {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-44 lg:pb-32 bg-gradient-to-br from-red-900 to-gray-950 overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900/50 to-gray-950/80">
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]"></div>
        </div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              width: Math.random() * 10 + 2,
              height: Math.random() * 10 + 2,
              opacity: 0
            }}
            animate={{
              y: [null, Math.random() * 100 - 50],
              x: [null, Math.random() * 100 - 50],
              opacity: [0, 0.1, 0]
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </motion.div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center justify-center px-4 py-2 w-64 h-14 mb-8 font-medium rounded-full text-white bg-gradient-to-r from-blue-600 to-blue-800 border border-blue-700/50 mx-auto shadow-lg"
          >
            <span className="bg-white/10 px-3 py-1 rounded-full mr-2 text-xs">Trusted Since 2010</span>
            NiyatiGroup Services
          </motion.div>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-100 leading-tight mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <motion.span 
                  className="inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Strategic
                </motion.span>{' '}
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  Business Solutions
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Partner with us for comprehensive business services that drive growth and ensure compliance
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Link 
                  to="/contact" 
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-700 hover:to-blue-900 flex items-center justify-center"
                >
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link 
                  to="/about" 
                  className="px-8 py-3 bg-white/10 text-white font-medium rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2">
              {/* Service Options Grid */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                {/* Tax Service Option */}
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative"
                >
                  <Link to="/tax" className="block h-full">
                    <div className="bg-gray-800/80 hover:bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 h-full overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-0"></div>
                      {/* <img 
                        src={taxConsulting} 
                        alt="Tax Consulting" 
                        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 group-hover:opacity-30 transition-opacity duration-500"
                      /> */}
                      <div className="relative z-10">
                        <div className="bg-blue-900/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4 border border-blue-800/30 group-hover:bg-blue-900/30 group-hover:border-blue-800/50 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-100 mb-2">Tax Services</h3>
                        <p className="text-gray-300 mb-4">Expert tax consultancy to maximize your savings and ensure compliance</p>
                        <div className="inline-flex items-center text-blue-400 font-medium text-sm">
                          Explore Services
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:translate-x-1 transition-transform">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
                
                {/* Recruitment Service Option */}
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative"
                >
                  <Link to="/recruitment" className="block h-full">
                    <div className="bg-gray-800/80 hover:bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 h-full overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-0"></div>
                      {/* <img 
                        src={businessMeeting} 
                        alt="Recruitment Services" 
                        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 group-hover:opacity-30 transition-opacity duration-500"
                      /> */}
                      <div className="relative z-10">
                        <div className="bg-blue-900/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4 border border-blue-800/30 group-hover:bg-blue-900/30 group-hover:border-blue-800/50 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-100 mb-2">Talent Solutions</h3>
                        <p className="text-gray-300 mb-4">Comprehensive recruitment services for businesses and professionals</p>
                        <div className="inline-flex items-center text-blue-400 font-medium text-sm">
                          Explore Services
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:translate-x-1 transition-transform">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-blue-600/10 blur-3xl -z-0"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute top-20 right-10 w-40 h-40 rounded-full bg-blue-800/10 blur-3xl -z-0"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
      />
    </section>
  );
};

export default MainComponent;