import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ADMIN_EMAIL } from '../config/admin';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiMapPin, FiClock, FiDollarSign, FiPlusCircle, FiCheckCircle, FiLink } from 'react-icons/fi';

const PostJobForm = () => {
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    minSalary: '',
    maxSalary: '',
    salaryType: 'LPA',
    showAsRange: false,
    openings: '',
    duration: '',
    description: '',
    applyLink: '',
    lastDate: '',
    status: 'active',
    experienceLevel: 'fresher'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user || user.email !== ADMIN_EMAIL) {
      alert("Access Denied: Admins Only");
      navigate('/');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              (name === 'minSalary' || name === 'maxSalary' || name === 'openings') ? 
              Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (form.showAsRange && form.minSalary && form.maxSalary && form.minSalary > form.maxSalary) {
      alert("Minimum salary cannot be greater than maximum salary");
      setIsSubmitting(false);
      return;
    }

    try {
      await addDoc(collection(db, 'jobPosts'), {
        ...form,
        minSalary: Number(form.minSalary),
        maxSalary: Number(form.maxSalary),
        openings: Number(form.openings),
        lastDate: new Date(form.lastDate),
        postedAt: serverTimestamp(),
        status: 'active'
      });
      alert("Job posted successfully!");
      setForm({
        title: '',
        company: '',
        location: '',
        minSalary: '',
        maxSalary: '',
        salaryType: 'LPA',
        showAsRange: false,
        openings: '',
        duration: '',
        description: '',
        applyLink: '',
        lastDate: '',
        status: 'active',
        experienceLevel: 'fresher'
      });
    } catch (error) {
      alert("Error posting job: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen niyati-bg-pattern bg-[#e8f4f8] pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto relative z-10">
        <header className="text-center mb-12">
           <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="inline-flex items-center px-4 py-2 mb-6 font-bold rounded-full text-teal-700 bg-white border border-teal-100 shadow-sm">
                <FiPlusCircle className="mr-2" />
                Recruitment Dashboard
              </div>
              <h1 className="text-4xl font-black text-slate-800 mb-4">Post a <span className="text-teal-600">New Opening</span></h1>
           </motion.div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-teal-900/10 border border-teal-50"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Job Title</label>
                  <div className="relative">
                     <FiBriefcase className="absolute top-4 left-4 text-teal-600" />
                     <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Senior Accountant" className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-bold text-slate-900" required />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Company Name</label>
                  <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="e.g. Niyati Group" className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-bold text-slate-900" required />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
                  <div className="relative">
                     <FiMapPin className="absolute top-4 left-4 text-teal-600" />
                     <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="e.g. Bareilly / Remote" className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-bold text-slate-900" required />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Number of Openings</label>
                  <input type="number" name="openings" value={form.openings} onChange={handleChange} min="1" placeholder="e.g. 5" className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-bold text-slate-900" required />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Employment Type / Duration</label>
                  <div className="relative">
                     <FiClock className="absolute top-4 left-4 text-teal-600" />
                     <input type="text" name="duration" value={form.duration} onChange={handleChange} placeholder="e.g. Permanent / 6 Months" className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-bold text-slate-900" required />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Last Date to Apply</label>
                  <input type="date" name="lastDate" value={form.lastDate} onChange={handleChange} min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-bold text-slate-900" required />
               </div>
            </div>

            <div className="space-y-2">
               <div className="flex justify-between items-center px-1">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Compensation / Salary</label>
                  <label className="flex items-center gap-2 cursor-pointer">
                     <input type="checkbox" name="showAsRange" checked={form.showAsRange} onChange={handleChange} className="w-4 h-4 rounded-md border-slate-300 text-teal-600 focus:ring-teal-500" />
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Show Range</span>
                  </label>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="relative">
                     <FiDollarSign className="absolute top-4 left-4 text-teal-600" />
                     <input type="number" name="minSalary" value={form.minSalary} onChange={handleChange} placeholder="e.g. 3.5" className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-bold text-slate-900" required />
                     <span className="absolute right-4 top-4 text-[10px] font-black text-slate-300 uppercase">Min Cost</span>
                  </div>
                  {form.showAsRange && (
                     <div className="relative">
                        <FiDollarSign className="absolute top-4 left-4 text-teal-600" />
                        <input type="number" name="maxSalary" value={form.maxSalary} onChange={handleChange} placeholder="e.g. 5.5" className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-bold text-slate-900" required />
                        <span className="absolute right-4 top-4 text-[10px] font-black text-slate-300 uppercase">Max Cost</span>
                     </div>
                  )}
                  <select name="salaryType" value={form.salaryType} onChange={handleChange} className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-bold text-slate-900 appearance-none cursor-pointer">
                     <option value="LPA">LPA (Yearly)</option>
                     <option value="monthly">Monthly</option>
                  </select>
               </div>
            </div>

            <div className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Experience Level</label>
                     <select name="experienceLevel" value={form.experienceLevel} onChange={handleChange} className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-bold text-slate-900 appearance-none cursor-pointer" required>
                        <option value="fresher">Fresher Only</option>
                        <option value="experienced">Experienced Only</option>
                        <option value="both">Both (Fresher & Experienced)</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Application Link (Optional)</label>
                     <div className="relative">
                        <FiLink className="absolute top-4 left-4 text-teal-600" />
                        <input type="url" name="applyLink" value={form.applyLink} onChange={handleChange} placeholder="https://..." className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-bold text-slate-900" />
                     </div>
                  </div>
               </div>
            </div>

            <div className="space-y-2">
               <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Job Description & Responsibilities</label>
               <textarea name="description" value={form.description} onChange={handleChange} placeholder="Detailed job requirement profile..." className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-medium text-slate-900" rows="6" required />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-5 bg-slate-900 hover:bg-teal-600 text-white font-black rounded-[2rem] transition-all shadow-xl shadow-teal-900/10 flex items-center justify-center gap-3 text-lg"
            >
              {isSubmitting ? (
                 <div className="animate-spin w-6 h-6 border-4 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  Publish Job Opportunity
                  <FiCheckCircle />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PostJobForm;