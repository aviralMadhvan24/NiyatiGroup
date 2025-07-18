import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Tax = () => {
  const gradientBg = 'bg-gradient-to-br from-red-700 via-red-800 to-black';
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
      icon: 'M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z' 
    },
    { 
      title: 'Salaried Individuals', 
      description: 'Optimized tax filing and investment planning for employees.', 
      icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' 
    },
    { 
      title: 'Freelancers & Professionals', 
      description: 'Specialized tax solutions for consultants and independent professionals.', 
      icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' 
    }
  ];

  const processSteps = [
    { step: '01', title: 'Consultation', description: 'Understanding your financial situation and tax obligations.' },
    { step: '02', title: 'Document Collection', description: 'Gathering all necessary financial documents and records.' },
    { step: '03', title: 'Tax Preparation', description: 'Meticulous preparation of your tax returns and filings.' },
    { step: '04', title: 'Submission & Follow-up', description: 'Filing with authorities and handling any queries.' }
  ];

  const testimonials = [
    { quote: 'NiyatiGroup saved me over ₹50,000 in taxes with their expert planning.', name: 'Vikram Singh', role: 'Small Business Owner', avatar: 'https://randomuser.me/api/portraits/men/42.jpg' },
    { quote: 'Their GST services made compliance effortless for my startup.', name: 'Neha Gupta', role: 'Entrepreneur', avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
    { quote: 'Professional, timely, and saved me from penalties.', name: 'Arun Mehta', role: 'CA Professional', avatar: 'https://randomuser.me/api/portraits/men/75.jpg' }
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

      <div className="relative z-10">
        {/* Hero */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 text-center">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }} className="max-w-3xl mx-auto">
              <motion.div className="inline-flex items-center px-4 py-2 mb-6 font-medium rounded-full bg-gray-800/80 border border-gray-700 backdrop-blur-sm text-white" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}>
                <span className="relative flex h-3 w-3 mr-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span></span>
                Expert Tax Solutions
              </motion.div>
              <motion.h1 className="text-5xl font-bold text-gray-100 mb-4" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}>Tax <span className="text-red-500">Services</span></motion.h1>
              <motion.p className="text-xl text-gray-400 mb-8" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.6 }}>
                Comprehensive tax solutions for individuals and businesses.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row justify-center gap-4" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.8 }}>
                <Link to="/calculator"><motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.98 }} className="cursor-pointer px-8 py-3.5 bg-red-600 hover:bg-red-800 rounded-lg text-white font-medium shadow-lg">Tax Calculator</motion.button></Link>
                <Link to="/contact"><motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.98 }} className="cursor-pointer px-8 py-3.5 bg-gray-900/80 hover:bg-gray-800 rounded-lg text-gray-100 font-medium border border-gray-700 backdrop-blur-sm">Consult Our Experts</motion.button></Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }} className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-4xl font-bold text-gray-100">Our Tax <span className="text-red-500">Services</span></h2>
              <p className="mt-4 text-gray-400">Complete tax solutions tailored to your needs.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map(s => (
                <motion.div key={s.id} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 flex flex-col hover:border-blue-500/30 transition" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }} whileHover={{ y:-5 }}>
                  <h3 className="text-xl font-semibold text-gray-100 mb-2">{s.title}</h3>
                  <p className="text-gray-400 flex-grow">{s.description}</p>
                  <a href={s.whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-red-600 hover:text-red-800">Get Started on WhatsApp</a>
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
              <p className="mt-4 text-gray-400">Tailored tax solutions for different needs.</p>
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
              <h2 className="text-4xl font-bold text-gray-100">Our Tax <span className="text-red-500">Process</span></h2>
              <p className="mt-4 text-gray-400">A streamlined approach for stress-free tax compliance.</p>
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
              <h2 className="text-4xl font-bold text-gray-100">Client <span className="text-red-500">Success</span></h2>
              <p className="mt-4 text-gray-400">Hear from satisfied clients about their tax experience.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <motion.div key={i} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 transition hover:border-blue-500/30" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1, duration:0.5 }}>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, idx) => (
                      <svg key={idx} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-400"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
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
            <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }} className="text-4xl font-bold text-gray-100 mb-4">Ready to Optimize Your <span className="text-red-500">Tax Strategy</span>?</motion.h2>
            <motion.p initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.2, duration:0.5 }} className="text-gray-400 mb-8">Let our experts handle your tax needs with precision and care.</motion.p>
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.4, duration:0.5 }} className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact"><motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.98 }} className="px-8 py-3.5 bg-red-600 hover:bg-red-800 cursor-pointer rounded-lg text-white font-medium shadow-lg">Get Started</motion.button></Link>
              <a href="tel:+919997070599"><motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.98 }} className="px-8 py-3.5 bg-gray-900/80 hover:bg-gray-800 rounded-lg text-gray-100 font-medium border cursor-pointer border-gray-700 backdrop-blur-sm">Call Our Experts</motion.button></a>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tax;