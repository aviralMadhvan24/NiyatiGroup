import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Accordion from '../components/ui/Accordion';
import { FiMessageSquare, FiPhone } from 'react-icons/fi';

const Faq = () => {
  const faqs = [
    {
      question: "What tax services do you offer?",
      answer: "We offer comprehensive tax services including Income Tax Return (ITR) filing for individuals, businesses, and NRIs, GST registration and filing, Tax Audit, and Tax Planning."
    },
    {
      question: "How long does it take to process a loan?",
      answer: "Processing time varies by loan type and bank. Generally, personal loans take 3-5 working days, while business and home loans may take 10-15 working days after document submission."
    },
    {
      question: "What industries do you recruit for?",
      answer: "Our recruitment division specializes in Technology (IT), Finance, Healthcare, Manufacturing, and Retail sectors across various levels from entry-level to executive roles."
    },
    {
      question: "What documents are required for GST registration?",
      answer: "Key documents include PAN Card, Aadhaar Card, Address Proof of business, Bank Account details, and Photograph of the applicant/authorized signatory."
    },
    {
      question: "How can I book an appointment?",
      answer: "You can book an appointment through our Contact page, by calling us directly at +91 9997070599, or through WhatsApp."
    }
  ];

  return (
    <div className="relative min-h-screen niyati-bg-pattern bg-[#e8f4f8] pt-24 pb-20">
      
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Header */}
        <section className="pt-20 pb-16 text-center">
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
           >
              <motion.div className="inline-flex items-center px-4 py-2 mb-6 font-bold rounded-full text-teal-700 bg-teal-50 border border-teal-100 shadow-sm">
                <FiMessageSquare className="mr-2" />
                Frequently Asked Questions
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
                Got <span className="text-teal-600">Questions?</span> We have Answers
              </h1>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed font-medium">
                Find quick answers to common questions about our tax, loan, and recruitment services. If you can't find what you're looking for, feel free to reach out.
              </p>
           </motion.div>
        </section>

        {/* FAQ Grid */}
        <section className="mb-24 flex justify-center">
           <div className="w-full max-w-4xl bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-teal-900/5 border border-teal-50">
              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <Accordion 
                    key={index} 
                    question={faq.question} 
                    answer={faq.answer} 
                    index={index} 
                  />
                ))}
              </div>
           </div>
        </section>

        {/* Support Section */}
        <section className="max-w-6xl mx-auto">
           <motion.div 
             initial={{ opacity: 0, scale: 0.98 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="niyati-card p-12 text-center rounded-[3rem] relative overflow-hidden"
           >
              <div className="absolute top-0 right-0 p-10 opacity-5 -mr-16 -mt-16 bg-teal-300 w-64 h-64 rounded-full"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-6">Still have questions?</h2>
                <p className="text-lg text-teal-50/70 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                  If you didn't find the answer to your question, please don't hesitate to contact us. Our team of experts is ready to assist you.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/contact">
                    <motion.button whileHover={{ scale: 1.05, bg: '#ffffff', color: '#0d9488' }} whileTap={{ scale: 0.95 }} className="px-10 py-4 bg-white text-teal-700 rounded-xl font-bold shadow-2xl transition-all">
                      Contact Support
                    </motion.button>
                  </Link>
                  <a href="https://wa.me/919997070599" target="_blank" rel="noopener noreferrer">
                    <motion.button whileHover={{ scale: 1.05, bg: '#10b981' }} whileTap={{ scale: 0.95 }} className="px-10 py-4 bg-emerald-500 text-white rounded-xl font-bold shadow-2xl transition-all flex items-center justify-center gap-2">
                       <FiPhone />
                       WhatsApp Us
                    </motion.button>
                  </a>
                </div>
              </div>
           </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Faq;
