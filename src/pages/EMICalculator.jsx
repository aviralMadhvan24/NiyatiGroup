import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EMICalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [emiResult, setEmiResult] = useState(null);
  const [showAmortization, setShowAmortization] = useState(false);

  const calculateEMI = () => {
    const p = parseFloat(principal);
    const r = parseFloat(interestRate) / 12 / 100;
    const n = parseFloat(tenure) * 12;

    const emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    // Generate amortization schedule
    let balance = p;
    let amortization = [];
    for (let i = 1; i <= n; i++) {
      const interest = balance * r;
      const principalPaid = emi - interest;
      balance -= principalPaid;

      amortization.push({
        month: i,
        payment: emi,
        principal: principalPaid,
        interest: interest,
        balance: balance > 0 ? balance : 0
      });
    }

    setEmiResult({
      emi: emi,
      totalPayment: totalPayment,
      totalInterest: totalInterest,
      amortization: amortization
    });
  };

  const resetCalculator = () => {
    setPrincipal('');
    setInterestRate('');
    setTenure('');
    setEmiResult(null);
    setShowAmortization(false);
  };

  return (
    <motion.div 
      className="relative bg-gradient-to-br from-red-700 via-red-800 to-black text-gray-300 min-h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900/50 to-gray-950">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 md:py-24">
        <motion.div
          className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 md:p-8 shadow-xl max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">EMI Calculator</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Loan Amount (₹)</label>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
                  placeholder="Enter loan amount"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Interest Rate (% p.a.)</label>
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
                  placeholder="Enter interest rate"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Loan Tenure (Years)</label>
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
                  placeholder="Enter loan tenure"
                />
              </div>

              <div className="flex space-x-4 pt-2">
                <motion.button
                  onClick={calculateEMI}
                  disabled={!principal || !interestRate || !tenure}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-6 py-3 rounded-lg font-medium ${(principal && interestRate && tenure) ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 cursor-not-allowed'} text-white transition flex-1`}
                >
                  Calculate EMI
                </motion.button>
                <motion.button
                  onClick={resetCalculator}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-white transition flex-1"
                >
                  Reset
                </motion.button>
              </div>
            </div>

            {/* Right Column - Results or Placeholder */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 flex items-center justify-center">
              {emiResult ? (
                <div className="w-full space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Loan Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Monthly EMI:</span>
                      <span className="text-white">₹{emiResult.emi.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Interest:</span>
                      <span className="text-white">₹{emiResult.totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Payment:</span>
                      <span className="text-white">₹{emiResult.totalPayment.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-700 pt-3">
                      <span className="text-gray-300 font-medium">Principal Amount:</span>
                      <span className="text-red-400 font-bold">₹{parseFloat(principal).toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowAmortization(!showAmortization)}
                    className="w-full mt-4 text-red-400 hover:text-red-300 text-sm text-center"
                  >
                    {showAmortization ? 'Hide Amortization Schedule' : 'Show Amortization Schedule'}
                  </button>

                  {showAmortization && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-4"
                    >
                      <div className="max-h-60 overflow-y-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-700">
                              <th className="text-left py-2 text-gray-400">Month</th>
                              <th className="text-right py-2 text-gray-400">Payment</th>
                              <th className="text-right py-2 text-gray-400">Principal</th>
                              <th className="text-right py-2 text-gray-400">Interest</th>
                              <th className="text-right py-2 text-gray-400">Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {emiResult.amortization.slice(0, 60).map((row, index) => (
                              <tr key={index} className="border-b border-gray-800">
                                <td className="py-2 text-gray-300">{row.month}</td>
                                <td className="py-2 text-right text-gray-300">₹{row.payment.toFixed(2)}</td>
                                <td className="py-2 text-right text-gray-300">₹{row.principal.toFixed(2)}</td>
                                <td className="py-2 text-right text-gray-300">₹{row.interest.toFixed(2)}</td>
                                <td className="py-2 text-right text-gray-300">₹{row.balance.toFixed(2)}</td>
                              </tr>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>Enter loan details to calculate EMI</p>
                </div>
              )}
            </div>
          </div>

          {/* Disclaimer & CTA */}
          <div className="mt-8">
            <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700 mb-6">
              <h4 className="text-sm font-medium text-red-400 mb-2">Disclaimer</h4>
              <p className="text-xs text-gray-400">
                This calculator provides an estimate based on standard EMI calculation formulas. Actual loan terms may vary based on lender policies and your credit profile. Consult a financial advisor for personalized advice.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/loans" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-white transition"
                >
                  Explore Loan Services
                </motion.button>
              </Link>
              <a 
                href="https://wa.me/+919997070599?text=Hi%20NiyatiGroup,%20I%20need%20help%20with%20loan%20options" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer w-full px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium text-white transition flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Expert
                </motion.button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EMICalculator;