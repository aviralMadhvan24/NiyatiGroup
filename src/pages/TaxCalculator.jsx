import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Info, 
  Calculator, 
  AlertCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  BookOpen,
  ShieldCheck
} from 'lucide-react';

const TaxCalculator = () => {
  const [income, setIncome] = useState('');
  const [ageGroup, setAgeGroup] = useState('<60');
  const [investment, setInvestment] = useState('');
  const [regime, setRegime] = useState('new');
  const [isSalaried, setIsSalaried] = useState(false);
  const [taxResult, setTaxResult] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const calculateTax = () => {
    const inv = parseFloat(investment) || 0;
    let taxableIncome = parseFloat(income);
    let deductions = 0;
    let standardDeduction = 0;

    if (regime === 'old') {
      // Old regime deductions
      const deductible = Math.min(inv, 150000);
      taxableIncome -= deductible;
      deductions = deductible;

      // Standard deduction of ₹50,000 for salaried (old regime)
      if (isSalaried) {
        standardDeduction = 50000;
        taxableIncome -= standardDeduction;
      }
    } else {
      // New regime standard deduction of ₹75,000 for salaried
      if (isSalaried) {
        standardDeduction = 75000;
        taxableIncome -= standardDeduction;
      }
    }

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

    if (regime === 'old') {
      // Old regime tax slabs
    if (ageGroup === '<60') {
  applySlab(1000000, 0.30, '> ₹10,00,000');
  applySlab(500000, 0.20, '₹5,00,001–₹10,00,000');
  applySlab(250000, 0.05, '₹2,50,001–₹5,00,000');
} else if (ageGroup === '60-80') {
  applySlab(1000000, 0.30, '> ₹10,00,000');
  applySlab(500000, 0.20, '₹5,00,001–₹10,00,000');
  applySlab(300000, 0.05, '₹3,00,001–₹5,00,000');
} else {
  applySlab(1000000, 0.30, '> ₹10,00,000');
  applySlab(500000, 0.20, '₹5,00,001–₹10,00,000');
  // No 5% slab — above 5L is taxed directly
}

      
      // Section 87A rebate (up to ₹12,500)
      const rebate = taxableIncome <= 500000 ? Math.min(tax, 12500) : 0;
      tax -= rebate;
    } else {
      // New regime tax slabs (FY 2023-24)
   // New regime tax slabs (Updated FY 2023-24)
applySlab(1500000, 0.30, '> ₹15,00,000');
applySlab(1200000, 0.20, '₹12,00,001–₹15,00,000');
applySlab(1000000, 0.15, '₹10,00,001–₹12,00,000');
applySlab(700000, 0.10, '₹7,00,001–₹10,00,000');
applySlab(300000, 0.05, '₹3,00,001–₹7,00,000');

      
      // Section 87A rebate (up to ₹25,000) for income up to ₹7 lakh
      const rebate = taxableIncome <= 700000 ? Math.min(tax, 25000) : 0;
      tax -= rebate;
    }

    const cess = tax * 0.04;
    const totalTax = tax + cess;

    setTaxResult({
      regime,
      taxableIncome,
      deductions,
      standardDeduction,
      taxBeforeRebate: tax + (regime === 'old' ? Math.min(tax, 12500) : Math.min(tax, 25000)),
      rebate: regime === 'old' ? Math.min(tax, 12500) : Math.min(tax, 25000),
      tax,
      cess,
      totalTax,
      slabs,
      effectiveRate: taxableIncome > 0 ? (totalTax / taxableIncome) * 100 : 0
    });
  };

  const resetCalculator = () => {
    setIncome('');
    setInvestment('');
    setTaxResult(null);
    setShowDetails(false);
    setIsSalaried(false);
  };

  const RegimeInfo = () => (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mt-4">
      <h4 className="text-sm font-medium text-red-400 mb-2 flex items-center">
        <Info className="h-4 w-4 mr-1" /> Regime Information
      </h4>
      <div className="text-xs text-gray-400 space-y-2">
        <p className="flex items-start">
          <ArrowRight className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
          <span>
            <strong>Old Regime:</strong> Allows deductions (80C up to ₹1.5L) + ₹50,000 standard deduction for salaried
          </span>
        </p>
        <p className="flex items-start">
          <ArrowRight className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
          <span>
            <strong>New Regime:</strong> No deductions except ₹75,000 standard deduction for salaried
          </span>
        </p>
        <button 
          onClick={() => setShowDisclaimer(!showDisclaimer)}
          className="text-red-400 hover:text-red-300 text-xs flex items-center mt-2"
        >
          {showDisclaimer ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
          {showDisclaimer ? 'Hide Disclaimer' : 'Show Important Disclaimer'}
        </button>
        
        {showDisclaimer && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-gray-900/30 p-3 rounded border border-gray-700 mt-2">
              <p className="flex items-start">
                <AlertCircle className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                <span>
                  Standard deduction: ₹50,000 (Old Regime) / ₹75,000 (New Regime) for salaried individuals. Tax laws may change - consult a professional for accurate advice.
                </span>
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );

  return (
    <motion.div 
      className="relative bg-gradient-to-br from-red-700 via-red-800 to-black text-gray-300 min-h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
          <div className="flex items-center justify-center mb-6">
            <Calculator className="h-8 w-8 text-red-400 mr-2" />
            <h2 className="text-3xl font-bold text-white text-center">Income Tax Calculator</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <label className="block text-gray-300 mb-2">Tax Regime</label>
                <div className="grid grid-cols-2 gap-3">
                  {['new', 'old'].map((reg) => (
                    <label key={reg} className={`flex items-center bg-gray-800/50 border ${regime === reg ? 'border-red-500/50' : 'border-gray-700'} rounded-lg px-4 py-3 hover:border-red-500/30 transition`}>
                      <input
                        type="radio"
                        name="regime"
                        checked={regime === reg}
                        onChange={() => setRegime(reg)}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-700"
                      />
                      <span className="ml-2 text-gray-300">
                        {reg === 'new' ? 'New Regime' : 'Old Regime'}
                      </span>
                    </label>
                  ))}
                </div>
                <RegimeInfo />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Age Group</label>
                <div className="grid grid-cols-3 gap-3">
                  {['<60', '60-80', '>80'].map((age) => (
                    <label key={age} className={`flex items-center bg-gray-800/50 border ${ageGroup === age ? 'border-red-500/50' : 'border-gray-700'} rounded-lg px-4 py-3 hover:border-red-500/30 transition`}>
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

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="salaried"
                  checked={isSalaried}
                  onChange={(e) => setIsSalaried(e.target.checked)}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-700 rounded"
                />
                <label htmlFor="salaried" className="ml-2 text-gray-300">
                  Salaried Individual (Standard Deduction: {regime === 'old' ? '₹50,000' : '₹75,000'})
                </label>
              </div>

              {regime === 'old' && (
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
              )}

              <div className="flex space-x-4 pt-2">
                <motion.button
                  onClick={calculateTax}
                  disabled={!income}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`cursor-pointer px-6 py-3 rounded-lg font-medium ${income ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 cursor-not-allowed'} text-white transition flex-1 flex items-center justify-center`}
                >
                  <Calculator className="h-5 w-5 mr-2" />
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

            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 flex items-center justify-center">
              {taxResult ? (
                <div className="w-full space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <ShieldCheck className="h-5 w-5 mr-2 text-red-400" />
                    Tax Summary ({taxResult.regime === 'new' ? 'New Regime' : 'Old Regime'})
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Taxable Income:</span>
                      <span className="text-white">₹{taxResult.taxableIncome.toLocaleString('en-IN')}</span>
                    </div>
                    
                    {taxResult.standardDeduction > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Standard Deduction:</span>
                        <span className="text-white">₹{taxResult.standardDeduction.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    
                    {taxResult.regime === 'old' && taxResult.deductions > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Deductions (80C):</span>
                        <span className="text-white">₹{taxResult.deductions.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    
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
                    className="cursor-pointer w-full mt-4 text-red-400 hover:text-red-300 text-sm flex items-center justify-center"
                  >
                    {showDetails ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />}
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
                  <Calculator className="h-12 w-12 mx-auto mb-4 text-gray-600" />
                  <p>Enter your details to calculate tax liability</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/tax" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-white transition flex items-center justify-center"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
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
                  <MessageCircle className="h-5 w-5 mr-2" />
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