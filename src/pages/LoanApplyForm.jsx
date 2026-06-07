import React, { useState } from "react";
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from "framer-motion";
import { FiDollarSign, FiArrowRight, FiShield } from "react-icons/fi";

const LoanApplyForm = () => {
  const [formData, setFormData] = useState({
    offerTitle: '',
    name: '',
    email: '',
    phone: '',
    city: '',
    loanAmount: '',
    tenure: '',
    employment: '',
    income: '',
    pan: '',
    remarks: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "loanApplications"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      alert("Loan application submitted!");
      setFormData({
        offerTitle: '',
        name: '',
        email: '',
        phone: '',
        city: '',
        loanAmount: '',
        tenure: '',
        employment: '',
        income: '',
        pan: '',
        remarks: '',
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Submission failed.");
    }
  };

  return (
    <div className="relative min-h-screen niyati-bg-pattern bg-[#e8f4f8] pt-24 pb-20 flex items-center justify-center px-4">
      
      <div className="w-full max-w-4xl relative z-10">
        <header className="text-center mb-12">
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center px-4 py-2 mb-6 font-bold rounded-full text-teal-700 bg-white border border-teal-100 shadow-sm">
                <FiDollarSign className="mr-2" />
                Financial Application
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">
                Apply for your <span className="text-teal-600">Loan</span>
              </h1>
              <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                Provide your details below and our financial advisors will contact you with the best available offers.
              </p>
           </motion.div>
        </header>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[3rem] shadow-2xl shadow-teal-900/10 border border-teal-50 overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-5">
             {/* Form Side */}
             <div className="md:col-span-3 p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-medium" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email Address" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-medium" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Phone Number" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-medium" />
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required placeholder="City / State" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-medium" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input type="number" name="loanAmount" value={formData.loanAmount} onChange={handleChange} required placeholder="Amount Needed (₹)" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-medium" />
                    <input type="number" name="tenure" value={formData.tenure} onChange={handleChange} required placeholder="Tenure (months)" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-medium" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input type="text" name="employment" value={formData.employment} onChange={handleChange} required placeholder="Employment Type" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-medium" />
                    <input type="number" name="income" value={formData.income} onChange={handleChange} required placeholder="Monthly Income (₹)" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-medium" />
                  </div>

                  <input type="text" name="pan" value={formData.pan} onChange={handleChange} required placeholder="PAN Number" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-medium" />
                  
                  <textarea name="remarks" value={formData.remarks} onChange={handleChange} placeholder="Any additional remarks..." rows="2" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-medium" />

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold shadow-xl shadow-teal-900/10 transition-all flex items-center justify-center gap-2"
                  >
                    Submit Application
                    <FiArrowRight />
                  </motion.button>
                </form>
             </div>

             {/* Info Side */}
             <div className="md:col-span-2 niyati-card-dark p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 -mr-16 -mt-16 bg-white w-48 h-48 rounded-full"></div>
                
                <div className="relative z-10">
                   <FiShield className="text-4xl text-teal-300 mb-6" />
                   <h3 className="text-2xl font-black mb-6">Safe & Secure Process</h3>
                   <ul className="space-y-6">
                     {[
                       "Data encrypted via SSL",
                       "Direct bank connectivity",
                       "Quick profile verification",
                       "Zero upfront service fees"
                     ].map((item, i) => (
                       <li key={i} className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                             <FiCheck className="text-[10px] text-teal-300" />
                          </div>
                          <span className="text-sm font-medium text-teal-50/80">{item}</span>
                       </li>
                     ))}
                   </ul>
                </div>

                <div className="mt-12 p-6 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-sm relative z-10 text-center">
                   <p className="text-[10px] text-teal-100/50 font-black uppercase tracking-widest leading-relaxed">
                     By clicking submit, you agree to our terms and conditions for credit evaluation.
                   </p>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoanApplyForm;
