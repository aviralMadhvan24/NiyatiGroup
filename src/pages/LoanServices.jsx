import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LoanServices = () => {
  const gradientBg = 'bg-gradient-to-br from-red-700 via-red-800 to-black';

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
      description: 'Flexible personal financing for your individual needs and aspirations.',
      whatsappLink:
        'https://wa.me/919997070599?text=Hi%20NiyatiGroup,%20I%20need%20a%20Personal%20Loan',
    },
    {
      id: 2,
      title: 'Business Loans',
      description: 'Tailored financing solutions to help your business grow and thrive.',
      whatsappLink:
        'https://wa.me/919997070599?text=Hi%20NiyatiGroup,%20I%20am%20interested%20in%20Business%20Loans',
    },
    {
      id: 3,
      title: 'Home Loans',
      description: 'Make your dream home a reality with our competitive home loan options.',
      whatsappLink:
        'https://wa.me/919997070599?text=Hi%20NiyatiGroup,%20I%20want%20information%20about%20Home%20Loans',
    },
    {
      id: 4,
      title: 'Loan Against Property',
      description: 'Unlock the value of your property for your financial needs.',
      whatsappLink:
        'https://wa.me/919997070599?text=Hi%20NiyatiGroup,%20I%20need%20a%20Loan%20Against%20Property',
    },
  ];

  return (
    <div className={`relative ${gradientBg} text-gray-100 min-h-screen overflow-hidden`}>
      <div className="relative z-10">

        {/* Hero */}
        <section className="pt-32 pb-20 text-center">
          <motion.h1
            className="text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Loan <span className="text-red-500">Services</span>
          </motion.h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Tailored financial solutions for your personal and business needs
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/loans/calculate">
              <button className="px-8 py-3 bg-red-600 hover:bg-red-800 rounded-lg">
                Calculate EMI
              </button>
            </Link>
            <Link to="/loanoffers">
              <button className="px-8 py-3 bg-red-600 hover:bg-red-800 rounded-lg">
                Checkout Loan Offers
              </button>
            </Link>
          </div>
        </section>

        {/* Trusted Banks */}
 {/* Trusted Banks */}
<section className="py-16 border-y border-gray-800 bg-black/40">
  <div className="container mx-auto px-6">
    <motion.h3
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center text-xl font-semibold mb-10"
    >
      Trusted Banking <span className="text-red-500">Partners</span>
    </motion.h3>

    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6 justify-items-center">
      {partnerBanks.map((bank, i) => (
        <motion.div
          key={bank.name}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.03 }}
          className="
            w-28 h-20
            md:w-32 md:h-22
            bg-white
            rounded-lg
            flex items-center justify-center
            shadow
          "
        >
          <img
            src={bank.logo}
            alt={bank.name}
            className="max-h-10 md:max-h-12 max-w-[90%] object-contain"
          />
        </motion.div>
      ))}
    </div>

    <p className="text-center text-gray-500 text-xs mt-8">
      *Loans are facilitated through partner banks and NBFCs. Approval subject to eligibility.
    </p>
  </div>
</section>


        {/* Loan Products */}
        <section className="py-20">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loanProducts.map((loan) => (
              <motion.div
                key={loan.id}
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-500/30 transition"
                whileHover={{ y: -6 }}
              >
                <h3 className="text-xl font-semibold mb-2">{loan.title}</h3>
                <p className="text-gray-400">{loan.description}</p>
                <a
                  href={loan.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-red-500 hover:text-red-700"
                >
                  Get Started on WhatsApp →
                </a>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default LoanServices;
