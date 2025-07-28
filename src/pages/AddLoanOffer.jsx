import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';

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
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Add New Loan Offer</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            rows="3"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">Interest Rate (%)</label>
            <input
              type="number"
              name="interestRate"
              value={formData.interestRate}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              step="0.1"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Maximum Amount (₹)</label>
            <input
              type="number"
              name="maxAmount"
              value={formData.maxAmount}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">Minimum Tenure (months)</label>
            <input
              type="number"
              name="minTenure"
              value={formData.minTenure}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Maximum Tenure (months)</label>
            <input
              type="number"
              name="maxTenure"
              value={formData.maxTenure}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">Eligibility Criteria</label>
          <textarea
            name="eligibility"
            value={formData.eligibility}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            rows="2"
            required
          />
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors w-full"
        >
          {isSubmitting ? 'Submitting...' : 'Add Loan Offer'}
        </motion.button>
        
        {success && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-green-600 text-white rounded-md text-center"
          >
            Loan offer added successfully!
          </motion.div>
        )}
      </form>
    </div>
  );
};

export default AddLoanOffer;