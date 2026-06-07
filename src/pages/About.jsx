import React from 'react';
import { motion } from 'framer-motion';
import AboutSection from '../components/sections/AboutSection';
import { Link } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';

const About = () => {
  return (
    <div className="relative min-h-screen niyati-bg-pattern bg-[#e8f4f8] pt-24 pb-16">
      
      <div className="relative z-10">
        {/* Header Section */}
        <section className="container mx-auto px-4 sm:px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <motion.div
              className="inline-flex items-center px-4 py-1.5 mb-6 text-sm font-bold rounded-full text-teal-700 bg-teal-50 border border-teal-100 shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="relative flex h-2.5 w-2.5 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500" />
              </span>
              About NiyatiGroup
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Our <span className="text-teal-600">Journey</span> of Excellence
            </motion.h1>

            <motion.p
              className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              At NiyatiGroup, we specialize in Tax Consultancy, Loan Assistance and Job Recruitment, delivering expert solutions tailored to each client's needs since 2019.
            </motion.p>
          </motion.div>
        </section>

        {/* About Details Section - Wrapped in a card */}
        <section className="container mx-auto px-4 sm:px-6 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="niyati-card-dark p-8 md:p-12 shadow-2xl relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-10 opacity-5">
                <img src="/logo3.png" alt="" className="w-64 h-64" />
             </div>
             <div className="relative z-10 text-white">
                <AboutSection />
             </div>
          </motion.div>
        </section>

        {/* Core Values Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12">
          <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-slate-800 mb-4">
               Our Core <span className="text-teal-600">Values</span>
             </h2>
             <div className="w-16 h-1 bg-teal-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Integrity',
                icon: <FiCheckCircle />,
                description: 'We uphold the highest standards of honesty and ethics in all our dealings with clients and authorities.',
              },
              {
                title: 'Expertise',
                icon: <FiCheckCircle />,
                description: 'Our team of certified professionals brings deep knowledge and continuous learning to provide accurate solutions.',
              },
              {
                title: 'Client Focus',
                icon: <FiCheckCircle />,
                description: 'We prioritize your financial well-being and tailor our services to your specific needs and goals.',
              },
            ].map((value, idx) => (
              <motion.div
                key={value.title}
                className="bg-white p-8 rounded-3xl shadow-xl shadow-teal-900/5 border border-teal-50 relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full -mr-12 -mt-12 transition-all group-hover:scale-150"></div>
                <div className="text-5xl font-black text-teal-600/10 absolute top-4 left-6">0{idx + 1}</div>
                <div className="relative z-10 pt-4">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{value.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="niyati-card p-10 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/5 opacity-20 niyati-bg-pattern"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Partner with Us?</h2>
              <p className="text-lg text-teal-50/80 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
                Whether you need expert tax solutions or strategic recruitment services, NiyatiGroup is here to help drive your success.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: '#0f172a' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-slate-900 text-white rounded-xl font-bold shadow-2xl transition-all"
                  >
                    Contact Us
                  </motion.button>
                </Link>
                <Link to="/recruitment">
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: '#ffffff', color: '#0d9488' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-white text-teal-600 rounded-xl font-bold shadow-2xl transition-all"
                  >
                    Explore Recruitment
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default About;