import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, query, orderBy, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBriefcase, FiMapPin, FiClock, FiCalendar, FiDollarSign, FiTrash2, FiEdit3, FiArrowRight } from 'react-icons/fi';

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [editingDateJobId, setEditingDateJobId] = useState(null);
  const [newDate, setNewDate] = useState("");
  const navigate = useNavigate();
  
  const ADMIN_EMAIL = "niyatigroup1@gmail.com";

  useEffect(() => {
    const fetchJobs = async () => {
      const q = query(collection(db, 'jobPosts'), orderBy('postedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const jobData = querySnapshot.docs.map(docSnap => {
        const data = docSnap.data();
        const lastDate = data.lastDate?.toDate();
        const now = new Date();
        return {
          id: docSnap.id,
          ...data,
          lastDate,
          formattedSalary:
            data.showAsRange && data.minSalary !== undefined && data.maxSalary !== undefined
              ? `₹${new Intl.NumberFormat('en-IN').format(data.minSalary)} - ₹${new Intl.NumberFormat('en-IN').format(data.maxSalary)}`
              : data.minSalary !== undefined
              ? `₹${new Intl.NumberFormat('en-IN').format(data.minSalary)}`
              : null,
          salaryType: data.salaryType || "monthly",
          status:
            data.status === 'closed'
              ? 'closed'
              : lastDate && lastDate < now
              ? 'expired'
              : 'active'
        };
      });
      setJobs(jobData);
    };

    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    fetchJobs();
    return () => unsubscribe();
  }, []);

  const handleDelete = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      try {
        await deleteDoc(doc(db, 'jobPosts', jobId));
        setJobs(jobs.filter(job => job.id !== jobId));
      } catch (error) {
        console.error("Error deleting job: ", error);
        alert("Failed to delete job posting");
      }
    }
  };

  const handleDateUpdate = async (jobId) => {
    if (!newDate) {
      alert("Please select a new date");
      return;
    }
    try {
      await updateDoc(doc(db, 'jobPosts', jobId), {
        lastDate: new Date(newDate)
      });
      alert("Last date updated successfully!");
      setJobs(prevJobs =>
        prevJobs.map(job =>
          job.id === jobId ? { ...job, lastDate: new Date(newDate), status: 'active' } : job
        )
      );
      setEditingDateJobId(null);
      setNewDate("");
    } catch (error) {
      console.error("Error updating date: ", error);
      alert("Failed to update date");
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      active: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      expired: 'bg-amber-50 text-amber-600 border-amber-100',
      closed: 'bg-slate-50 text-slate-600 border-slate-100'
    };
    return (
      <span className={`text-[10px] font-black px-3 py-1 rounded-full border uppercase tracking-wider ${statusStyles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="relative min-h-screen niyati-bg-pattern bg-[#e8f4f8] py-24 px-4 sm:px-6">
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <header className="text-center mb-16">
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
           >
              <div className="inline-flex items-center px-4 py-2 mb-6 font-bold rounded-full text-teal-700 bg-teal-50 border border-teal-100 shadow-sm">
                <FiBriefcase className="mr-2" />
                Career Opportunities
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
                Join Our <span className="text-teal-600">Network</span>
              </h1>
              <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                Explore current job openings across our partner network. We help you find the right fit for your skills and career aspirations.
              </p>
           </motion.div>
        </header>

        {jobs.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 bg-white/50 rounded-[3rem] border border-teal-50 border-dashed"
          >
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-xl shadow-teal-900/5">
               <FiBriefcase className="text-3xl text-teal-300" />
            </div>
            <p className="text-xl text-slate-400 font-bold">No active job openings at the moment.</p>
            <p className="text-slate-400 text-sm mt-2">Check back later or submit your CV for future opportunities.</p>
          </motion.div>
        ) : (
          <div className="grid gap-8">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-teal-900/[0.03] border transition-all duration-300 group hover:shadow-teal-900/10
                ${job.status === 'expired' ? 'border-amber-100' : 
                  job.status === 'closed' ? 'border-slate-100' : 'border-teal-50'}`}
              >
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 pb-8 border-b border-slate-50">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusBadge(job.status)}
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{job.location}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight mb-2">{job.title}</h3>
                      <p className="text-teal-600 font-bold text-lg">{job.company}</p>
                      
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6 text-sm">
                        <div className="flex items-center text-slate-500 font-bold">
                          <FiMapPin className="mr-2 text-teal-500" />
                          <span>{job.location}</span>
                        </div>
                        {job.formattedSalary && (
                          <div className="flex items-center text-slate-500 font-bold">
                            <FiDollarSign className="mr-2 text-teal-500" />
                            <span>{job.formattedSalary}{job.salaryType === 'monthly' ? "/month" : " LPA"}</span>
                          </div>
                        )}
                        {job.duration && (
                          <div className="flex items-center text-slate-500 font-bold">
                            <FiClock className="mr-2 text-teal-500" />
                            <span>{job.duration}</span>
                          </div>
                        )}
                        <div className="flex items-center text-slate-500 font-bold">
                          <FiCalendar className="mr-2 text-teal-500" />
                          <span>
                            {job.lastDate ? `Apply by: ${job.lastDate.toLocaleDateString("en-GB")}` : "Ongoing"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 shrink-0">
                      {job.status === 'active' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate(`/apply`,{ state: { jobId: job.id, jobTitle: job.title } })}
                          className="px-8 py-4 bg-teal-600 text-white font-bold rounded-2xl shadow-xl shadow-teal-900/10 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                          Apply Now
                          <FiArrowRight />
                        </motion.button>
                      )}
                      {currentUser && currentUser.email === ADMIN_EMAIL && (
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: '#ef4444' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(job.id)}
                            className="p-4 bg-red-50 text-red-500 border border-red-100 rounded-2xl transition-all"
                            title="Delete Job"
                          >
                            <FiTrash2 />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setEditingDateJobId(job.id)}
                            className="p-4 bg-sky-50 text-sky-600 border border-sky-100 rounded-2xl transition-all"
                            title="Extend Date"
                          >
                            <FiEdit3 />
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Extend Date Picker */}
                  {editingDateJobId === job.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="mb-8 p-6 bg-sky-50 rounded-2xl border border-sky-100 flex flex-wrap gap-4 items-center"
                    >
                      <span className="text-sm font-bold text-sky-800">Set New Deadline:</span>
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        className="px-4 py-2 bg-white rounded-xl border border-sky-200 outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                      />
                      <div className="flex gap-2 ml-auto">
                         <button
                           onClick={() => handleDateUpdate(job.id)}
                           className="px-4 py-2 bg-sky-600 text-white rounded-xl font-bold text-xs"
                         >
                           Save Changes
                         </button>
                         <button
                           onClick={() => {
                             setEditingDateJobId(null);
                             setNewDate("");
                           }}
                           className="px-4 py-2 bg-white text-slate-500 rounded-xl font-bold text-xs border border-slate-200"
                         >
                           Cancel
                         </button>
                      </div>
                    </motion.div>
                  )}

                  <div className="relative">
                    <h4 className="text-xs font-black text-slate-300 uppercase tracking-[0.2em] mb-4">Job Description</h4>
                    <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line font-medium">{job.description}</p>
                  </div>

                  {job.applyLink && job.status === 'active' && (
                    <div className="mt-8 pt-8 border-t border-slate-50">
                      <a 
                        href={job.applyLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-teal-600 font-bold text-xs flex items-center gap-2 hover:underline tracking-tight"
                      >
                        EXTERNAL APPLICATION PORTAL
                        <FiArrowRight size={10} className="-rotate-45" />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            
            {/* Generic Apply Section - Now in a card */}
            <div className="mt-12 text-center p-12 bg-white/50 rounded-[3rem] border border-teal-50">
              <p className="text-slate-500 mb-6 text-lg font-bold">
                Don’t see a suitable role right now?
              </p>
              <Link 
                to="/genericapply" 
                className="inline-block px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-900/10 transition-all hover:bg-slate-800"
              >
                Submit Your Resume for Future Roles
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobBoard;
