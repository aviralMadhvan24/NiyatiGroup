import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { motion } from 'framer-motion';

const LoanOffers = () => {
  const [loanOffers, setLoanOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Current Loan Offers</h2>
      
      {loanOffers.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          No active loan offers available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loanOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white">{offer.title}</h3>
                  <span className="px-3 py-1 bg-red-600 text-white text-sm rounded-full">
                    {offer.interestRate}% Interest
                  </span>
                </div>
                
                <p className="text-gray-400 mb-4">{offer.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Max Amount:</span>
                    <span className="text-white">₹{offer.maxAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tenure:</span>
                    <span className="text-white">{offer.minTenure}-{offer.maxTenure} months</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-800">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Eligibility:</h4>
                  <p className="text-gray-400 text-sm">{offer.eligibility}</p>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-6 w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                >
                  Apply Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoanOffers;