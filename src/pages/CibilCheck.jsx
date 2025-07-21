// src/components/CibilCheck.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CibilCheck = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pan, setPan] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('pan', pan);
    formData.append('service', 'CIBIL Score Check');

    try {
      await fetch('https://formspree.io/f/meozelgj', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });
      setSubmitted(true);
    } catch (err) {
      console.error('CIBIL form error:', err);
    }
  };

  return (
    <motion.div
      className="relative bg-gradient-to-br from-red-700 via-red-800 to-black text-gray-300 p-8 rounded-xl shadow-xl max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        CIBIL Score Check
      </h2>
      <p className="text-sm text-gray-400 mb-6 text-center">
        Know your creditworthiness before applying for a loan. Enter your details below.
      </p>

<iframe 
  src="https://www.paisabazaar.com/cibil-credit-score/"
  width="100%" 
  height="600" 
  style={{border: 'none'}}>
</iframe>

      {submitted ? (
        <p className="text-green-400 font-medium text-center">
          Thanks! We’ll get back to you with your CIBIL report shortly.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-red-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-red-500"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">PAN Number</label>
            <input
              type="text"
              value={pan}
              onChange={e => setPan(e.target.value.toUpperCase())}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-red-500 uppercase"
              placeholder="Enter your PAN (e.g. ABCDE1234F)"
              maxLength={10}
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            disabled={!name || !phone || pan.length !== 10}
            className={`w-full py-3 rounded-lg font-medium ${
              name && phone && pan.length === 10
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-gray-700 cursor-not-allowed'
            } text-white transition`}
          >
            Submit for CIBIL Check
          </motion.button>
        </form>
      )}
    </motion.div>
  );
};

export default CibilCheck;
