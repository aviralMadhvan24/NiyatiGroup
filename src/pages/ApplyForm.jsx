import React from 'react';
import { motion } from 'framer-motion';

const ApplyForm = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-gray-950 p-10 rounded-2xl border border-gray-800 shadow-2xl"
      >
        <motion.h2
          className="text-3xl font-bold text-gray-100 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Apply for a Position
        </motion.h2>
        <p className="text-gray-400 mb-8">
          Fill out the application form and we’ll get in touch shortly.
        </p>

        <form
          action="https://formsubmit.co/niyatigroup1@gmail.com"
          method="POST"
          encType="multipart/form-data"
          className="space-y-6"
        >
          {/* Disable CAPTCHA (optional) */}
          <input type="hidden" name="_captcha" value="false" />

          {/* Redirect after submission */}
          <input type="hidden" name="_next" value="https://niyatigroup1@gmail.com/thank-you.html" />

          {[
            { name: 'name', type: 'text', placeholder: 'Full Name', required: true },
            { name: 'email', type: 'email', placeholder: 'Email Address', required: true },
            { name: 'phone', type: 'tel', placeholder: 'Phone Number', required: true },
            { name: 'location', type: 'text', placeholder: 'City / State', required: true },
            { name: 'position', type: 'text', placeholder: 'Position Applying For', required: true },
            { name: 'linkedin', type: 'url', placeholder: 'LinkedIn Profile (optional)', required: false },
          ].map((field, index) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <input
                type={field.type}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-100 placeholder-gray-500 transition-all"
              />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <select
              name="experience_level"
              required
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-100 placeholder-gray-500 transition-all"
            >
              <option value="" disabled selected>
                Select Experience Level
              </option>
              <option value="Fresher">Fresher</option>
              <option value="Experienced">Experienced</option>
            </select>
          </motion.div>

          {/* PDF Upload */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <input
              type="file"
              name="resume"
              accept="application/pdf"
              required
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
            />
            <p className="text-xs text-gray-500 mt-1">Only PDF files accepted</p>
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 bg-primary text-white rounded-lg font-medium shadow-lg hover:bg-primary/90 transition-all"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            Submit Application
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ApplyForm;
