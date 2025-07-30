import React, { useState } from "react";
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from "framer-motion";

const LoanApplyForm = () => {
  const [formData, setFormData] = useState({
    offerTitle: '',         // Which loan offer (optional, or you can prepopulate if context)
    name: '',
    email: '',
    phone: '',
    city: '',
    loanAmount: '',
    tenure: '',
    employment: '',
    income: '',
    pan: '',
    remarks: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "loanApplications"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      alert("Loan application submitted!");
      setFormData({
        offerTitle: '',
        name: '',
        email: '',
        phone: '',
        city: '',
        loanAmount: '',
        tenure: '',
        employment: '',
        income: '',
        pan: '',
        remarks: '',
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Submission failed.");
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-red-700 via-red-800 to-black text-gray-300 min-h-screen overflow-hidden">
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900/50 to-gray-950">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
      </div>

      {/* Form Container */}
      <div className="relative mt-20 z-10 max-w-4xl mx-auto px-6 py-16">
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
            Apply for a Loan
          </motion.h2>
          <p className="text-gray-400 mb-8">
            Fill out the loan application form and we’ll get in touch shortly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { name: "offerTitle", type: "text", placeholder: "Loan Offer (optional)", required: false },
              { name: "name", type: "text", placeholder: "Full Name", required: true },
              { name: "email", type: "email", placeholder: "Email Address", required: true },
              { name: "phone", type: "tel", placeholder: "Phone Number", required: true },
              { name: "city", type: "text", placeholder: "City / State", required: true },
              { name: "loanAmount", type: "number", placeholder: "Loan Amount Needed (₹)", required: true },
              { name: "tenure", type: "number", placeholder: "Desired Tenure (months)", required: true },
              { name: "employment", type: "text", placeholder: "Employment Type (e.g., salaried, self-employed)", required: true },
              { name: "income", type: "number", placeholder: "Monthly Income (₹)", required: true },
              { name: "pan", type: "text", placeholder: "PAN Number", required: true },
              { name: "remarks", type: "text", placeholder: "Any additional remarks (optional)", required: false },
            ].map((field, idx) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.07 }}
              >
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-100 placeholder-gray-500 transition-all"
                />
              </motion.div>
            ))}

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline-block ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default LoanApplyForm;
