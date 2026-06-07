import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBriefcase, FiDollarSign, FiFileText, FiUsers, FiSettings, FiArrowRight } from 'react-icons/fi';

const AdminPage = () => {
  const adminModules = [
    {
      title: 'Job Postings',
      description: 'Create and manage recruitment opportunities',
      path: '/jobpost',
      icon: <FiBriefcase />,
      color: 'bg-blue-50 text-blue-600 border-blue-100'
    },
    {
      title: 'Loan Offers',
      description: 'Configure active financial lending products',
      path: '/addloan',
      icon: <FiDollarSign />,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100'
    },
    {
      title: 'Job Applications',
      description: 'Review applicants for specific roles',
      path: '/admin/jobapplications',
      icon: <FiFileText />,
      color: 'bg-teal-50 text-teal-600 border-teal-100'
    },
    {
      title: 'Talent Pool',
      description: 'View potential future candidates',
      path: '/admin/genericjobapplications',
      icon: <FiUsers />,
      color: 'bg-purple-50 text-purple-600 border-purple-100'
    },
    {
      title: 'Loan Applications',
      description: 'Process financial assistance requests',
      path: '/admin/loanapplications',
      icon: <FiSettings />,
      color: 'bg-amber-50 text-amber-600 border-amber-100'
    }
  ];

  return (
    <div className="relative min-h-screen niyati-bg-pattern bg-[#e8f4f8] pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <header className="mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <h1 className="text-4xl font-black text-slate-800 mb-2">Admin <span className="text-teal-600">Dashboard</span></h1>
             <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Manage your business operations</p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adminModules.map((module, i) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-teal-900/5 border border-teal-50 flex flex-col h-full group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 border ${module.color}`}>
                {module.icon}
              </div>
              <h2 className="text-xl font-black text-slate-800 mb-3">{module.title}</h2>
              <p className="text-slate-500 text-sm font-medium mb-10 flex-grow leading-relaxed">
                {module.description}
              </p>
              <Link to={module.path}>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 group-hover:bg-teal-600 transition-colors"
                >
                  Enter Module
                  <FiArrowRight />
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 pt-12 border-t border-teal-100 text-center">
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
             Niyati Group Internal Control Systems
           </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;