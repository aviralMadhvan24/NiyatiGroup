import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiCalendar, FiTrendingUp, FiRefreshCw, FiArrowRight } from 'react-icons/fi';
import { LuCalculator } from 'react-icons/lu';

const RATE_LIMITS = {
  personal:    { min: 8,  max: 30 },
  business:    { min: 8,  max: 30 },
  home:        { min: 7,  max: 18 },
  lap:         { min: 8,  max: 18 }
};

const EMICalculator = () => {
  const [loanType, setLoanType] = useState('personal');
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [emiResult, setEmiResult] = useState(null);
  const [showAmortization, setShowAmortization] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { min, max } = RATE_LIMITS[loanType];
  const rate = parseFloat(interestRate);
  const rateValid = rate >= min && rate <= max;

  const calculateEMI = () => {
    if (!rateValid || !principal || !tenure) return;
    const p = parseFloat(principal);
    const r = rate / 12 / 100;
    const n = parseFloat(tenure) * 12;

    const emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    let balance = p;
    const amortization = [];
    for (let i = 1; i <= n; i++) {
      const interest = balance * r;
      const principalPaid = emi - interest;
      balance -= principalPaid;
      amortization.push({ 
        month: i, 
        payment: emi, 
        principal: principalPaid, 
        interest, 
        balance: balance > 0 ? balance : 0 
      });
    }

    const result = { emi, totalPayment, totalInterest, amortization };
    setEmiResult(result);
    
    if (!submitted && name && phone) {
      submitFormData(result);
    }
  };

  const submitFormData = async (result) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('loan_type', loanType);
    formData.append('loan_amount', principal);
    formData.append('interest_rate', interestRate);
    formData.append('tenure', tenure);
    formData.append('emi', result.emi.toFixed(2));
    formData.append('total_interest', result.totalInterest.toFixed(2));
    formData.append('total_payment', result.totalPayment.toFixed(2));

    try {
      await fetch('https://formspree.io/f/meozelgj', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const resetCalculator = () => {
    setPrincipal('');
    setInterestRate('');
    setTenure('');
    setEmiResult(null);
    setShowAmortization(false);
    setSubmitted(false);
  };

  return (
    <div className="relative min-h-screen niyati-bg-pattern bg-[#e8f4f8] pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <section className="pt-20 pb-12 text-center">
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
              <motion.div className="inline-flex items-center px-4 py-2 mb-6 font-bold rounded-full text-teal-700 bg-teal-50 border border-teal-100 shadow-sm">
                <LuCalculator className="mr-2" />
                EMI Calculator
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">Plan Your <span className="text-teal-600">Finances</span></h1>
              <p className="text-lg text-slate-500 font-medium">Calculate your monthly EMI and view complete amortization schedule for any loan type.</p>
           </motion.div>
        </section>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
           {/* Inputs Panel */}
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="lg:col-span-3 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-teal-900/10 border border-teal-50"
           >
              <h3 className="text-xl font-bold text-slate-800 mb-8 pb-4 border-b border-teal-50">Loan Details</h3>
              
              <div className="space-y-6">
                 {/* Contact Info */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-teal-50/50 rounded-3xl border border-teal-50">
                    <div>
                       <label className="block text-slate-700 font-bold mb-2 text-sm ml-1">Your Name</label>
                       <input 
                         type="text" 
                         value={name} 
                         onChange={e => setName(e.target.value)} 
                         className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl focus:ring-2 focus:ring-teal-500 font-medium" 
                         placeholder="Enter your name" 
                       />
                    </div>
                    <div>
                       <label className="block text-slate-700 font-bold mb-2 text-sm ml-1">Phone Number</label>
                       <input 
                         type="tel" 
                         value={phone} 
                         onChange={e => setPhone(e.target.value)} 
                         className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl focus:ring-2 focus:ring-teal-500 font-medium" 
                         placeholder="999-707-0599" 
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                       <label className="block text-slate-700 font-bold mb-2 text-sm ml-1">Loan Type</label>
                       <select 
                         value={loanType} 
                         onChange={e => setLoanType(e.target.value)} 
                         className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-teal-500 font-medium appearance-none cursor-pointer"
                       >
                         <option value="personal">Personal Loan</option>
                         <option value="business">Business Loan</option>
                         <option value="home">Home Loan</option>
                         <option value="lap">Loan Against Property</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-slate-700 font-bold mb-2 text-sm ml-1">Loan Amount (₹)</label>
                       <input 
                         type="number" 
                         value={principal} 
                         onChange={e => setPrincipal(e.target.value)} 
                         className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-teal-500 font-medium" 
                         placeholder="e.g. 5,00,000" 
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                       <label className="block text-slate-700 font-bold mb-2 text-sm ml-1 flex justify-between">
                          <span>Interest Rate (%)</span>
                          <span className="text-teal-600 text-[10px]">{min}% - {max}%</span>
                       </label>
                       <input 
                         type="number" 
                         step="0.1"
                         value={interestRate} 
                         onChange={e => setInterestRate(e.target.value)} 
                         className={`w-full px-4 py-3 bg-slate-50 border ${rateValid || interestRate === '' ? 'border-slate-100' : 'border-red-500'} rounded-xl focus:ring-2 focus:ring-teal-500 font-medium`} 
                         placeholder="e.g. 10.5" 
                       />
                       {!rateValid && interestRate !== '' && (<p className="text-[10px] text-red-500 mt-1">Please enter a rate between {min}% and {max}%</p>)}
                    </div>
                    <div>
                       <label className="block text-slate-700 font-bold mb-2 text-sm ml-1">Tenure (Years)</label>
                       <input 
                         type="number" 
                         value={tenure} 
                         onChange={e => setTenure(e.target.value)} 
                         className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-teal-500 font-medium" 
                         placeholder="e.g. 5" 
                       />
                    </div>
                 </div>
              </div>

              <div className="mt-10 flex gap-4">
                 <motion.button 
                   onClick={calculateEMI}
                   disabled={!principal || !interestRate || !tenure || !rateValid || !name || !phone}
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   className="flex-1 py-4 bg-teal-600 text-white rounded-2xl font-bold shadow-xl shadow-teal-900/10 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                 >
                   Calculate Now
                   <FiArrowRight />
                 </motion.button>
                 <motion.button 
                   onClick={resetCalculator}
                   whileHover={{ scale: 1.02, backgroundColor: '#f1f5f9' }}
                   whileTap={{ scale: 0.98 }}
                   className="px-6 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold transition-all"
                 >
                   <FiRefreshCw />
                 </motion.button>
              </div>
           </motion.div>

           {/* Results Panel */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="lg:col-span-2 flex flex-col"
           >
              {emiResult ? (
                 <div className="niyati-card p-10 rounded-[2.5rem] flex flex-col h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-5 -mr-16 -mt-16 bg-white w-48 h-48 rounded-full"></div>
                    <div className="relative z-10 flex-grow">
                       <h3 className="text-xl font-bold text-white mb-8">Loan Summary</h3>
                       
                       <div className="space-y-8">
                          <div className="flex justify-between items-end border-b border-white/10 pb-4">
                             <div>
                                <p className="text-teal-100 text-xs font-bold uppercase tracking-wider mb-1">Monthly EMI</p>
                                <p className="text-3xl font-black text-white">₹{emiResult.emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                             </div>
                             <div className="bg-teal-500/20 p-3 rounded-xl border border-white/10">
                                <FiDollarSign className="text-xl text-teal-300" />
                             </div>
                          </div>

                          <div className="grid grid-cols-2 gap-6">
                             <div>
                                <p className="text-teal-100 text-[10px] font-bold uppercase tracking-wider mb-1">Total Interest</p>
                                <p className="text-lg font-bold text-white">₹{emiResult.totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                             </div>
                             <div>
                                <p className="text-teal-100 text-[10px] font-bold uppercase tracking-wider mb-1">Total Payment</p>
                                <p className="text-lg font-bold text-white">₹{emiResult.totalPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                             </div>
                          </div>

                          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                             <div className="flex justify-between items-center text-xs">
                                <span className="text-teal-100 font-bold">Principal Amount</span>
                                <span className="text-white font-black">₹{parseFloat(principal).toLocaleString('en-IN')}</span>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/10 relative z-10">
                       <motion.button 
                         onClick={() => setShowAmortization(!showAmortization)}
                         className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all"
                       >
                         {showAmortization ? 'Hide Schedule' : 'View Full Schedule'}
                       </motion.button>
                       <p className="text-center text-[10px] text-teal-100/50 mt-4 italic font-bold">**TERMS AND CONDITIONS APPLIED**</p>
                    </div>
                 </div>
              ) : (
                 <div className="bg-teal-50 p-10 rounded-[2.5rem] border border-teal-100 border-dashed flex flex-col items-center justify-center text-center h-full">
                    <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mb-6 shadow-xl shadow-teal-900/5">
                       <FiTrendingUp className="text-3xl text-teal-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Awaiting Calculation</h3>
                    <p className="text-slate-500 text-sm font-medium">Enter loan details to generate your personalized EMI summary and amortization schedule.</p>
                 </div>
              )}
           </motion.div>
        </div>

        {/* Amortization Table */}
        <motion.div 
          animate={{ height: showAmortization ? 'auto' : 0, opacity: showAmortization ? 1 : 0 }}
          className="max-w-6xl mx-auto overflow-hidden mt-12"
        >
           {emiResult && (
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-teal-900/10 border border-teal-50">
                 <h3 className="text-2xl font-bold text-slate-800 mb-8">Amortization Schedule</h3>
                 <div className="overflow-x-auto">
                    <table className="w-full">
                       <thead>
                          <tr className="text-left border-b border-slate-100">
                             <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest pl-4">Month</th>
                             <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">Payment</th>
                             <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">Principal</th>
                             <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">Interest</th>
                             <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest pr-4">Balance</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50">
                          {emiResult.amortization.map((row, i) => (
                             <tr key={i} className="hover:bg-teal-50/50 transition-colors">
                                <td className="py-4 text-sm font-bold text-slate-700 pl-4">{row.month}</td>
                                <td className="py-4 text-sm font-medium text-slate-600">₹{row.payment.toFixed(0)}</td>
                                <td className="py-4 text-sm font-medium text-teal-600">₹{row.principal.toFixed(0)}</td>
                                <td className="py-4 text-sm font-medium text-red-400">₹{row.interest.toFixed(0)}</td>
                                <td className="py-4 text-sm font-black text-slate-800 pr-4">₹{row.balance.toFixed(0)}</td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           )}
        </motion.div>

        {/* Disclaimer */}
        <div className="max-w-4xl mx-auto mt-20 text-center">
           <div className="bg-white/50 p-6 rounded-3xl border border-teal-100 inline-block">
              <p className="text-xs text-slate-400 leading-relaxed max-w-2xl mx-auto font-medium italic">
                <strong>Disclaimer:</strong> The EMI calculator is for illustrative purposes only. Actual interest rates, processing fees, and other charges may vary based on bank policies and individual credit profiles. By using this tool, you agree that our representatives may contact you.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;
