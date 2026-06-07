import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCalculator, FiPhone, FiCheckCircle, FiShield, FiArrowRight } from 'react-icons/fi';

const Tax = () => {
  const services = [
    { 
      id: 1, 
      title: 'Income Tax Filing', 
      description: 'Comprehensive tax return preparation and filing for individuals and businesses.', 
      whatsappLink: 'https://wa.me/919997070599?text=Hi%20NiyatiGroup,%20I%20need%20help%20with%20Income%20Tax%20Filing' 
    },
    { 
      id: 2, 
      title: 'GST Services', 
      description: 'End-to-end GST registration, returns filing, and compliance solutions.', 
      whatsappLink: 'https://wa.me/919997070599?text=Hi%20NiyatiGroup,%20I%20need%20GST%20Services' 
    },
    { 
      id: 3, 
      title: 'Tax Planning', 
      description: 'Strategic tax optimization to minimize liabilities and maximize savings.', 
      whatsappLink: 'https://wa.me/919997070599?text=Hi%20NiyatiGroup,%20I%20need%20Tax%20Planning%20services' 
    },
    { 
      id: 4, 
      title: 'Company Registration', 
      description: 'Complete business incorporation services for all entity types.', 
      whatsappLink: 'https://wa.me/919997070599?text=Hi%20NiyatiGroup,%20I%20want%20to%20register%20a%20company' 
    }
  ];

  const specializations = [
    { 
      title: 'Small Businesses', 
      description: 'Tailored tax solutions for startups and small enterprises.', 
      icon: <FiShield />
    },
    { 
      title: 'Salaried Individuals', 
      description: 'Optimized tax filing and investment planning for employees.', 
      icon: <FiCheckCircle />
    },
    { 
      title: 'Freelancers', 
      description: 'Specialized tax solutions for consultants and independent professionals.', 
      icon: <FiCalculator />
    }
  ];

  return (
    <div className="relative min-h-screen niyati-bg-pattern bg-[#e8f4f8] pt-24 pb-20">
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-20 text-center">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto">
              <motion.div className="inline-flex items-center px-4 py-2 mb-6 font-bold rounded-full text-teal-700 bg-teal-50 border border-teal-100 shadow-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <span className="relative flex h-3 w-3 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                </span>
                Expert Tax Solutions
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">Tax <span className="text-teal-600">Services</span></h1>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                Comprehensive tax solutions for individuals and businesses, delivered with precision and deep expertise.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/calculator">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-teal-600 text-white font-bold rounded-xl shadow-xl shadow-teal-900/10 transition-all flex items-center gap-2">
                    <FiCalculator />
                    Tax Calculator
                  </motion.button>
                </Link>
                <Link to="/contact">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-white text-teal-700 font-bold rounded-xl shadow-lg border border-teal-100 transition-all">
                    Consult Our Experts
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map(s => (
                <motion.div 
                  key={s.id} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="niyati-card p-8 group relative overflow-hidden h-full flex flex-col shadow-2xl shadow-teal-900/20"
                >
                  <h3 className="text-xl font-bold text-white mb-4">{s.title}</h3>
                  <p className="text-teal-50/70 text-sm mb-8 leading-relaxed flex-grow">{s.description}</p>
                  <a 
                    href={s.whatsappLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-teal-300 font-bold text-sm hover:text-white transition-colors flex items-center gap-2"
                  >
                    Get Started on WhatsApp
                    <FiArrowRight />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Specializations Section */}
        <section className="py-20 bg-white/40 backdrop-blur-sm border-y border-teal-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-800">Our <span className="text-teal-600">Specializations</span></h2>
              <div className="w-16 h-1 bg-teal-600 mx-auto mt-4 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {specializations.map((sp, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-[2rem] border border-teal-50 shadow-xl shadow-teal-900/5 hover:shadow-teal-900/10 transition-all text-center"
                >
                  <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 mx-auto text-3xl text-teal-600 shadow-inner">
                    {sp.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{sp.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{sp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
              className="niyati-card p-12 text-center rounded-[3rem] relative overflow-hidden"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Optimize Your Tax Strategy?</h2>
              <p className="text-xl text-teal-50/70 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">Let our experts handle your tax needs with precision and care.</p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/contact">
                  <motion.button whileHover={{ scale: 1.05, bg: '#ffffff', color: '#0d9488' }} whileTap={{ scale: 0.95 }} className="px-10 py-4 bg-white text-teal-700 rounded-xl font-bold shadow-2xl transition-all">
                    Get Started Now
                  </motion.button>
                </Link>
                <a href="tel:+919997070599">
                  <motion.button whileHover={{ scale: 1.05, bg: '#0f172a' }} whileTap={{ scale: 0.95 }} className="px-10 py-4 bg-slate-900 text-white rounded-xl font-bold shadow-2xl transition-all flex items-center justify-center gap-2">
                    <FiPhone />
                    Call Our Experts
                  </motion.button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tax;