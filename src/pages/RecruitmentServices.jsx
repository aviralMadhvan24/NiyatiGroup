import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiUsers, FiSearch, FiBriefcase, FiZap, FiArrowRight, FiPhone } from 'react-icons/fi';

const RecruitmentServices = () => {
  const services = [
    { id: 1, title: 'Permanent Staffing', description: 'End-to-end recruitment for permanent roles across industries, aligning talent with company culture.', whatsappLink: 'https://wa.me/919997070599?text=Hi%20NiyatiGroup,%20I%20am%20interested%20in%20Permanent%20Staffing' },
    { id: 2, title: 'Contract Staffing', description: 'Flexible staffing solutions for project-based needs, scaling workforce seamlessly.', whatsappLink: 'https://wa.me/919997070599?text=Hi%20NiyatiGroup,%20I%20need%20Contract%20Staffing%20services' },
    { id: 3, title: 'Executive Search', description: 'Headhunting senior-level and C-suite talent to drive leadership excellence.', whatsappLink: 'https://wa.me/919997070599?text=Hi%20NiyatiGroup,%20I%20want%20Executive%20Search%20services' },
    { id: 4, title: 'Bulk Hiring', description: 'Efficient large-scale recruitment for startups and new divisions.', whatsappLink: 'https://wa.me/919997070599?text=Hi%20NiyatiGroup,%20I%20require%20Bulk%20Hiring' }
  ];

  const specializations = [
    { title: 'Technology', description: 'Developers, engineers, and IT specialists to fuel innovation.', icon: <FiZap /> },
    { title: 'Finance', description: 'Accountants, analysts, and CFOs for robust financial management.', icon: <FiBriefcase /> },
    { title: 'Healthcare', description: 'Nurses, administrators, and specialists for vital health services.', icon: <FiUsers /> }
  ];

  const processSteps = [
    { step: '01', title: 'Needs Assessment', description: 'Understanding your requirements, culture, and role specifics.' },
    { step: '02', title: 'Talent Sourcing', description: 'Leveraging our network and tools to identify qualified candidates.' },
    { step: '03', title: 'Screening & Vetting', description: 'Rigorous evaluation of skills, experience, and fit.' },
    { step: '04', title: 'Placement & Onboarding', description: 'Seamless support through final selection and integration.' }
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
                Strategic Talent Solutions
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">Recruitment <span className="text-teal-600">Services</span></h1>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed font-medium">
                Connecting exceptional talent with leading organizations since 2019.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/jobs">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-teal-100/50 text-teal-800 font-bold rounded-xl border border-teal-200 transition-all">
                    Apply for Jobs
                  </motion.button>
                </Link>
                <Link to="/genericapply">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-teal-600 text-white font-bold rounded-xl shadow-xl shadow-teal-900/10 transition-all flex items-center gap-2">
                    <FiSearch />
                    Upload CV for Future
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
                  className="niyati-card p-8 group relative overflow-hidden h-full flex flex-col shadow-2xl"
                >
                  <h3 className="text-xl font-bold text-white mb-4 leading-tight">{s.title}</h3>
                  <p className="text-teal-50/70 text-sm mb-8 leading-relaxed flex-grow">{s.description}</p>
                  <a 
                    href={s.whatsappLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-teal-300 font-bold text-sm hover:text-white transition-colors flex items-center gap-2"
                  >
                    Contact via WhatsApp
                    <FiArrowRight />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 bg-white/50 backdrop-blur-sm border-y border-teal-50">
           <div className="container mx-auto px-4 md:px-6">
              <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold text-slate-800">Our <span className="text-teal-600">Recruitment Process</span></h2>
                 <div className="w-16 h-1 bg-teal-600 mx-auto mt-4 rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {processSteps.map((ps, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative text-center p-6"
                  >
                    <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center font-black text-xl mx-auto mb-6 shadow-xl shadow-teal-600/20">
                      {ps.step}
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-3">{ps.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">{ps.description}</p>
                  </motion.div>
                ))}
              </div>
           </div>
        </section>

        {/* Specializations Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-16">Industry <span className="text-teal-600">Focus</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {specializations.map((sp, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white p-10 rounded-[3rem] shadow-xl shadow-teal-900/5 border border-teal-50"
                >
                  <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-8 shadow-inner">
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Build Your Dream Team?</h2>
              <p className="text-xl text-teal-50/70 max-w-2xl mx-auto mb-10 leading-relaxed font-medium italic">Let our experts connect you with top talent today.</p>
              
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

export default RecruitmentServices;
