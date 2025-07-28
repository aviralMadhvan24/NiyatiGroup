import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
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
      
      // Check if there are any loans added in the last 7 days
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
        
        // Check if there are any jobs posted in the last 7 days
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
    <div className="relative bg-gradient-to-br from-red-700 via-red-800 to-black text-gray-300 min-h-screen overflow-hidden">

      {/* Background Grid Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900/50 to-gray-950">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
      </div>
{!loading && hasNewJobs && (
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-20 bg-gradient-to-r from-red-600 to-red-800 text-white py-3 px-4 shadow-lg"
        >
          <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-3 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="font-semibold">New job opportunities available!</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/jobs')}
              className="cursor-pointer px-4 py-2 bg-white text-red-700 font-medium rounded-md hover:bg-gray-100 transition-all flex items-center"
            >
              View Jobs
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      )}

      {!loanLoading && hasNewLoans && (
  <motion.div 
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="relative z-20 bg-gradient-to-r from-green-600 to-green-800 text-white py-3 px-4 shadow-lg"
  >
    <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center">
        <svg className="w-6 h-6 mr-3 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <span className="font-semibold">New loan offers available with special rates!</span>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/loanoffers')}
        className="cursor-pointer px-4 py-2 bg-white text-green-700 font-medium rounded-md hover:bg-gray-100 transition-all flex items-center"
      >
        View Loans
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </motion.button>
    </div>
  </motion.div>
)}
      {/* Hero Section */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6">
        <section className="max-w-screen-xl mx-auto py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row items-center lg:justify-between gap-16"
          >
            {/* LEFT: Text + Buttons */}
            <div className="w-full lg:w-3/5 space-y-6 text-center lg:text-left">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-100 leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Welcome to <span className="text-red-500">Niyati</span> Group
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Comprehensive business solutions through our specialized divisions in tax consultancy and recruitment services.
              </motion.p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
                <Link to="/services">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer px-6 py-3 bg-red-600 hover:bg-red-800 text-white font-medium rounded-lg transition-colors"
                  >
                    Explore Our Services
                  </motion.button>
                </Link>
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer px-6 py-3 bg-gray-900 hover:bg-gray-800 text-gray-100 border border-gray-700 rounded-lg font-medium transition-colors"
                  >
                    Contact Us Directly
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* RIGHT: Image */}
            <motion.div
              className="w-full max-w-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <img src="/logo3.png" alt="Niyati Group Logo" className="w-full h-auto" />
            </motion.div>
          </motion.div>
        </section>
      </div>

      {/* Office Locations Section */}
      <section className="relative z-10 bg-red-900 text-gray-200 py-20 px-4 sm:px-6">
        <div className="max-w-screen-xl mx-auto space-y-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-center text-white mb-12">
            Our Office Locations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Office 1 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Head Office - Bareilly</h3>
              <p className="text-gray-400">
                Rajni Niwas, 616, Ganesh Nagar, Bareilly, Uttar Pradesh 243001
              </p>
              <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
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
            </div>

            {/* Office 2 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Branch Office - Khatima, Uttarakhand </h3>
              <p className="text-gray-400">
                Degree College Road, Khatima, Naugawa Thago, Uttarakhand 262308
              </p>
              <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
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
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
