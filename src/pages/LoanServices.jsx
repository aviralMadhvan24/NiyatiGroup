import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LoanServices = () => {
  const gradientBg = 'bg-gradient-to-br from-red-700 via-red-800 to-black';
  const loanProducts = [
    { 
      id: 1, 
      title: 'Business Loans', 
      description: 'Tailored financing solutions to help your business grow and thrive.', 
      whatsappLink: 'https://wa.me/919876543210?text=Hi%20NiyatiGroup,%20I%20am%20interested%20in%20Business%20Loans',
      icon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z'
    },
    { 
      id: 2, 
      title: 'Personal Loans', 
      description: 'Flexible personal financing for your individual needs and aspirations.', 
      whatsappLink: 'https://wa.me/919876543210?text=Hi%20NiyatiGroup,%20I%20need%20a%20Personal%20Loan',
      icon: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    { 
      id: 3, 
      title: 'Home Loans', 
      description: 'Make your dream home a reality with our competitive home loan options.', 
      whatsappLink: 'https://wa.me/919876543210?text=Hi%20NiyatiGroup,%20I%20want%20information%20about%20Home%20Loans',
      icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
    },
    { 
      id: 4, 
      title: 'Loan Against Property', 
      description: 'Unlock the value of your property for your financial needs.', 
      whatsappLink: 'https://wa.me/919876543210?text=Hi%20NiyatiGroup,%20I%20need%20a%20Loan%20Against%20Property',
      icon: 'M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244'
    }
  ];

  const advantages = [
    { 
      title: 'Competitive Rates', 
      description: 'Lower interest rates compared to market standards.', 
      icon: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z' 
    },
    { 
      title: 'Quick Approval', 
      description: 'Fast processing with minimal documentation.', 
      icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' 
    },
    { 
      title: 'Flexible Terms', 
      description: 'Customized repayment options to suit your cash flow.', 
      icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5' 
    }
  ];

  const processSteps = [
    { step: '01', title: 'Application', description: 'Submit your basic details and requirements.' },
    { step: '02', title: 'Documentation', description: 'Provide necessary documents for verification.' },
    { step: '03', title: 'Approval', description: 'Quick evaluation and loan sanction.' },
    { step: '04', title: 'Disbursement', description: 'Funds transferred to your account promptly.' }
  ];

  const testimonials = [
    { quote: 'NiyatiGroup helped me secure a business loan within 48 hours when I needed it most.', name: 'Sanjay Verma', role: 'Small Business Owner', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { quote: 'Their home loan process was transparent and had the best interest rates in market.', name: 'Neha Kapoor', role: 'Home Buyer', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { quote: 'Flexible repayment options made my personal loan completely stress-free.', name: 'Rahul Desai', role: 'Professional', avatar: 'https://randomuser.me/api/portraits/men/67.jpg' }
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
                <span className="relative flex h-3 w-3 mr-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></span>
                Financial Solutions Since 2010
              </motion.div>
              <motion.h1 className="text-5xl font-bold text-gray-100 mb-4" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}>Loan <span className="text-red-500">Services</span></motion.h1>
              <motion.p className="text-xl text-gray-400 mb-8" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.6 }}>
                Tailored financial solutions for your personal and business needs.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row justify-center gap-4" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.8 }}>
                <Link to="/loans/calculate"><motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.98 }} className="cursor-pointer px-8 py-3.5 bg-red-600 hover:bg-red-800 rounded-lg text-white font-medium shadow-lg">Calculate EMI</motion.button></Link>
                <Link to="/contact"><motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.98 }} className="cursor-pointer px-8 py-3.5 bg-gray-900/80 hover:bg-gray-800 rounded-lg text-gray-100 font-medium border border-gray-700 backdrop-blur-sm">Consult Expert</motion.button></Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Loan Products */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }} className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-4xl font-bold text-gray-100">Our <span className="text-red-500">Loan Products</span></h2>
              <p className="mt-4 text-gray-400">Financial solutions tailored to your requirements.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {loanProducts.map(loan => (
                <motion.div key={loan.id} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 flex flex-col hover:border-green-500/30 transition" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }} whileHover={{ y:-5 }}>
                  <div className="bg-green-500/10 p-3 rounded-lg mb-4 border border-green-500/20 inline-block">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d={loan.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-100 mb-2">{loan.title}</h3>
                  <p className="text-gray-400 flex-grow">{loan.description}</p>
                  <a href={loan.whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-red-600 hover:text-red-800">Get More Details</a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="py-16 md:py-24 bg-red-950/50 border-t border-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }} className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-4xl font-bold text-gray-100">Why Choose <span className="text-red-500">Us</span></h2>
              <p className="mt-4 text-gray-400">Benefits that make us your preferred financial partner.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {advantages.map((adv, i) => (
                <motion.div key={i} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-500/30 transition" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1, duration:0.5 }} whileHover={{ y:-5 }}>
                  <div className="bg-green-500/10 p-3 rounded-lg mb-4 border border-green-500/20 inline-block">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d={adv.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-100 mb-2">{adv.title}</h3>
                  <p className="text-gray-400">{adv.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 md:py-24 bg-red-950/50 border-y border-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }} className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-4xl font-bold text-gray-100">Simple <span className="text-red-500">Process</span></h2>
              <p className="mt-4 text-gray-400">Get funded in just a few easy steps.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map((ps, i) => (
                <motion.div key={i} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-500/30 transition" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1, duration:0.5 }} whileHover={{ y:-5 }}>
                  <div className="flex items-center mb-4">
                    <div className="bg-green-500/10 w-12 h-12 rounded-full flex items-center justify-center border border-green-500/20 text-green-500 font-bold">{ps.step}</div>
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
              <p className="mt-4 text-gray-400">What our clients say about our loan services.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <motion.div key={i} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 transition hover:border-green-500/30" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1, duration:0.5 }}>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, idx) => (
                      <svg key={idx} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-400">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
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
            <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }} className="text-4xl font-bold text-gray-100 mb-4">Ready to Secure Your <span className="text-red-500">Financing</span>?</motion.h2>
            <motion.p initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.2, duration:0.5 }} className="text-gray-400 mb-8">Let our financial experts guide you to the best loan solution.</motion.p>
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.4, duration:0.5 }} className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/loans/apply"><motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.98 }} className="px-8 py-3.5 bg-red-600 hover:bg-red-800 rounded-lg text-white font-medium shadow-lg">Apply Now</motion.button></Link>
              <a href="tel:+919876543210"><motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.98 }} className="px-8 py-3.5 bg-gray-900/80 hover:bg-gray-800 rounded-lg text-gray-100 font-medium border border-gray-700 backdrop-blur-sm">Call Our Experts</motion.button></a>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoanServices;