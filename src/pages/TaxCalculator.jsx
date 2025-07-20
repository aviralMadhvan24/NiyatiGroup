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
  ShieldCheck,
  User,
  Phone
} from 'lucide-react';

const sessionConfig = {
  '24-25': {
    old: {
      slabs: [
        { limit: 1000000, rate: 0.30, label: '> ₹10,00,000' },
        { limit: 500000, rate: 0.20, label: '₹5,00,001–₹10,00,000' },
        { limit: 250000, rate: 0.05, label: '₹2,50,001–₹5,00,000' }
      ],
      rebateLimit: 500000,
      rebateMax: 12500
    },
    new: {
      slabs: [
        { limit: 1500000, rate: 0.30, label: '> ₹15,00,000' },
        { limit: 1200000, rate: 0.20, label: '₹12,00,001–₹15,00,000' },
        { limit: 900000, rate: 0.15, label: '₹9,00,001–₹12,00,000' },
        { limit: 600000, rate: 0.10, label: '₹6,00,001–₹9,00,000' },
        { limit: 300000, rate: 0.05, label: '₹3,00,001–₹6,00,000' }
      ],
      rebateLimit: 750000,
      rebateMax: 25000
    }
  },
  '25-26': {
    old: {
      slabs: [
        { limit: 1000000, rate: 0.30, label: '> ₹10,00,000' },
        { limit: 500000, rate: 0.20, label: '₹5,00,001–₹10,00,000' },
        { limit: 250000, rate: 0.05, label: '₹2,50,001–₹5,00,000' }
      ],
      rebateLimit: 500000,
      rebateMax: 12500
    },
    new: {
      slabs: [
        { limit: 1500000, rate: 0.30, label: '> ₹15,00,000' },
        { limit: 1200000, rate: 0.20, label: '₹12,00,001–₹15,00,000' },
        { limit: 900000, rate: 0.15, label: '₹9,00,001–₹12,00,000' },
        { limit: 600000, rate: 0.10, label: '₹6,00,001–₹9,00,000' },
        { limit: 300000, rate: 0.05, label: '₹3,00,001–₹6,00,000' }
      ],
      rebateLimit: 750000,
      rebateMax: 25000
    }
  },
  '26-27': {
    old: {
      slabs: [
        { limit: 1000000, rate: 0.30, label: '> ₹10,00,000' },
        { limit: 500000, rate: 0.20, label: '₹5,00,001–₹10,00,000' },
        { limit: 250000, rate: 0.05, label: '₹2,50,001–₹5,00,000' }
      ],
      rebateLimit: 500000,
      rebateMax: 12500
    },
    new: {
      slabs: [
        { limit: 1500000, rate: 0.30, label: '> ₹15,00,000' },
        { limit: 1200000, rate: 0.20, label: '₹12,00,001–₹15,00,000' },
        { limit: 900000, rate: 0.15, label: '₹9,00,001–₹12,00,000' },
        { limit: 600000, rate: 0.10, label: '₹6,00,001–₹9,00,000' },
        { limit: 300000, rate: 0.05, label: '₹3,00,001–₹6,00,000' }
      ],
      rebateLimit: 750000,
      rebateMax: 25000
    }
  }
};

