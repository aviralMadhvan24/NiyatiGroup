import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminPage = () => {
  return (
    <div className="relative bg-gradient-to-br from-red-700 via-red-800 to-black text-gray-300 min-h-screen overflow-hidden">
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900/50 to-gray-950">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-950 p-10 rounded-2xl border border-gray-800 shadow-2xl"
        >
          <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-red-600 transition-all"
            >
              <h2 className="text-xl font-semibold mb-4">Job Postings</h2>
              <p className="text-gray-400 mb-4">Create and manage job postings</p>
              <Link 
                to="/jobpost" 
                className="inline-block px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                Manage Jobs
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-red-600 transition-all"
            >
              <h2 className="text-xl font-semibold mb-4">Loan Offers</h2>
              <p className="text-gray-400 mb-4">Create and manage loan offers</p>
              <Link 
                to="/addloan" 
                className="inline-block px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                Manage Loans
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-red-600 transition-all"
            >
              <h2 className="text-xl font-semibold mb-4">Applications</h2>
              <p className="text-gray-400 mb-4">View job applications</p>
              <Link 
                to="/admin/jobapplications" 
                className="inline-block px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                View Applications
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-red-600 transition-all"
            >
              <h2 className="text-xl font-semibold mb-4"> Generic Applications</h2>
              <p className="text-gray-400 mb-4">View generic job applications</p>
              <Link 
                to="/admin/genericjobapplications" 
                className="inline-block px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                View Applications
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-red-600 transition-all"
            >
              <h2 className="text-xl font-semibold mb-4"> Loan Applications</h2>
              <p className="text-gray-400 mb-4">View loan applications</p>
              <Link 
                to="/admin/loanapplications" 
                className="inline-block px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                View Applications
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;