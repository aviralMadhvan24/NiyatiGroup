import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiBriefcase, FiDollarSign, FiTrash2, FiClock, FiCreditCard } from 'react-icons/fi';

const ADMIN_EMAIL = "niyatigroup1@gmail.com";

const AdminLoanApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const user = auth.currentUser;
        if (!user || user.email !== ADMIN_EMAIL) {
          alert("Access denied");
          return;
        }

        const snapshot = await getDocs(collection(db, "loanApplications"));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.().toLocaleString()
        }));
        setApplications(data);
      } catch (error) {
        console.error("Error fetching loan applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this loan application?")) {
      try {
        await deleteDoc(doc(db, "loanApplications", id));
        setApplications(prev => prev.filter(app => app.id !== id));
      } catch (error) {
        console.error("Failed to delete application:", error);
        alert("Failed to delete application. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen niyati-bg-pattern bg-[#e8f4f8] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen niyati-bg-pattern bg-[#e8f4f8] pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-5xl relative z-10">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <h1 className="text-4xl font-black text-slate-800 mb-2">Loan <span className="text-teal-600">Requests</span></h1>
             <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                {applications.length} Finance application{applications.length !== 1 ? 's' : ''} to process
             </p>
          </motion.div>
        </header>

        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {applications.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/50 backdrop-blur-sm border-2 border-dashed border-teal-100 rounded-[3rem] p-20 text-center"
              >
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-teal-900/5">
                   <FiClock className="text-3xl text-teal-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Queue is Empty</h3>
                <p className="text-slate-500 font-medium">New loan applications will appear here as they come in.</p>
              </motion.div>
            ) : (
              applications.map((app, idx) => (
                <motion.div
                  key={app.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl shadow-teal-900/5 border border-teal-50 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                     <FiDollarSign className="text-9xl -mr-10 -mt-10" />
                  </div>

                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="md:col-span-2 space-y-8">
                       <div className="flex items-start justify-between">
                          <div>
                             <h3 className="text-2xl font-black text-slate-800 mb-1">{app.name}</h3>
                             <p className="text-teal-600 font-bold text-sm tracking-tight">{app.email}</p>
                          </div>
                          <div className="bg-teal-50 px-4 py-1.5 rounded-full border border-teal-100">
                             <span className="text-[10px] font-black text-teal-700 uppercase tracking-widest">{app.offerTitle || "Custom Loan"}</span>
                          </div>
                       </div>

                       <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                          <div className="space-y-1">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                <FiPhone /> Phone
                             </p>
                             <a href={`tel:${app.phone}`} className="text-sm font-bold text-slate-800 hover:text-teal-600 transition-colors">{app.phone}</a>
                          </div>
                          <div className="space-y-1">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                <FiMapPin /> City
                             </p>
                             <p className="text-sm font-bold text-slate-800">{app.city}</p>
                          </div>
                          <div className="space-y-1">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                <FiCreditCard /> Monthly Income
                             </p>
                             <p className="text-sm font-bold text-emerald-600">₹{parseFloat(app.income).toLocaleString('en-IN')}</p>
                          </div>
                          <div className="space-y-1">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                <FiDollarSign /> Amount
                             </p>
                             <p className="text-sm font-bold text-slate-800">₹{parseFloat(app.loanAmount).toLocaleString('en-IN')}</p>
                          </div>
                          <div className="space-y-1">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Tenure</p>
                             <p className="text-sm font-bold text-slate-800">{app.tenure} Months</p>
                          </div>
                          <div className="space-y-1">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Employment</p>
                             <p className="text-sm font-bold text-slate-800">{app.employment}</p>
                          </div>
                       </div>

                       {app.remarks && (
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Remarks</p>
                             <p className="text-xs font-medium text-slate-600 leading-relaxed italic">"{app.remarks}"</p>
                          </div>
                       )}
                    </div>

                    <div className="flex flex-col justify-between items-end border-l border-teal-50 pl-0 md:pl-10 pt-10 md:pt-0">
                       <div className="text-right w-full">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">PAN Number</p>
                          <p className="text-lg font-black text-slate-800 tracking-widest">{app.pan}</p>
                       </div>

                       <div className="w-full space-y-4">
                          <motion.button
                            onClick={() => handleDelete(app.id)}
                            whileHover={{ backgroundColor: '#fee2e2', color: '#ef4444' }}
                            className="w-full py-4 bg-slate-50 text-slate-400 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 border border-slate-100"
                          >
                            <FiTrash2 />
                            Delete Permanent
                          </motion.button>
                          <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-tighter">
                             <FiClock />
                             <span>Submitted {app.createdAt}</span>
                          </div>
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminLoanApplications;
