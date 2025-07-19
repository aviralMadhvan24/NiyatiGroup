import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RecruitmentServices = () => {
   const gradientBg = 'bg-gradient-to-br from-red-700 via-red-800 to-black';
  const services = [
    { id: 1, title: 'Permanent Staffing', description: 'End-to-end recruitment for permanent roles across industries, aligning talent with company culture.', whatsappLink: 'https://wa.me/919997070599?text=Hi%20NiyatiGroup,%20I%20am%20interested%20in%20Permanent%20Staffing' },
    { id: 2, title: 'Contract Staffing', description: 'Flexible staffing solutions for project-based needs, scaling workforce seamlessly.', whatsappLink: 'https://wa.me/919997070599?text=Hi%20NiyatiGroup,%20I%20need%20Contract%20Staffing%20services' },
    { id: 3, title: 'Executive Search', description: 'Headhunting senior-level and C-suite talent to drive leadership excellence.', whatsappLink: 'https://wa.me/919997070599?text=Hi%20NiyatiGroup,%20I%20want%20Executive%20Search%20services' },
    { id: 4, title: 'Bulk Hiring', description: 'Efficient large-scale recruitment for startups and new divisions.', whatsappLink: 'https://wa.me/919997070599?text=Hi%20NiyatiGroup,%20I%20require%20Bulk%20Hiring' }
  ];

  const specializations = [
    { title: 'Technology', description: 'Developers, engineers, and IT specialists to fuel innovation.', icon: 'M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244' },
    { title: 'Finance', description: 'Accountants, analysts, and CFOs for robust financial management.', icon: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { title: 'Healthcare', description: 'Nurses, administrators, and specialists for vital health services.', icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' }
  ];

  const processSteps = [
    { step: '01', title: 'Needs Assessment', description: 'Understanding your requirements, culture, and role specifics.' },
    { step: '02', title: 'Talent Sourcing', description: 'Leveraging our network and tools to identify qualified candidates.' },
    { step: '03', title: 'Screening & Vetting', description: 'Rigorous evaluation of skills, experience, and fit.' },
    { step: '04', title: 'Placement & Onboarding', description: 'Seamless support through final selection and integration.' }
  ];

  const testimonials = [
    { quote: 'NiyatiGroup found us an exceptional CTO in record time.', name: 'Rajesh Mehta', role: 'CEO, TechNova', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { quote: 'Their candidates were top-tier and perfectly matched our culture.', name: 'Priya Sharma', role: 'HR Director, FinEdge', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { quote: 'They placed me in a company that aligned with my goals.', name: 'Amit Patel', role: 'Senior Developer', avatar: 'https://randomuser.me/api/portraits/men/67.jpg' }
  ];

  return (
    <div className={`relative ${gradientBg} text-gray-100 min-h-screen overflow-hidden`}>
      {/* Shared Background */}
      <motion.div className="absolute inset-0 overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-gray-950">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10"
            initial={{ x: Math.random()*100, y: Math.random()*100, width: Math.random()*10+2, height: Math.random()*10+2 }}
            animate={{ y: [null, Math.random()*50-25], x: [null, Math.random()*50-25] }}
            transition={{ duration: Math.random()*10+10, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 ">
        {/* Hero */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 text-center">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }} className="max-w-3xl mx-auto">
              <motion.div className="inline-flex items-center px-4 py-2 mb-6 font-medium rounded-full bg-gray-800/80 border border-gray-700 backdrop-blur-sm text-white" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}>
                <span className="relative flex h-3 w-3 mr-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span></span>
                Strategic Talent Solutions
              </motion.div>
              <motion.h1 className="text-5xl font-bold text-gray-100 mb-4" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}>Recruitment <span className="text-red-500">Services</span></motion.h1>
              <motion.p className="text-xl text-gray-400 mb-8" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.6 }}>
                Connecting exceptional talent with leading organizations.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row justify-center gap-4" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.8 }}>
                <Link to="/recruitment/apply"><motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.98 }} className="px-8 py-3.5 bg-red-600 hover:bg-red-800 rounded-lg text-white font-medium shadow-lg">Apply for Jobs</motion.button></Link>
                <Link to="/recruitment/contact"><motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.98 }} className="px-8 py-3.5 bg-gray-900/80 hover:bg-gray-800 rounded-lg text-gray-100 font-medium border border-gray-700 backdrop-blur-sm">Partner With Us</motion.button></Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }} className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-4xl font-bold text-gray-100">Our <span className="text-red-500">Solutions</span></h2>
              <p className="mt-4 text-gray-400">Tailored recruitment services for every need.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map(s => (
                <motion.div key={s.id} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 flex flex-col hover:border-blue-500/30 transition" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }} whileHover={{ y:-5 }}>
                  <h3 className="text-xl font-semibold text-gray-100 mb-2">{s.title}</h3>
                  <p className="text-gray-400 flex-grow">{s.description}</p>
                  <a href={s.whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-red-600 hover:text-red-800">Contact via WhatsApp</a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Specializations */}
        <section className="py-16 md:py-24 bg-red-950/50 border-t border-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }} className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-4xl font-bold text-gray-100">Our <span className="text-red-500">Specializations</span></h2>
              <p className="mt-4 text-gray-400">Industry-focused expertise for precise talent matching.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {specializations.map((sp, i) => (
                <motion.div key={i} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500/30 transition" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1, duration:0.5 }} whileHover={{ y:-5 }}>
                  <div className="bg-blue-500/10 p-3 rounded-lg mb-4 border border-blue-500/20 inline-block">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500"><path strokeLinecap="round" strokeLinejoin="round" d={sp.icon} /></svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-100 mb-2">{sp.title}</h3>
                  <p className="text-gray-400">{sp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 md:py-24 bg-red-950/50 border-y border-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }} className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-4xl font-bold text-gray-100">Our <span className="text-red-500">Process</span></h2>
              <p className="mt-4 text-gray-400">A streamlined approach for perfect placements.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map((ps, i) => (
                <motion.div key={i} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500/30 transition" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1, duration:0.5 }} whileHover={{ y:-5 }}>
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500/10 w-12 h-12 rounded-full flex items-center justify-center border border-blue-500/20 text-blue-500 font-bold">{ps.step}</div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-100 mb-2">{ps.title}</h3>
                  <p className="text-gray-400">{ps.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-red-950/50">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }} className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-4xl font-bold text-gray-100">Success <span className="text-red-500">Stories</span></h2>
              <p className="mt-4 text-gray-400">Hear from satisfied clients and candidates.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <motion.div key={i} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 transition hover:border-blue-500/30" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1, duration:0.5 }}>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, idx) => (
                      <svg key={idx} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-400"><path fillRule="evenodd" d="M10.788..." clipRule="evenodd" /></svg>
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-4">"{t.quote}"</p>
                  <div className="flex items-center">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full mr-3" />
                    <div>
                      <h4 className="text-gray-100 font-semibold">{t.name}</h4>
                      <p className="text-gray-400 text-sm">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br bg-red-950/50 text-center">
          <div className="container mx-auto px-4 md:px-6">
            <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }} className="text-4xl font-bold text-gray-100 mb-4">Ready to Build Your <span className="text-red-500">Dream Team</span>?</motion.h2>
            <motion.p initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.2, duration:0.5 }} className="text-gray-400 mb-8">Let our experts connect you with top talent today.</motion.p>
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.4, duration:0.5 }} className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact"><motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.98 }} className="cursor-pointer px-8 py-3.5 bg-red-600 hover:bg-red-800 rounded-lg text-white font-medium shadow-lg">Get Started</motion.button></Link>
              <a href="tel:+919997070599"><motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.98 }} className="cursor-pointer px-8 py-3.5 bg-gray-900/80 hover:bg-gray-800 rounded-lg text-gray-100 font-medium border border-gray-700 backdrop-blur-sm">Call Our Experts</motion.button></a>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RecruitmentServices;
