
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ADMIN_EMAIL } from '../config/admin';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PostJobForm = () => {
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    duration: '',
    description: '',
    applyLink: '',
    lastDate: '',
    status: 'active' // default status
  });

  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user || user.email !== ADMIN_EMAIL) {
      alert("Access Denied: Admins Only");
      navigate('/');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'salary' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'jobPosts'), {
        ...form,
        salary: Number(form.salary),
        lastDate: new Date(form.lastDate),
        postedAt: serverTimestamp(),
        status: 'active'
      });
      alert("Job posted successfully!");
      setForm({
        title: '',
        company: '',
        location: '',
        salary: '',
        duration: '',
        description: '',
        applyLink: '',
        lastDate: '',
        status: 'active'
      });
    } catch (error) {
      alert("Error posting job: " + error.message);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-300 py-12 px-4 sm:px-6">
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg p-6 sm:p-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
            Post a New <span className="text-red-500">Job</span> Opportunity
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { field: 'title', label: 'Job Title', placeholder: 'e.g. Senior Software Engineer' },
              { field: 'company', label: 'Company Name', placeholder: 'e.g. Niyati Group' },
              { field: 'location', label: 'Location', placeholder: 'e.g. Bareilly, Uttar Pradesh' },
              { field: 'salary', label: 'Salary (₹)', placeholder: 'e.g. 50000', type: 'number' },
              { 
                field: 'duration', 
                label: 'Job Duration', 
                placeholder: 'e.g. Full-time, 6 months contract, Permanent',
                info: 'Specify if temporary/contract/permanent'
              },
              { field: 'lastDate', label: 'Last Date to Apply', type: 'date' },
              { field: 'description', label: 'Job Description', placeholder: 'Detailed job description...', textarea: true },
              { field: 'applyLink', label: 'Application Link (optional)', placeholder: 'https://...' }
            ].map(({ field, label, placeholder, type = 'text', textarea, info }) => (
              <div key={field} className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-400">{label}</label>
                  {info && <span className="text-xs text-gray-500">{info}</span>}
                </div>
                {textarea ? (
                  <textarea
                    name={field}
                    placeholder={placeholder}
                    value={form[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    rows={5}
                    required={field !== 'applyLink'}
                  />
                ) : (
                  <input
                    type={type}
                    name={field}
                    placeholder={placeholder}
                    value={form[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required={field !== 'applyLink'}
                    min={type === 'number' ? 0 : undefined}
                    minDate={type === 'date' ? new Date().toISOString().split('T')[0] : undefined}
                  />
                )}
              </div>
            ))}
            
            <div className="flex justify-end pt-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="cursor-pointer px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all"
              >
                Post Job
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PostJobForm;