const TaxCalculator = () => {
  const [session, setSession] = useState('24-25');
  const [income, setIncome] = useState('');
  const [ageGroup, setAgeGroup] = useState('<60');
  const [investment, setInvestment] = useState('');
  const [regime, setRegime] = useState('new');
  const [isSalaried, setIsSalaried] = useState(false);
  const [taxResult, setTaxResult] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const calculateTax = () => {
    const cfg = sessionConfig[session][regime];
    let grossIncome = parseFloat(income) || 0;
    
    // Calculate taxable income
    let taxableIncome = grossIncome;
    let deductions = 0;
    let standardDeduction = 0;

   

   if (regime === 'old') {
    // For old regime - special handling to match IT Dept calculator
    deductions = parseFloat(investment) || 0;
    taxableIncome = Math.max(taxableIncome - deductions, 0);
    
    /* 
     * CRITICAL FIX: 
     * Income Tax Dept calculator NEVER applies standard deduction
     * when deductions are entered, regardless of salaried status
     */
   
  } if (regime === 'new') {
  // New regime - standard deduction only applies if no deductions entered
  if (!investment || parseFloat(investment) === 0) {
    standardDeduction = 75000;
    taxableIncome = Math.max(taxableIncome - standardDeduction, 0);
  }
}
    
    // Calculate tax using slabs
    let tax = 0;
    let remaining = taxableIncome;
    const slabsArr = [];
    
    // Apply slabs from highest to lowest
    for (const slab of cfg.slabs) {
      if (remaining > slab.limit) {
        const slabAmount = remaining - slab.limit;
        const slabTax = slabAmount * slab.rate;
        tax += slabTax;
        
        slabsArr.push({
          range: slab.label,
          rate: `${slab.rate * 100}%`,
          amount: slabAmount,
          tax: slabTax
        });
        
        remaining = slab.limit;
      }
    }
    
    // Apply rebate
    const rebate = taxableIncome <= cfg.rebateLimit ? Math.min(tax, cfg.rebateMax) : 0;
    const taxAfterRebate = tax - rebate;
    
    // Calculate cess
    const cess = taxAfterRebate * 0.04;
    const totalTax = taxAfterRebate + cess;
    
    // Calculate effective tax rate
    const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;
    
    const result = {
      regime,
      grossIncome,
      taxableIncome,
      deductions,
      standardDeduction,
      taxBeforeRebate: tax,
      rebate,
      tax: taxAfterRebate,
      cess,
      totalTax,
      slabs: slabsArr,
      effectiveRate
    };
    
    setTaxResult(result);
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const taxData = calculateTax();
      
      // Prepare form data for Formspree
      const formData = new FormData();
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('income', income);
      formData.append('regime', regime === 'new' ? 'New Regime' : 'Old Regime');
      formData.append('taxResult', JSON.stringify(taxData, null, 2));
      formData.append('_subject', `New Tax Calculation from ${name}`);
      
      // Replace 'YOUR_FORMSPREE_ID' with your actual Formspree form ID
      const response = await fetch('https://formspree.io/f/xeozeggy', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetCalculator = () => {
    setSession('24-25');
    setIncome('');
    setInvestment('');
    setName('');
    setPhone('');
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
          <span><strong>Old Regime:</strong> ₹50,000 standard deduction for salaried + deductions u/s 80C (₹1.5L), 80D (₹25k-₹50k), HRA, etc.</span>
        </p>
        <p className="flex items-start">
          <ArrowRight className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
          <span><strong>New Regime:</strong> ₹75,000 standard deduction for salaried + no other deductions</span>
        </p>
        <p className="flex items-start">
          <ArrowRight className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
          <span><strong>Rebate (Sec 87A):</strong> Up to ₹12,500 for income ≤ ₹5L (Old) / Up to ₹25,000 for income ≤ ₹7.5L (New)</span>
        </p>
        <button onClick={() => setShowDisclaimer(!showDisclaimer)} className="text-red-400 hover:text-red-300 text-xs flex items-center mt-2">
          {showDisclaimer ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
          {showDisclaimer ? 'Hide Disclaimer' : 'Show Important Disclaimer'}
        </button>
        {showDisclaimer && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="bg-gray-900/30 p-3 rounded border border-gray-700 mt-2">
              <p className="flex items-start">
                <AlertCircle className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                <span>Tax laws and slabs may change; consult a professional for the latest rates. This calculator matches the Income Tax Department's official calculator for FY 2024-25.</span>
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );

  return (
    <motion.div className="relative bg-gradient-to-br from-red-700 via-red-800 to-black text-gray-300 min-h-screen overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {/* Background grid overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900/50 to-gray-950">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 md:py-24">
        <motion.div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 md:p-8 shadow-xl max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center justify-center mb-6">
            <Calculator className="h-8 w-8 text-red-400 mr-2" />
            <h2 className="text-3xl font-bold text-white text-center">Income Tax Calculator</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Your Information</h3>
                  <div>
                    <label className="block text-gray-300 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <input 
                        type="text" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        placeholder="Enter your name" 
                        required
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 text-white" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <input 
                        type="tel" 
                        value={phone} 
                        onChange={e => setPhone(e.target.value)} 
                        placeholder="Enter your phone number" 
                        required
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 text-white" 
                      />
                    </div>
                  </div>
                </div>

                {/* Financial Year */}
                <div>
                  <label className="block text-gray-300 mb-2">Financial Year</label>
                  <select value={session} onChange={e => setSession(e.target.value)} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 text-white">
                    <option value="24-25">FY 2024-25</option>
                    <option value="25-26">FY 2025-26</option>
                    <option value="26-27">FY 2026-27</option>
                  </select>
                </div>
                
                {/* Income Input */}
                <div>
                  <label className="block text-gray-300 mb-2">Annual Income (₹)</label>
                  <input 
                    type="number" 
                    value={income} 
                    onChange={e => setIncome(e.target.value)} 
                    placeholder="Enter annual income" 
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 text-white" 
                  />
                </div>
                
                {/* Regime Toggle */}
                <div>
                  <label className="block text-gray-300 mb-2">Tax Regime</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['new', 'old'].map(key => (
                      <label key={key} className={`flex items-center bg-gray-800/50 border ${regime===key?'border-red-500/50':'border-gray-700'} rounded-lg px-4 py-3 hover:border-red-500/30`}> 
                        <input type="radio" name="regime" checked={regime===key} onChange={()=>setRegime(key)} className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-700" />
                        <span className="ml-2 text-gray-300">{key==='new'?'New Regime':'Old Regime'}</span>
                      </label>
                    ))}
                  </div>
                  <RegimeInfo />
                </div>
                
                {/* Age Group */}
                <div>
                  <label className="block text-gray-300 mb-2">Age Group</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['<60','60-80','>80'].map(age=> (
                      <label key={age} className={`flex items-center bg-gray-800/50 border ${ageGroup===age?'border-red-500/50':'border-gray-700'} rounded-lg px-4 py-3 hover:border-red-500/30`}> 
                        <input type="radio" name="ageGroup" checked={ageGroup===age} onChange={()=>setAgeGroup(age)} className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-700" />
                        <span className="ml-2 text-gray-300">{age==='<'+'60'?'Below 60':age==='60-80'?'60-80':'Above 80'}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Deductions for Old Regime */}
                { regime === 'old' && (
                  <div>
                    <label className="block text-gray-300 mb-2">Total Deductions (₹)</label>
                    <input 
                      type="number" 
                      value={investment} 
                      onChange={e => setInvestment(e.target.value)} 
                      placeholder="Enter total deductions" 
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 text-white" 
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Includes 80C (₹1.5L), 80D (₹25k-₹50k), HRA, etc.
                    </p>
                  </div>
                )}
                
               
                
                
                {/* Buttons */}
                <div className="flex space-x-4 pt-2">
                  <motion.button 
                    type="submit"
                    disabled={!income || isSubmitting} 
                    whileHover={{scale:1.03}} 
                    whileTap={{scale:0.98}} 
                    className={`flex-1 px-6 py-3 rounded-lg font-medium ${income && !isSubmitting ?'bg-red-600 hover:bg-red-700':'bg-gray-700 cursor-not-allowed'} flex items-center justify-center text-white`}
                  >
                    {isSubmitting ? (
                      'Submitting...'
                    ) : (
                      <>
                        <Calculator className="h-5 w-5 mr-2" />
                        Calculate & Submit
                      </>
                    )}
                  </motion.button>
                  <motion.button 
                    type="button"
                    onClick={resetCalculator} 
                    whileHover={{scale:1.03}} 
                    whileTap={{scale:0.98}} 
                    className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-white flex items-center justify-center"
                  >
                    Reset
                  </motion.button>
                </div>
                {submitSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-900/50 border border-green-700 p-3 rounded-lg text-green-300 text-sm"
                  >
                    Your tax calculation has been submitted successfully! We'll contact you soon.
                  </motion.div>
                )}
              </div>
              
              {/* Result Panel */}
              <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 flex items-center justify-center">
                {taxResult ? (
                  <div className="w-full space-y-6">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <ShieldCheck className="h-5 w-5 mr-2 text-red-400" />
                      Tax Summary ({taxResult.regime === 'new' ? 'New' : 'Old'} Regime)
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Gross Income:</span>
                        <span className="text-white">₹{taxResult.grossIncome.toLocaleString('en-IN')}</span>
                      </div>
                      {taxResult.standardDeduction > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Standard Deduction:</span>
                          <span className="text-white">₹{taxResult.standardDeduction.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      {regime === 'old' && taxResult.deductions > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total Deductions:</span>
                          <span className="text-white">₹{taxResult.deductions.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <div className="flex justify-between border-t border-gray-700 pt-3">
                        <span className="text-gray-300 font-medium">Taxable Income:</span>
                        <span className="text-white font-medium">₹{taxResult.taxableIncome.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tax before Rebate:</span>
                        <span className="text-white">₹{taxResult.taxBeforeRebate.toLocaleString('en-IN', {maximumFractionDigits:2})}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rebate (Sec 87A):</span>
                        <span className="text-white">₹{taxResult.rebate.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tax after Rebate:</span>
                        <span className="text-white">₹{taxResult.tax.toLocaleString('en-IN', {maximumFractionDigits:2})}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Health & Education Cess (4%):</span>
                        <span className="text-white">₹{taxResult.cess.toLocaleString('en-IN', {maximumFractionDigits:2})}</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-700 pt-3">
                        <span className="text-gray-300 font-medium">Total Tax:</span>
                        <span className="text-red-400 font-bold">₹{taxResult.totalTax.toLocaleString('en-IN', {maximumFractionDigits:2})}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Effective Tax Rate:</span>
                        <span className="text-white">{taxResult.effectiveRate.toFixed(2)}%</span>
                      </div>
                    </div>
                    <motion.button 
                      onClick={() => setShowDetails(!showDetails)} 
                      className="w-full mt-4 text-red-400 hover:text-red-300 text-sm flex items-center justify-center"
                    >
                      <ChevronDown className="h-4 w-4 mr-1" />
                      {showDetails ? 'Hide' : 'Show'} Slab Details
                    </motion.button>
                    {showDetails && (
                      <motion.div 
                        initial={{opacity:0,height:0}} 
                        animate={{opacity:1,height:'auto'}} 
                        transition={{duration:0.3}} 
                        className="overflow-hidden mt-4 space-y-3"
                      >
                        {taxResult.slabs.map((s,i) => (
                          <div key={i} className="bg-gray-700/50 p-3 rounded border-gray-600 border">
                            <div className="flex justify-between">
                              <span className="text-gray-300">{s.range}</span>
                              <span className="text-white">{s.rate}</span>
                            </div>
                            <div className="flex justify-between text-sm mt-1">
                              <span className="text-gray-400">Amount: ₹{s.amount.toLocaleString('en-IN')}</span>
                              <span className="text-gray-400">Tax: ₹{s.tax.toLocaleString('en-IN', {maximumFractionDigits:2})}</span>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <Calculator className="h-12 w-12 mx-auto mb-4 text-gray-600" />
                    <p>Enter details to calculate tax</p>
                  </div>
                )}
              </div>
            </div>
          </form>
          
          {/* Learn & WhatsApp */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tax" className="flex-1">
              <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.98}} className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white flex items-center justify-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Learn About Tax Services
              </motion.button>
            </Link>
            <a href="https://wa.me/+919997070599?text=Hi%20NiyatiGroup%20I%20need%20help%20with%20tax%20planning" target="_blank" rel="noopener noreferrer" className="flex-1">
              <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.98}} className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white flex items-center justify-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp Expert
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TaxCalculator;

