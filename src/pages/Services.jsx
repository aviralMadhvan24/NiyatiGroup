import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiDollarSign, FiUsers, FiTrendingUp, FiCheck, FiArrowRight } from 'react-icons/fi';

const Services = () => {
  return (
    <div className="relative min-h-screen niyati-bg-pattern bg-[#e8f4f8] pt-24 pb-20">
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 md:px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 mb-6 font-bold rounded-full text-teal-700 bg-teal-50 border border-teal-100 shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
              </span>
              Trusted Business Solutions Since 2019
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-slate-800 leading-tight mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-teal-600">Niyati</span> Group Services
            </motion.h1>

            <motion.p 
              className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Comprehensive business solutions through our specialized divisions in tax consultancy, recruitment services, and financial solutions.
            </motion.p>
          </motion.div>

          {/* Service Cards - Now 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {/* Tax Services Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="niyati-card p-8 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full transition-all group-hover:scale-110"></div>
              
              <div className="flex items-center mb-6 relative z-10">
                <div className="bg-white/10 p-3 rounded-2xl mr-4 border border-white/20 backdrop-blur-sm">
                  <FiDollarSign className="text-2xl text-teal-300" />
                </div>
                <h3 className="text-2xl font-bold text-white">Niyati Tax Experts</h3>
              </div>
              
              <p className="text-teal-50/70 mb-8 relative z-10 text-sm leading-relaxed">
                Professional tax consultancy services for individuals and businesses. We help you navigate complex tax regulations with confidence.
              </p>
              
              <div className="space-y-4 mb-10 relative z-10">
                {['Income Tax Filing', 'GST Compliance', 'Tax Planning'].map((item) => (
                  <div key={item} className="flex items-center text-teal-100 text-sm">
                    <FiCheck className="text-teal-400 mr-3" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              
              <Link to="/tax" className="relative z-10 block">
                <motion.button
                  whileHover={{ scale: 1.03, backgroundColor: '#ffffff', color: '#0d9488' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-4 bg-teal-500/20 hover:bg-white border border-white/30 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  Explore Tax Services
                  <FiArrowRight />
                </motion.button>
              </Link>
            </motion.div>

            {/* Recruitment Services Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="niyati-card p-8 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full transition-all group-hover:scale-110"></div>
              
              <div className="flex items-center mb-6 relative z-10">
                <div className="bg-white/10 p-3 rounded-2xl mr-4 border border-white/20 backdrop-blur-sm">
                  <FiUsers className="text-2xl text-teal-300" />
                </div>
                <h3 className="text-2xl font-bold text-white">Niyati Recruitment</h3>
              </div>
              
              <p className="text-teal-50/70 mb-8 relative z-10 text-sm leading-relaxed">
                Strategic talent solutions connecting top professionals with leading organizations. We bridge the gap between talent and opportunity.
              </p>
              
              <div className="space-y-4 mb-10 relative z-10">
                {['Executive Search', 'Permanent Staffing', 'Talent Acquisition'].map((item) => (
                  <div key={item} className="flex items-center text-teal-100 text-sm">
                    <FiCheck className="text-teal-400 mr-3" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              
              <Link to="/recruitment" className="relative z-10 block">
                <motion.button
                  whileHover={{ scale: 1.03, backgroundColor: '#ffffff', color: '#0d9488' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-4 bg-teal-500/20 hover:bg-white border border-white/30 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  Explore Recruitment
                  <FiArrowRight />
                </motion.button>
              </Link>
            </motion.div>

            {/* Loan Services Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="niyati-card p-8 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full transition-all group-hover:scale-110"></div>
              
              <div className="flex items-center mb-6 relative z-10">
                <div className="bg-white/10 p-3 rounded-2xl mr-4 border border-white/20 backdrop-blur-sm">
                  <FiTrendingUp className="text-2xl text-teal-300" />
                </div>
                <h3 className="text-2xl font-bold text-white">Niyati Financial</h3>
              </div>
              
              <p className="text-teal-50/70 mb-8 relative z-10 text-sm leading-relaxed">
                Tailored financial solutions to help businesses and individuals achieve their goals through strategic lending and investment services.
              </p>
              
              <div className="space-y-4 mb-10 relative z-10">
                {['Business Loans', 'Personal Loans', 'Investment Advisory'].map((item) => (
                  <div key={item} className="flex items-center text-teal-100 text-sm">
                    <FiCheck className="text-teal-400 mr-3" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              
              <Link to="/loans" className="relative z-10 block">
                <motion.button
                  whileHover={{ scale: 1.03, backgroundColor: '#ffffff', color: '#0d9488' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-4 bg-teal-500/20 hover:bg-white border border-white/30 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  Explore Loan Services
                  <FiArrowRight />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Values Section in a rounded container */}
        <section className="container mx-auto px-4 md:px-6 py-10">
           <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-teal-900/5 border border-teal-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5 -mr-16 -mt-16 bg-teal-600 w-64 h-64 rounded-full"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
                 <div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-6">About Niyati Group</h2>
                    <p className="text-slate-500 mb-6 leading-relaxed">
                      Founded in 2019, Niyati Group has grown to become a trusted name in professional services with three specialized divisions catering to distinct business needs.
                    </p>
                    <p className="text-slate-500 mb-10 leading-relaxed font-medium">
                      Our mission is to deliver exceptional value through expertise, integrity, and personalized service across all our offerings.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="bg-teal-50 px-5 py-3 rounded-2xl border border-teal-100 shadow-sm">
                        <p className="text-teal-700 font-bold text-sm">15+ Years Experience</p>
                      </div>
                      <div className="bg-sky-50 px-5 py-3 rounded-2xl border border-sky-100 shadow-sm">
                        <p className="text-sky-700 font-bold text-sm">5000+ Clients Served</p>
                      </div>
                    </div>
                 </div>

                 <div className="bg-teal-50 p-8 rounded-[2rem] border border-teal-100">
                    <h3 className="text-xl font-bold text-slate-800 mb-8 text-center italic">"Excellence in every detail"</h3>
                    <div className="space-y-6">
                       {[
                         { title: "Integrity", desc: "Highest ethical standards in all dealings" },
                         { title: "Expertise", desc: "Certified professionals with deep knowledge" },
                         { title: "Client Focus", desc: "Solutions tailored to unique requirements" }
                       ].map((val) => (
                         <div key={val.title} className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-teal-100/50">
                            <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-teal-600/20">
                               <FiCheck className="text-white" />
                            </div>
                            <div>
                               <h4 className="font-bold text-slate-800">{val.title}</h4>
                               <p className="text-sm text-slate-500">{val.desc}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 md:px-6 py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="niyati-card p-12 text-center rounded-[3rem] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mt-32"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
              <p className="text-xl text-teal-50/70 max-w-2xl mx-auto mb-10 leading-relaxed">
                Whether you need tax expertise, recruitment solutions, or financial services, our team is ready to assist you.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: '#ffffff', color: '#0d9488' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-white text-teal-700 rounded-xl font-bold shadow-2xl transition-all"
                  >
                    Contact Us Now
                  </motion.button>
                </Link>
                <a href="tel:+919997070599">
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: '#0f172a' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-slate-900 text-white rounded-xl font-bold shadow-2xl border border-white/10 transition-all flex items-center justify-center gap-2"
                  >
                    <FiPhone />
                    Call Our Experts
                  </motion.button>
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Services;