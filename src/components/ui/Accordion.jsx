import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const Accordion = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`border-b border-slate-100 transition-all duration-300 ${isOpen ? 'bg-teal-50/30 rounded-2xl p-2' : 'py-2'}`}
    >
      <button
        className="flex justify-between items-center w-full text-left p-4 rounded-xl transition-colors hover:bg-teal-50/50 group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`font-bold text-lg transition-colors duration-300 ${isOpen ? 'text-teal-700' : 'text-slate-700 group-hover:text-teal-600'}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={isOpen ? 'text-teal-600' : 'text-slate-400'}
        >
          <FiChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-6 pt-2 text-slate-500 leading-relaxed font-medium">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Accordion;