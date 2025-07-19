import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RATE_LIMITS = {
  personal:    { min: 12,  max: 28 },   // Personal Loan: 12%–28%
  business:    { min: 12,  max: 28 },   // Business Loan: 12%–28%
  home:        { min: 9.5, max: 18 },   // Home Loan:    9.5%–18%
  lap:         { min: 9.5, max: 18 }    // Loan Against Property: 9.5%–18%
};

const EMICalculator = () => {
  const [loanType, setLoanType] = useState('personal');
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [emiResult, setEmiResult] = useState(null);
  const [showAmortization, setShowAmortization] = useState(false);

  const { min, max } = RATE_LIMITS[loanType];
  const rate = parseFloat(interestRate);
  const rateValid = rate >= min && rate <= max;

  const calculateEMI = () => {
    if (!rateValid) return;
    const p = parseFloat(principal);
    const r = rate / 12 / 100;
    const n = parseFloat(tenure) * 12;

    const emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    // Generate amortization schedule
    let balance = p;
    const amortization = [];
    for (let i = 1; i <= n; i++) {
      const interest = balance * r;
      const principalPaid = emi - interest;
      balance -= principalPaid;
      amortization.push({ month: i, payment: emi, principal: principalPaid, interest, balance: balance > 0 ? balance : 0 });
    }

    setEmiResult({ emi, totalPayment, totalInterest, amortization });
  };

  const resetCalculator = () => {
    setLoanType('personal');
    setPrincipal('');
    setInterestRate('');
    setTenure('');
    setEmiResult(null);
    setShowAmortization(false);
  };

  return (
    <motion.div className="relative bg-gradient-to-br from-red-700 via-red-800 to-black text-gray-300 min-h-screen overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900/50 to-gray-950">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 md:py-24">
        <motion.div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 md:p-8 shadow-xl max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl font-bold text-white mb-6 text-center">EMI Calculator</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Loan Type</label>
                <select value={loanType} onChange={e => setLoanType(e.target.value)} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-red-500">
                  <option value="personal">Personal Loan</option>
                  <option value="business">Business Loan</option>
                  <option value="home">Home Loan</option>
                  <option value="lap">Loan Against Property</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Loan Amount (₹)</label>
                <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-red-500" placeholder="Enter loan amount" />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Interest Rate (% p.a.) <span className="text-gray-400">(Range: {min}% - {max}%)</span></label>
                <input type="number" step="0.01" value={interestRate} onChange={e => setInterestRate(e.target.value)} min={min} max={max} className={`w-full px-4 py-3 bg-gray-800 border ${rateValid ? 'border-gray-700' : 'border-red-500'} rounded-lg text-white focus:ring-2 focus:ring-red-500`} placeholder="Enter interest rate" />
                {!rateValid && interestRate !== '' && (<p className="mt-1 text-xs text-red-400">Please enter a rate between {min}% and {max}%</p>)}
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Loan Tenure (Years)</label>
                <input type="number" value={tenure} onChange={e => setTenure(e.target.value)} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-red-500" placeholder="Enter loan tenure" />
              </div>

              <div className="flex space-x-4 pt-2">
                <motion.button onClick={calculateEMI} disabled={!principal || !interestRate || !tenure || !rateValid} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className={`px-6 py-3 rounded-lg font-medium ${(principal && interestRate && tenure && rateValid) ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 cursor-not-allowed'} text-white transition flex-1`}>Calculate EMI</motion.button>
                <motion.button onClick={resetCalculator} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-white transition flex-1">Reset</motion.button>
              </div>
            </div>

            {/* Right Column - Results or Placeholder */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 flex items-center justify-center">
              {emiResult ? (
                <div className="w-full space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Loan Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between"><span className="text-gray-400">Monthly EMI:</span><span className="text-white">₹{emiResult.emi.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Total Interest:</span><span className="text-white">₹{emiResult.totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Total Payment:</span><span className="text-white">₹{emiResult.totalPayment.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span></div>
                    <div className="flex justify-between border-t border-gray-700 pt-3"><span className="text-gray-300 font-medium">Principal Amount:</span><span className="text-red-400 font-bold">₹{parseFloat(principal).toLocaleString('en-IN')}</span></div>
                  </div>
                  <button onClick={() => setShowAmortization(!showAmortization)} className="w-full mt-4 text-red-400 hover:text-red-300 text-sm text-center">{showAmortization ? 'Hide Amortization Schedule' : 'Show Amortization Schedule'}</button>
                  {showAmortization && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }} className="overflow-hidden mt-4">
                      <div className="max-h-60 overflow-y-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-700">
                              <th className="text-left py-2 text-gray-400">Month</th><th className="text-right py-2 text-gray-400">Payment</th><th className="text-right py-2 text-gray-400">Principal</th><th className="text-right py-2 text-gray-400">Interest</th><th className="text-right py-2 text-gray-400">Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {emiResult.amortization.slice(0, 60).map((row, i) => (
                              <tr key={i} className="border-b border-gray-800"><td className="py-2 text-gray-300">{row.month}</td><td className="py-2 text-right text-gray-300">₹{row.payment.toFixed(2)}</td><td className="py-2 text-right text-gray-300">₹{row.principal.toFixed(2)}</td><td className="py-2 text-right text-gray-300">₹{row.interest.toFixed(2)}</td><td className="py-2 text-right text-gray-300">₹{row.balance.toFixed(2)}</td></tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657..." />
                  </svg>
                  <p>Enter loan details to calculate EMI</p>
                </div>
              )}
            </div>
          </div>

          {/* Disclaimer & CTA */}
          <div className="mt-8">
            {/* Existing CTA code unchanged */}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EMICalculator;
