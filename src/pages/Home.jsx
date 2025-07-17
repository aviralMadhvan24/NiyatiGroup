import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative bg-gradient-to-br from-red-700 via-red-800 to-black text-gray-300 min-h-screen overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900/50 to-gray-950">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
      </div>

      <div className="relative z-10 pt-24 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 md:px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 mb-6 font-medium rounded-full text-white bg-gray-800/80 border border-gray-700 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </span>
              Trusted Business Solutions Since 2010
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-100 leading-tight mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-red-500">Niyati</span> Group
            </motion.h1>

            <motion.p 
              className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Comprehensive business solutions through our specialized divisions in tax consultancy and recruitment services.
            </motion.p>
          </motion.div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Tax Services Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:border-indigo-500/30 transition-all"
            >
              <div className="flex items-center mb-6">
                <div className="bg-indigo-500/10 p-3 rounded-xl mr-4 border border-indigo-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-100">Niyati Tax Experts</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Professional tax consultancy services for individuals and businesses. We help you navigate complex tax regulations with confidence and maximize your savings.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 mr-2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-gray-300">Income Tax Filing</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 mr-2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-gray-300">GST Compliance</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 mr-2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-gray-300">Tax Planning</span>
                </div>
              </div>
              <Link to="/tax">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 bg-red-600 hover:bg-red-800 cursor-pointer rounded-lg text-white font-medium transition-colors"
                >
                  Explore Tax Services
                </motion.button>
              </Link>
            </motion.div>

            {/* Recruitment Services Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:border-blue-500/30 transition-all"
            >
              <div className="flex items-center mb-6">
                <div className="bg-blue-500/10 p-3 rounded-xl mr-4 border border-blue-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-100">Niyati Recruitment</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Strategic talent solutions connecting top professionals with leading organizations across industries. We bridge the gap between talent and opportunity.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 mr-2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-gray-300">Executive Search</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 mr-2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-gray-300">Permanent Staffing</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 mr-2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-gray-300">Talent Acquisition</span>
                </div>
              </div>
              <Link to="/recruitment">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 bg-red-600 hover:bg-red-800 rounded-lg text-white font-medium transition-colors"
                >
                  Explore Recruitment Services
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="container mx-auto px-4 md:px-6 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 md:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-100 mb-6">About Niyati Group</h2>
                <p className="text-gray-400 mb-6">
                  Founded in 2010, Niyati Group has grown to become a trusted name in professional services with two specialized divisions catering to distinct business needs.
                </p>
                <p className="text-gray-400 mb-6">
                  Our mission is to deliver exceptional value through expertise, integrity, and personalized service across all our offerings.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-indigo-500/10 px-4 py-2 rounded-lg border border-indigo-500/20">
                    <p className="text-indigo-400 font-medium">15+ Years Experience</p>
                  </div>
                  <div className="bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20">
                    <p className="text-blue-400 font-medium">5000+ Clients Served</p>
                  </div>
                  <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
                    <p className="text-gray-300 font-medium">Industry Experts</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 h-full">
                <h3 className="text-xl font-bold text-gray-100 mb-4">Our Core Values</h3>
                <div className="space-y-4">
                  {[
                    { 
                      title: "Integrity", 
                      description: "We maintain the highest ethical standards in all our dealings",
                      icon: "M20 12H4M12 4v16"
                    },
                    { 
                      title: "Expertise", 
                      description: "Our team consists of certified professionals with deep domain knowledge",
                      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    },
                    { 
                      title: "Client Focus", 
                      description: "We tailor solutions to meet each client's unique requirements",
                      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    }
                  ].map((value, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-indigo-500/10 p-2 rounded-lg mr-4 border border-indigo-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
                          <path d={value.icon} />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-gray-100 font-medium">{value.title}</h4>
                        <p className="text-gray-500">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 md:px-6 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-indigo-600/20 to-blue-600/20 border border-gray-800 rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-100 mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Whether you need tax expertise or recruitment solutions, our team is ready to assist you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer px-8 py-3.5 bg-red-600 hover:bg-red-800 text-white rounded-lg font-medium shadow-lg transition-colors"
                >
                  Contact Us
                </motion.button>
              </Link>
              <a href="tel:+919876543210">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer px-8 py-3.5 bg-gray-900 hover:bg-gray-800 text-gray-100 border border-gray-700 rounded-lg font-medium transition-colors"
                >
                  Call Now
                </motion.button>
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Home;