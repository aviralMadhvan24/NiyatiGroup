import React from 'react';
import { motion } from 'framer-motion';
import AboutSection from '../components/sections/AboutSection';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="relative bg-red-950 text-gray-300 min-h-screen overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900/50 to-gray-950">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              width: Math.random() * 8 + 2,
              height: Math.random() * 8 + 2,
            }}
            animate={{
              y: [null, Math.random() * 40 - 20],
              x: [null, Math.random() * 40 - 20],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 pt-20 pb-16">
        {/* Header Section */}
        <section className="container mx-auto px-4 sm:px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <motion.div
              className="inline-flex items-center px-3 py-1.5 mb-4 text-sm font-medium rounded-full text-white bg-gray-800/80 border border-gray-700 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="relative flex h-2.5 w-2.5 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500" />
              </span>
              About NiyatiGroup
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-100 leading-tight mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Our <span className="text-primary">Journey</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              At NiyatiGroup, we specialize in Tax Consultancy and Job Recruitment, delivering expert solutions tailored to each client's needs since 2019.
            </motion.p>
          </motion.div>
        </section>

        {/* About Details Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 md:p-8 shadow-lg"
          >
            <AboutSection />
          </motion.div>
        </section>

        {/* Core Values Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 md:p-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-6 text-center">
              Our Core <span className="text-primary">Values</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Integrity',
                  description: 'We uphold the highest standards of honesty and ethics in all our dealings with clients and authorities.',
                },
                {
                  title: 'Expertise',
                  description: 'Our team of certified professionals brings deep knowledge and continuous learning to provide accurate solutions.',
                },
                {
                  title: 'Client Focus',
                  description: 'We prioritize your financial well-being and tailor our services to your specific needs and goals.',
                },
              ].map((value, idx) => (
                <motion.div
                  key={value.title}
                  className="bg-gray-800/50 p-6 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                >
                  <div className="text-4xl font-bold text-primary mb-3">0{idx + 1}</div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-2">{value.title}</h3>
                  <p className="text-gray-300 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-indigo-600/20 to-blue-600/20 border border-gray-800 rounded-xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-100 mb-4">Ready to Partner with Us?</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-6">
              Whether you need expert tax solutions or strategic recruitment services, NiyatiGroup is here to help drive your success.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 bg-gray-600 hover:bg-red-800 text-white rounded-lg font-medium shadow-md transition-colors text-sm"
                >
                  Contact Us
                </motion.button>
              </Link>
              <Link to="/recruitment">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-800 text-white rounded-lg font-medium shadow-md transition-colors text-sm"
                >
                  Explore Recruitment
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default About;