import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDollarSign, FiPlusCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';

const AddLoanOffer = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    interestRate: '',
    maxAmount: '',
    minTenure: '',
    maxTenure: '',
    eligibility: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, 'loanOffers'), {
        ...formData,
        createdAt: serverTimestamp(),
        isActive: true
      });
      setSuccess(true);
      setFormData({
        title: '',
        description: '',
        interestRate: '',
        maxAmount: '',
        minTenure: '',
        maxTenure: '',
        eligibility: ''
      });
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error adding loan offer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen niyati-bg-pattern bg-[#e8f4f8] pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto relative z-10">
        <header className="text-center mb-12">
           <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="inline-flex items-center px-4 py-2 mb-6 font-bold rounded-full text-teal-700 bg-white border border-teal-100 shadow-sm">
                <FiPlusCircle className="mr-2" />
                Product Configuration
              </div>
              <h1 className="text-4xl font-black text-slate-800 mb-4">Create <span className="text-teal-600">Loan Product</span></h1>
           </motion.div>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-teal-900/10 border border-teal-50"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Loan Title</label>
              <div className="relative">
                 <FiDollarSign className="absolute top-4 left-4 text-teal-600" />
                 <input
                   type="text"
                   name="title"
                   value={formData.title}
                   onChange={handleChange}
                   placeholder="e.g. Premium Business Growth Loan"
                   className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-bold text-slate-900"
                   required
                 />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Detailed Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Briefly explain the loan purpose and benefits..."
                className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-medium text-slate-900"
                rows="4"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Interest Rate (%)</label>
                <input
                  type="number"
                  name="interestRate"
                  value={formData.interestRate}
                  onChange={handleChange}
                  placeholder="e.g. 10.5"
                  className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-bold text-slate-900"
                  step="0.1"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Max Capital (₹)</label>
                <input
                  type="number"
                  name="maxAmount"
                  value={formData.maxAmount}
                  onChange={handleChange}
                  placeholder="e.g. 5000000"
                  className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-bold text-slate-900"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Min Tenure (months)</label>
                <input
                  type="number"
                  name="minTenure"
                  value={formData.minTenure}
                  onChange={handleChange}
                  placeholder="e.g. 12"
                  className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-bold text-slate-900"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Max Tenure (months)</label>
                <input
                  type="number"
                  name="maxTenure"
                  value={formData.maxTenure}
                  onChange={handleChange}
                  placeholder="e.g. 60"
                  className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-bold text-slate-900"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                 <FiInfo /> Eligibility Criteria
              </label>
              <textarea
                name="eligibility"
                value={formData.eligibility}
                onChange={handleChange}
                placeholder="Mention mandatory documents or conditions..."
                className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-bold text-slate-900 placeholder:font-normal"
                rows="2"
                required
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-teal-600 hover:bg-teal-700 text-white font-black rounded-[2rem] transition-all shadow-xl shadow-teal-900/10 flex items-center justify-center gap-3 text-lg"
            >
              {isSubmitting ? (
                 <div className="animate-spin w-6 h-6 border-4 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  Publish Loan Offer
                  <FiCheckCircle />
                </>
              )}
            </motion.button>
            
            <AnimatePresence>
              {success && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl text-center font-bold border border-emerald-100"
                >
                  New loan offer has been successfully published!
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddLoanOffer;