import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const ADMIN_EMAIL = "niyatigroup1@gmail.com";

  useEffect(() => {
    const fetchJobs = async () => {
      const q = query(collection(db, 'jobPosts'), orderBy('postedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const jobData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const lastDate = data.lastDate?.toDate();
        const now = new Date();
        return { 
          id: doc.id, 
          ...data,
          lastDate,
          formattedSalary: data.showAsRange && data.minSalary !== undefined && data.maxSalary !== undefined
            ? `₹${new Intl.NumberFormat('en-IN').format(data.minSalary)} - ₹${new Intl.NumberFormat('en-IN').format(data.maxSalary)}`
            : (data.minSalary !== undefined
                ? `₹${new Intl.NumberFormat('en-IN').format(data.minSalary)}`
                : null),
          salaryType: data.salaryType || "monthly",
          status: data.status === 'closed' ? 'closed' : 
                  (lastDate && lastDate < now) ? 'expired' : 'active'
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

  const getStatusBadge = (status) => {
    const statusStyles = {
      active: 'bg-green-600/20 text-green-400 border-green-400/30',
      expired: 'bg-yellow-600/20 text-yellow-400 border-yellow-400/30',
      closed: 'bg-red-600/20 text-red-400 border-red-400/30'
    };
    return (
      <span className={`text-xs px-2 py-1 rounded-full border ${statusStyles[status]}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-300 py-12 px-4 sm:px-6">
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold mb-8 text-white text-center"
        >
          Current <span className="text-red-500">Job</span> Opportunities
        </motion.h2>

        {jobs.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-400">No job openings at the moment. Please check back later.</p>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gray-800/50 backdrop-blur-sm border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all
                ${job.status === 'expired' ? 'border-yellow-600/50 opacity-90' : 
                  job.status === 'closed' ? 'border-red-600/50 opacity-90' : 'border-gray-700'}`}
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl sm:text-2xl font-bold text-white">{job.title}</h3>
                        {getStatusBadge(job.status)}
                      </div>
                      <p className="text-red-400 font-medium mt-1">{job.company}</p>
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                        {/* Location */}
                        <div className="flex items-center text-gray-400">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{job.location}</span>
                        </div>
                        {/* Salary */}
                        {job.formattedSalary && (
                          <div className="flex items-center text-gray-400">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{job.formattedSalary}{job.salaryType === 'monthly' ? "/month" : " LPA"}</span>
                          </div>
                        )}
                        {/* Duration */}
                        {job.duration && (
                          <div className="flex items-center text-gray-400">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{job.duration}</span>
                          </div>
                        )}
                        {/* Experience Level */}
                        <div className="flex items-center text-gray-400">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6V4a3 3 0 016 0v2M5 8h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z" />
                          </svg>
                          <span>
                            {job.experienceLevel === "fresher" && "Fresher"}
                            {job.experienceLevel === "experienced" && "Experienced"}
                            {job.experienceLevel === "both" && "Fresher & Experienced"}
                            {!job.experienceLevel && "N/A"}
                          </span>
                        </div>
                        {/* Last date */}
                        {job.lastDate && (
                          <div className="flex items-center text-gray-400">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>
                              Apply by: {job.lastDate.toLocaleDateString("en-GB")}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      {job.status === 'active' && (
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => navigate(`/apply`,{ state: { jobId: job.id, jobTitle: job.title } })}
                          className="cursor-pointer px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all whitespace-nowrap"
                        >
                          Apply Now
                        </motion.button>
                      )}
                      {currentUser && currentUser.email === ADMIN_EMAIL && (
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleDelete(job.id)}
                          className="cursor-pointer px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all"
                        >
                          Delete
                        </motion.button>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-2">Job Description</h4>
                    <p className="text-gray-400 whitespace-pre-line">{job.description}</p>
                  </div>
                  
                  {job.applyLink && job.status === 'active' && (
                    <div className="mt-4">
                      <a 
                        href={job.applyLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-red-400 hover:text-red-300 inline-flex items-center"
                      >
                        External Application Link
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            <div className="mt-12 text-center">
              <p className="text-gray-400 mb-4 text-lg">
                Don’t see a suitable job for you?
              </p>
              <Link 
                to="/genericapply" 
                className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
              >
                Submit Your Resume
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobBoard;
