import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TaxCalculator = () => {
  const [income, setIncome] = useState('');
  const [ageGroup, setAgeGroup] = useState('<60');
  const [investment, setInvestment] = useState('');
  const [taxResult, setTaxResult] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const calculateTax = () => {
    const inv = parseFloat(investment) || 0;
    const deductible = Math.min(inv, 150000);
    const taxableIncome = parseFloat(income) - deductible;

    let tax = 0;
    let slabs = [];
    let remaining = taxableIncome;

    const applySlab = (limit, rate, label) => {
      if (remaining > limit) {
        const amt = remaining - limit;
        tax += amt * rate;
        slabs.push({ range: `${label}`, rate: `${rate * 100}%`, amount: amt, tax: amt * rate });
        remaining = limit;
      }
    };

    if (ageGroup === '<60') {
      applySlab(1000000, 0.30, '> ₹10,00,000');
      applySlab(500000, 0.20, '₹5,00,001–₹10,00,000');
      applySlab(250000, 0.05, '₹2,50,001–₹5,00,000');
    } else if (ageGroup === '60-80') {
      applySlab(1000000, 0.30, '> ₹10,00,000');
      applySlab(500000, 0.20, '₹5,00,001–₹10,00,000');
      applySlab(300000, 0.05, '₹3,00,001–₹5,00,000');
    } else {
      // >80
      applySlab(1000000, 0.30, '> ₹10,00,000');
      applySlab(500000, 0.20, '₹5,00,001–₹10,00,000');
      applySlab(500000, 0.05, '₹5,00,001–₹10,00,000'); // additional 5% slab for seniors
    }

    // Section 87A rebate (up to ₹12,500)
    const rebate = Math.min(tax, 12500);
    tax -= rebate;

    const cess = tax * 0.04;
    const totalTax = tax + cess;

    setTaxResult({
      taxableIncome,
      taxBeforeRebate: tax + rebate,
      rebate,
      tax,
      cess,
      totalTax,
      slabs,
      effectiveRate: (totalTax / taxableIncome) * 100
    });
  };

  const resetCalculator = () => {
    setIncome('');
    setInvestment('');
    setTaxResult(null);
    setShowDetails(false);
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
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Income Tax Calculator</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Annual Income (₹)</label>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
                  placeholder="Enter your annual income"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Age Group</label>
                <div className="grid grid-cols-3 gap-3">
                  {['<60', '60-80', '>80'].map((age) => (
                    <label key={age} className="flex items-center bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 hover:border-red-500/30 transition">
                      <input
                        type="radio"
                        name="ageGroup"
                        checked={ageGroup === age}
                        onChange={() => setAgeGroup(age)}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-700"
                      />
                      <span className="ml-2 text-gray-300">
                        {age === '<60' ? 'Below 60' : age === '60-80' ? '60-80' : 'Above 80'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Investments (₹) <span className="text-gray-500 text-sm">(80C, max ₹1.5L)</span></label>
                <input
                  type="number"
                  value={investment}
                  onChange={(e) => setInvestment(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
                  placeholder="Enter your investments"
                />
              </div>

              <div className="flex space-x-4 pt-2">
                <motion.button
                  onClick={calculateTax}
                  disabled={!income}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`cursor-pointer px-6 py-3 rounded-lg font-medium ${income ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 cursor-not-allowed'} text-white transition flex-1`}
                >
                  Calculate Tax
                </motion.button>
                <motion.button
                  onClick={resetCalculator}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-white transition flex-1"
                >
                  Reset
                </motion.button>
              </div>
            </div>

            {/* Right Column - Results or Placeholder */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 flex items-center justify-center">
              {taxResult ? (
                <div className="w-full space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Tax Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Taxable Income:</span>
                      <span className="text-white">₹{taxResult.taxableIncome.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Income Tax (before rebate):</span>
                      <span className="text-white">₹{taxResult.taxBeforeRebate.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rebate (87A):</span>
                      <span className="text-white">₹{taxResult.rebate.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tax after Rebate:</span>
                      <span className="text-white">₹{taxResult.tax.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cess (4%):</span>
                      <span className="text-white">₹{taxResult.cess.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-700 pt-3">
                      <span className="text-gray-300 font-medium">Total Tax:</span>
                      <span className="text-red-400 font-bold">₹{taxResult.totalTax.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Effective Rate:</span>
                      <span className="text-white">{taxResult.effectiveRate.toFixed(2)}%</span>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => setShowDetails(!showDetails)}
                    className="cursor-pointer w-full mt-4 text-red-400 hover:text-red-300 text-sm"
                  >
                    {showDetails ? 'Hide Tax Slab Details' : 'Show Tax Slab Details'}
                  </motion.button>

                  {showDetails && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-4"
                    >
                      <div className="space-y-3">
                        {taxResult.slabs.map((slab, idx) => (
                          <div key={idx} className="bg-gray-700/50 p-3 rounded border border-gray-600">
                            <div className="flex justify-between">
                              <span className="text-gray-300">{slab.range}</span>
                              <span className="text-white">{slab.rate}</span>
                            </div>
                            <div className="flex justify-between text-sm mt-1">
                              <span className="text-gray-400">Amount: ₹{slab.amount.toLocaleString('en-IN')}</span>
                              <span className="text-gray-400">Tax: ₹{slab.tax.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                  </svg>
                  <p>Enter your details to calculate tax liability</p>
                </div>
              )}
            </div>
          </div>

          {/* Disclaimer & CTA */}
          <div className="mt-8">
            <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700 mb-6">
              <h4 className="text-sm font-medium text-red-400 mb-2">Disclaimer</h4>
              <p className="text-xs text-gray-400">
                This calculator provides an estimate based on current Indian tax laws. Actual tax liability may vary based on specific circumstances. Consult a tax professional for accurate assessment.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/tax" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-white transition"
                >
                  Learn About Tax Services
                </motion.button>
              </Link>
              <a 
                href="https://wa.me/+919997070599?text=Hi%20NiyatiGroup,%20I%20need%20help%20with%20tax%20planning" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer w-full px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium text-white transition flex items-center justify-center"
                >
                  {/* WhatsApp Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c...z"/>
                    <path fillRule="evenodd" d="M6.75 2.25A...z"/>
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

export default TaxCalculator;
