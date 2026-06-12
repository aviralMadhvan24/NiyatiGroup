import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiFileText, FiTrash2, FiClock, FiExternalLink, FiLinkedin, FiCreditCard } from 'react-icons/fi';

const ADMIN_EMAIL = "niyatigroup1@gmail.com";

const AdminApplications = () => {
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

        const snapshot = await getDocs(collection(db, "jobApplications"));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.().toLocaleString()
        }));
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        await deleteDoc(doc(db, "jobApplications", id));
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
        <header className="mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <h1 className="text-4xl font-black text-slate-800 mb-2">Job <span className="text-teal-600">Applicants</span></h1>
             <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                {applications.length} Candidates for Specific Roles
             </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence mode="popLayout">
            {applications.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/50 border-2 border-dashed border-teal-100 rounded-[3rem] p-20 text-center"
              >
                <FiBriefcase className="text-5xl text-teal-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800">No active applications</h3>
              </motion.div>
            ) : (
              applications.map((app, idx) => (
                <motion.div
                  key={app.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl shadow-teal-900/5 border border-teal-50 group hover:shadow-teal-900/10 transition-all"
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-10">
                     <div className="flex-grow space-y-6">
                        <div className="flex items-start justify-between">
                           <div>
                              <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest mb-1 italic">Role Applied For</p>
                              <h2 className="text-2xl font-black text-slate-800">{app.jobTitle || "Featured Position"}</h2>
                           </div>
                           <div className="bg-teal-50 px-4 py-2 rounded-2xl border border-teal-100 hidden sm:block">
                              <FiBriefcase className="text-teal-600" />
                           </div>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                           {app.cvUrl && (
                              <a 
                                href={app.cvUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="px-6 py-3 bg-teal-600 text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-900/10 hover:bg-teal-700 transition-all"
                              >
                                 <FiFileText />
                                 View Resume PDF
                                 <FiExternalLink />
                              </a>
                           )}
                           {app.linkedin && (
                              <a 
                                href={app.linkedin} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="px-6 py-3 bg-[#0a66c2] text-white rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-[#004182] transition-all"
                              >
                                 <FiLinkedin />
                                 LinkedIn Profile
                                 <FiExternalLink />
                              </a>
                           )}
                           {app.paymentScreenshot && (
                              <a 
                                href={app.paymentScreenshot} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="px-6 py-3 bg-emerald-50 text-emerald-700 rounded-xl font-bold text-xs flex items-center gap-2 border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                              >
                                 <FiCreditCard />
                                 Payment Receipt
                                 <FiExternalLink />
                              </a>
                           )}
                        </div>
                     </div>

                     <div className="lg:w-48 flex flex-col justify-between items-end lg:border-l lg:border-teal-50 lg:pl-10">
                        <div className="text-right hidden lg:block">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                           <span className="inline-block px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black rounded-full border border-amber-100 uppercase tracking-widest">Received</span>
                        </div>
                        
                        <div className="w-full space-y-3">
                           <motion.button
                             onClick={() => handleDelete(app.id)}
                             whileHover={{ backgroundColor: '#fee2e2', color: '#ef4444' }}
                             className="w-full py-4 px-6 bg-slate-50 text-slate-400 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border border-slate-100"
                           >
                             <FiTrash2 />
                             Remove
                           </motion.button>
                           <p className="text-[10px] font-bold text-slate-300 text-center uppercase tracking-tighter">
                             ID: {app.id.slice(0, 8)} • {app.createdAt}
                           </p>
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

export default AdminApplications;
