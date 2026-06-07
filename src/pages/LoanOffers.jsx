import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiTrendingUp, FiCheck, FiShield, FiArrowRight, FiTrash2 } from 'react-icons/fi';

const ADMIN_EMAIL = "niyatigroup1@gmail.com";

const LoanOffers = () => {
  const [loanOffers, setLoanOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    const fetchLoanOffers = async () => {
      try {
        const q = query(collection(db, 'loanOffers'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const offers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLoanOffers(offers.filter(offer => offer.isActive));
      } catch (error) {
        console.error("Error fetching loan offers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanOffers();
    return () => unsubscribe();
  }, []);

  const handleDelete = async (offerId) => {
    if (window.confirm("Are you sure you want to delete this loan offer?")) {
      try {
        await deleteDoc(doc(db, 'loanOffers', offerId));
        setLoanOffers((old) => old.filter(offer => offer.id !== offerId));
      } catch (error) {
        console.error("Error deleting loan offer: ", error);
        alert("Failed to delete loan offer");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#e8f4f8]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-100 border-t-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen niyati-bg-pattern bg-[#e8f4f8] py-24 px-4 sm:px-6">
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <header className="text-center mb-16">
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
           >
              <div className="inline-flex items-center px-4 py-2 mb-6 font-bold rounded-full text-teal-700 bg-teal-50 border border-teal-100 shadow-sm">
                <FiShield className="mr-2" />
                Featured Financial Offers
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
                Current <span className="text-teal-600">Loan</span> Offers
              </h1>
              <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                Take advantage of exclusive rates and flexible terms from our partner banks. Limited time availability on these featured products.
              </p>
           </motion.div>
        </header>

        {loanOffers.length === 0 ? (
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="text-center py-24 bg-white/50 rounded-[3rem] border border-teal-50 border-dashed"
          >
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-xl shadow-teal-900/5">
               <FiTrendingUp className="text-3xl text-teal-300" />
            </div>
            <p className="text-xl text-slate-400 font-bold">No active loan offers at the moment.</p>
            <p className="text-slate-400 text-sm mt-2">Our team is working on bringing you new financial opportunities.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loanOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="niyati-card h-full flex flex-col group relative overflow-hidden shadow-2xl"
              >
                <div className="p-8 pb-4 flex-grow relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="bg-white/10 p-3 rounded-2xl border border-white/20">
                       <FiTrendingUp className="text-2xl text-teal-300" />
                    </div>
                    <span className="px-4 py-1 bg-white text-teal-700 text-xs font-black rounded-full shadow-lg">
                      {offer.interestRate}% INTEREST
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white mb-4 leading-tight">{offer.title}</h3>
                  <p className="text-teal-50/70 text-sm mb-8 leading-relaxed font-medium">{offer.description}</p>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center text-sm border-b border-white/10 pb-3">
                      <span className="text-teal-100/50 font-bold">Max Amount:</span>
                      <span className="text-white font-black">₹{offer.maxAmount}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-white/10 pb-3">
                      <span className="text-teal-100/50 font-bold">Tenure Range:</span>
                      <span className="text-white font-black">{offer.minTenure}-{offer.maxTenure} mo</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-[10px] font-black text-teal-300 uppercase tracking-widest mb-3 flex items-center">
                       <FiCheck className="mr-2" />
                       Eligibility Requirements
                    </h4>
                    <p className="text-teal-50/60 text-xs leading-relaxed font-medium">{offer.eligibility}</p>
                  </div>
                </div>

                <div className="p-8 pt-4 relative z-10">
                   <Link to={`/loanapply`} className="block">
                      <motion.button
                        whileHover={{ scale: 1.03, backgroundColor: '#ffffff', color: '#0d9488' }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-4 bg-teal-500/20 hover:bg-white border border-white/30 text-white rounded-xl font-bold shadow-xl transition-all flex items-center justify-center gap-2"
                      >
                        Apply for this Offer
                        <FiArrowRight />
                      </motion.button>
                   </Link>

                   {currentUser && currentUser.email === ADMIN_EMAIL && (
                     <motion.button
                       whileHover={{ scale: 1.03, backgroundColor: '#ef4444' }}
                       whileTap={{ scale: 0.97 }}
                       onClick={() => handleDelete(offer.id)}
                       className="cursor-pointer mt-4 w-full py-3 bg-white/5 hover:bg-red-500 text-white text-xs font-bold rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2"
                     >
                       <FiTrash2 />
                       Remove Offer
                     </motion.button>
                   )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanOffers;
