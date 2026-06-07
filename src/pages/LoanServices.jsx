import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiDollarSign, FiCalculator, FiHome, FiCreditCard, FiArrowRight } from 'react-icons/fi';

const LoanServices = () => {
  const partnerBanks = [
    { name: 'SBI', logo: '/banks/sbi.png' },
    { name: 'HDFC Bank', logo: '/banks/hdfc.png' },
    { name: 'ICICI Bank', logo: '/banks/icici.png' },
    { name: 'Axis Bank', logo: '/banks/axis.png' },
    { name: 'PNB', logo: '/banks/pnb.png' },
    { name: 'Bank of Baroda', logo: '/banks/bob.png' },
    { name: 'Indian Bank', logo: '/banks/indian.png' },
    { name: 'Union Bank', logo: '/banks/union.png' },
    { name: 'Canara Bank', logo: '/banks/canara.png' },
    { name: 'IndusInd Bank', logo: '/banks/indusind.png' },
    { name: 'Bandhan Bank', logo: '/banks/bandhan.png' },
    { name: 'Nainital Bank', logo: '/banks/nainital.png' },
    { name: 'Bajaj Finance', logo: '/banks/bajaj.png' },
    { name: 'Shriram Finance', logo: '/banks/shriram.png' },
    { name: 'Poonawalla Fincorp', logo: '/banks/poonawalla.png' },
    { name: 'IIFL Finance', logo: '/banks/iifl.png' },
    { name: 'UGRO Capital', logo: '/banks/ugro.png' },
    { name: 'HDB Finance', logo: '/banks/hdb.png' },
    { name: 'Chola Finance', logo: '/banks/chola.png' },
    { name: 'Tata Capital', logo: '/banks/tata.png' },
    { name: 'IDFC First Bank', logo: '/banks/idfc.png' },
  ];

  const loanProducts = [
    {
      id: 1,
      title: 'Personal Loans',
      icon: <FiUsers className="text-2xl" />,
      description: 'Flexible personal financing for your individual needs and aspirations.',
      whatsappLink: 'https://wa.me/919997070599?text=Hi%20NiyatiGroup,%20I%20need%20a%20Personal%20Loan',
    },
    {
      id: 2,
      title: 'Business Loans',
      icon: <FiDollarSign className="text-2xl" />,
      description: 'Tailored financing solutions to help your business grow and thrive.',
      whatsappLink: 'https://wa.me/919997070599?text=Hi%20NiyatiGroup,%20I%20am%20interested%20in%20Business%20Loans',
    },
    {
      id: 3,
      title: 'Home Loans',
      icon: <FiHome className="text-2xl" />,
      description: 'Make your dream home a reality with our competitive home loan options.',
      whatsappLink: 'https://wa.me/919997070599?text=Hi%20NiyatiGroup,%20I%20want%20information%20about%20Home%20Loans',
    },
    {
      id: 4,
      title: 'Loan Against Property',
      icon: <FiCreditCard className="text-2xl" />,
      description: 'Unlock the value of your property for your financial needs.',
      whatsappLink: 'https://wa.me/919997070599?text=Hi%20NiyatiGroup,%20I%20need%20a%20Loan%20Against%20Property',
    },
  ];

  return (
    <div className="relative min-h-screen niyati-bg-pattern bg-[#e8f4f8] pt-24 pb-20">
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-20 text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
             <motion.div className="inline-flex items-center px-4 py-2 mb-6 font-bold rounded-full text-teal-700 bg-teal-50 border border-teal-100 shadow-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <span className="relative flex h-3 w-3 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                </span>
                Financial Solutions
              </motion.div>
              
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
              Loan <span className="text-teal-600">Services</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Tailored financial solutions for your personal and business needs, powered by trusted banking partnerships.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/loans/calculate">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-teal-600 text-white font-bold rounded-xl shadow-xl shadow-teal-900/10 transition-all flex items-center justify-center gap-2">
                  <FiCalculator />
                  Calculate EMI
                </motion.button>
              </Link>
              <Link to="/loanoffers">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-white text-teal-700 font-bold rounded-xl shadow-lg border border-teal-100 transition-all">
                  Check Current Offers
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Banking Partners Horizontal Scroll-like grid */}
        <section className="py-16 bg-white/40 backdrop-blur-sm border-y border-teal-50">
          <div className="container mx-auto px-6">
            <h3 className="text-center font-bold text-slate-400 text-sm tracking-widest uppercase mb-12">Trusted Banking Partners</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6">
              {partnerBanks.map((bank, i) => (
                <motion.div
                  key={bank.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl h-24 flex items-center justify-center p-4 shadow-xl shadow-teal-900/[0.03] border border-teal-50/50 grayscale hover:grayscale-0 transition-all cursor-pointer"
                >
                  <img src={bank.logo} alt={bank.name} className="max-h-12 max-w-full object-contain" />
                </motion.div>
              ))}
            </div>
            <p className="text-center text-slate-400 text-[10px] mt-10 font-medium italic">
              *Loans are facilitated through partner banks and NBFCs. Approval subject to eligibility.
            </p>
          </div>
        </section>

        {/* Loan Products Grid */}
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-6">
             <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-800">Available <span className="text-teal-600">Loan Products</span></h2>
                <div className="w-16 h-1 bg-teal-600 mx-auto mt-4 rounded-full"></div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {loanProducts.map((loan) => (
                 <motion.div
                   key={loan.id}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   whileHover={{ y: -10 }}
                   className="niyati-card p-8 group relative overflow-hidden h-full flex flex-col shadow-2xl"
                 >
                   <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 border border-white/20 text-teal-300">
                      {loan.icon}
                   </div>
                   <h3 className="text-xl font-bold text-white mb-4 leading-tight">{loan.title}</h3>
                   <p className="text-teal-50/70 text-sm mb-10 leading-relaxed font-medium flex-grow">
                     {loan.description}
                   </p>
                   <a
                     href={loan.whatsappLink}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-teal-400 font-bold text-sm hover:text-white transition-colors flex items-center gap-2"
                   >
                     Apply via WhatsApp
                     <FiArrowRight />
                   </a>
                 </motion.div>
               ))}
             </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
           <div className="container mx-auto px-4 md:px-6">
              <motion.div 
                className="niyati-card-dark p-12 text-center rounded-[3rem] relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                 <h2 className="text-3xl font-bold text-white mb-6">Need a Custom Finance Plan?</h2>
                 <p className="text-lg text-teal-50/70 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Our advisors help you choose the best rates and tenure across all top banks in India.
                 </p>
                 <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/contact">
                       <motion.button whileHover={{ scale: 1.05, bg: '#ffffff', color: '#0d9488' }} whileTap={{ scale: 0.95 }} className="px-10 py-4 bg-white text-teal-700 rounded-xl font-bold shadow-2xl transition-all">
                          Talk to Advisor
                       </motion.button>
                    </Link>
                    <Link to="/loans/calculate">
                       <motion.button whileHover={{ scale: 1.05, bg: '#0f172a' }} whileTap={{ scale: 0.95 }} className="px-10 py-4 bg-slate-900 text-white rounded-xl font-bold shadow-2xl transition-all">
                          Calculate EMI
                       </motion.button>
                    </Link>
                 </div>
              </motion.div>
           </div>
        </section>
      </div>
    </div>
  );
};

import { FiUsers } from 'react-icons/fi';
export default LoanServices;
