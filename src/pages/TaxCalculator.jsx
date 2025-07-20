import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, BookOpen, MessageCircle } from 'lucide-react';

const TaxCalculator = () => {
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
          
          {/* Embedding ClearTax calculator */}
          <div className="w-full mb-8 relative" style={{ height: '800px' }}>
            {/* Overlay div with heading */}
            <div 
              className="absolute top-0 left-0 right-0 h-40 bg-gray-900/70 border-t border-l border-r border-gray-800 rounded-t-lg z-20 flex items-center justify-center"
              style={{ 
                pointerEvents: 'none',
                backdropFilter: 'blur(8px)'
              }}
            >
              <div className="text-center px-4">
                <h3 className="text-xl font-bold text-white mb-1">Interactive Tax Calculator</h3>
             
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
                borderRadius: '8px', 
                backgroundColor: '#1f2937',
                zIndex: 10
              }}
            />
            <div className="absolute bottom-4 left-0 right-0 text-center z-20">
  <p className="text-sm font-bold text-gray-300">
    <strong>**TERMS AND CONDITIONS APPLIED**</strong>
  </p>
</div>
          </div>
          
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