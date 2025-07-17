import React from 'react';
import Accordion from '../components/ui/Accordion';
import faqsData from '../data/faqs';
import { motion } from 'framer-motion';

const Faq = () => {
  // Apply gradient background once at the root
  const gradientBg = 'bg-gradient-to-br from-red-700 via-red-800 to-black/70';

  return (
    <div className={`relative ${gradientBg} text-gray-100 min-h-screen overflow-hidden`}>
      {/* Shared Animated Background */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-gray-950">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10"
            initial={{ x: Math.random()*100, y: Math.random()*100, width: Math.random()*8+2, height: Math.random()*8+2 }}
            animate={{ y: [null, Math.random()*30-15], x: [null, Math.random()*30-15] }}
            transition={{ duration: Math.random()*8+5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
        ))}
      </motion.div>

      <div className="relative z-10">
        {/* Page Header (Hero Style) */}
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Frequently Asked <span className="text-red-500">Questions</span>
            </motion.h1>
            <motion.p
              className="mt-4 text-xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Find answers to common questions about our services and processes.
            </motion.p>
          </div>
        </section>

        {/* FAQs List */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl space-y-4">
            {faqsData.map((faq, idx) => (
              <Accordion
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                index={idx}
              />
            ))}
          </div>
        </section>

        {/* Additional Help */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="p-4 bg-red-600/20 rounded-full">
                  <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                      <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-100 mb-2">Still have questions?</h3>
                  <p className="text-gray-300 mb-4">
                    Our experts are here to help with any queries you have.
                  </p>
                  <motion.a
                    href="https://wa.me/919876543210"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-full font-medium"
                  >
                    Chat with Expert
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Faq;
