import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, BookOpen, MessageCircle } from 'lucide-react';

const TaxCalculator = () => {
 return (
    <div className="relative min-h-screen niyati-bg-pattern bg-[#e8f4f8] pt-24 pb-20">
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="max-w-4xl mx-auto"
        >
          <header className="text-center mb-12">
             <div className="inline-flex items-center px-4 py-2 mb-6 font-bold rounded-full text-teal-700 bg-teal-50 border border-teal-100 shadow-sm">
                <Calculator className="mr-2 h-4 w-4" />
                Planning Tools
             </div>
             <h2 className="text-4xl md:text-5xl font-bold text-slate-800">
               Income Tax <span className="text-teal-600">Calculator</span>
             </h2>
          </header>

          <div className="bg-white p-6 md:p-10 rounded-[3rem] shadow-2xl shadow-teal-900/10 border border-teal-50 overflow-hidden">
            <div className="w-full mb-8 relative" style={{ height: '700px' }}>
              {/* Overlay div with heading - Modernized */}
              <div 
                className="absolute top-0 left-0 right-0 h-32 bg-white/80 backdrop-blur-md rounded-t-[2rem] z-20 flex items-center justify-center border-b border-teal-50"
                style={{ pointerEvents: 'none' }}
              >
                <div className="text-center">
                  <h3 className="text-xl font-bold text-slate-800">Interactive Calculation Tool</h3>
                  <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mt-1">Estimations & Planning</p>
                </div>
              </div>
              
              {/* ClearTax iframe */}
              <iframe
                src="https://cleartax.in/paytax/taxcalculator/embed"
                title="ClearTax Income Tax Calculator"
                width="100%"
                height="650"
                className="absolute top-0 left-0 w-full h-full"
                style={{ 
                  border: 'none', 
                  borderRadius: '2rem', 
                  backgroundColor: '#f8fafc',
                  zIndex: 10
                }}
              />
              
              <div className="absolute bottom-4 left-0 right-0 text-center z-20">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                  **TERMS AND CONDITIONS APPLIED**
                </p>
              </div>
            </div>
            
            {/* Learn & WhatsApp */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tax" className="flex-1">
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: '#f1f5f9' }} 
                  whileTap={{ scale: 0.95 }} 
                  className="w-full px-6 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen className="h-5 w-5" />
                  View Tax Services
                </motion.button>
              </Link>
              <a href="https://wa.me/+919997070599?text=Hi%20NiyatiGroup%20I%20need%20help%20with%20tax%20planning" target="_blank" rel="noopener noreferrer" className="flex-1">
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: '#10b981' }} 
                  whileTap={{ scale: 0.95 }} 
                  className="w-full px-6 py-4 bg-emerald-500 text-white rounded-2xl font-bold shadow-xl shadow-emerald-900/10 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Expert
                </motion.button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TaxCalculator;