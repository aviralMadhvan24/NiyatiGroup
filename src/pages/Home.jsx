import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { FiBriefcase, FiPhone, FiChevronRight, FiFileText, FiDollarSign, FiUsers } from 'react-icons/fi';

const Home = () => {
  const navigate = useNavigate();
  const [hasNewJobs, setHasNewJobs] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasNewLoans, setHasNewLoans] = useState(false);
  const [loanLoading, setLoanLoading] = useState(true);

  useEffect(() => {
    const fetchLoanOffers = async () => {
      try {
        const q = query(collection(db, 'loanOffers'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const loanData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        const recentLoans = loanData.filter(loan => {
          const createdDate = loan.createdAt?.toDate();
          return createdDate > oneWeekAgo && loan.isActive;
        });
        
        setHasNewLoans(recentLoans.length > 0);
      } catch (error) {
        console.error("Error fetching loans:", error);
      } finally {
        setLoanLoading(false);
      }
    };
    
    fetchLoanOffers();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const q = query(collection(db, 'jobPosts'), orderBy('postedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const jobData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        const recentJobs = jobData.filter(job => {
          const postedDate = job.postedAt?.toDate();
          return postedDate > oneWeekAgo;
        });
        
        setHasNewJobs(recentJobs.length > 0);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, []);

  return (
    <div className="relative min-h-screen niyati-bg-pattern bg-[#e8f4f8] pt-16">
      
      {/* Notifications Batch */}
      <div className="absolute top-20 left-0 right-0 z-20 space-y-2 pointer-events-none">
        {!loading && hasNewJobs && (
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-center"
          >
            <div className="pointer-events-auto bg-white/90 backdrop-blur-md border border-teal-100 py-2 px-4 rounded-full shadow-lg flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-ping"></span>
              <span className="text-xs font-semibold text-slate-700">New job opportunities!</span>
              <button onClick={() => navigate('/jobs')} className="text-teal-600 text-xs font-bold hover:underline">View</button>
            </div>
          </motion.div>
        )}
        {!loanLoading && hasNewLoans && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-center"
          >
            <div className="pointer-events-auto bg-white/90 backdrop-blur-md border border-teal-100 py-2 px-4 rounded-full shadow-lg flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-xs font-semibold text-slate-700">New loan offers available!</span>
              <button onClick={() => navigate('/loanoffers')} className="text-emerald-600 text-xs font-bold hover:underline">Check</button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full niyati-card p-10 md:p-16 relative overflow-hidden text-center"
        >
          {/* Subtle logo in background */}
          <div className="absolute -right-20 -bottom-20 opacity-10 rotate-12">
            <img src="/logo3.png" alt="" className="w-80 h-80" />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative z-10"
          >
             <div className="flex justify-center mb-6">
                <div className="bg-white p-3 rounded-full shadow-inner border border-teal-200">
                  <img src="/logo3.png" alt="Niyati Logo" className="w-12 h-12" />
                </div>
             </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            
          
              <span className="text-white">Welcome to</span> <br />
              <span className="text-teal-300">Niyati </span> 
              <span className="text-white">Group</span> <br />
            </h1>
            
            <div className="w-20 h-1 bg-teal-300/30 mx-auto mb-8 rounded-full"></div>
            
            <p className="text-lg md:text-xl text-teal-50/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Comprehensive business solutions through our specialized divisions in tax consultancy, loan assistance, and recruitment services.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Link to="/services">
                <motion.button
                  whileHover={{ scale: 1.03, backgroundColor: '#10b981' }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-teal-500 text-white font-bold rounded-xl shadow-xl shadow-teal-900/20 transition-all group"
                >
                  <FiBriefcase className="text-xl" />
                 <span className="text-black">Explore Our Services</span>
                  <FiChevronRight className="transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.03, backgroundColor: '#1e293b' }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-xl shadow-xl transition-all"
                >
                  <FiPhone className="text-xl" />
                  Contact Us Directly
                  <FiChevronRight />
                </motion.button>
              </Link>
            </div>

            {/* Service Divisions Icons */}
            <div className="grid grid-cols-3 gap-4 border-t border-teal-400/20 pt-10 mt-10">
              <div className="flex flex-col items-center">
                 <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-3 border border-white/20 backdrop-blur-sm">
                    <FiFileText className="text-2xl text-teal-300" />
                 </div>
                 <span className="text-xs md:text-sm font-semibold text-teal-100">Tax<br/>Consultancy</span>
              </div>
              <div className="flex flex-col items-center border-x border-teal-400/20">
                 <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-3 border border-white/20 backdrop-blur-sm">
                    <FiDollarSign className="text-2xl text-teal-300" />
                 </div>
                 <span className="text-xs md:text-sm font-semibold text-teal-100">Loan<br/>Assistance</span>
              </div>
              <div className="flex flex-col items-center">
                 <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-3 border border-white/20 backdrop-blur-sm">
                    <FiUsers className="text-2xl text-teal-300" />
                 </div>
                 <span className="text-xs md:text-sm font-semibold text-teal-100">Recruitment<br/>Services</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Office Locations Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm relative z-10 border-t border-teal-100">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Our Office <span className="text-teal-600">Locations</span>
            </h2>
            <div className="w-16 h-1 bg-teal-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Office 1 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-3xl shadow-xl shadow-teal-900/5 border border-teal-50 border-t-4 border-t-teal-600 overflow-hidden"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-2">Head Office - Bareilly</h3>
              <p className="text-slate-500 mb-6 text-sm">
                Rajni Niwas, 616, Ganesh Nagar, Bareilly, Uttar Pradesh 243001
              </p>
              <div className="w-full h-64 rounded-2xl overflow-hidden shadow-inner border border-teal-50">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3511.4097404534127!2d79.39968057600883!3d28.34645939701308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a001ad1ccdb735%3A0xe77d309c2ea8cc23!2sNiyati%20Tax%20%26%20Financial%20Services!5e0!3m2!1sen!2sin!4v1752819512806!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>

            {/* Office 2 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-3xl shadow-xl shadow-teal-900/5 border border-teal-50 border-t-4 border-t-emerald-600 overflow-hidden"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-2">Branch Office - Uttarakhand</h3>
              <p className="text-slate-500 mb-6 text-sm">
                Degree College Road, Khatima, Naugawa Thago, Uttarakhand 262308
              </p>
              <div className="w-full h-64 rounded-2xl overflow-hidden shadow-inner border border-teal-50">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d898683.7242003867!2d78.84490385571326!3d28.374467189673965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a051c9d994cd31%3A0xaeef5c9ab93ffca7!2sNiyati%20Tax%20%26%20Financial%20Services%2C%20Khatima!5e0!3m2!1sen!2sin!4v1752819508759!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;