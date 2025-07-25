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
    minSalary: '',
    maxSalary: '',
    salaryType: 'LPA',
    showAsRange: false,
    openings: '',
    duration: '',
    description: '',
    applyLink: '',
    lastDate: '',
    status: 'active'
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
    
    // Validate salary range
    if (form.showAsRange && form.minSalary && form.maxSalary && form.minSalary > form.maxSalary) {
      alert("Minimum salary cannot be greater than maximum salary");
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
              { 
                field: 'openings', 
                label: 'Number of Openings', 
                placeholder: 'e.g. 5',
                type: 'number',
                min: 1
              },
              { 
                field: 'duration', 
                label: 'Job Duration', 
                placeholder: 'e.g. Full-time, 6 months contract, Permanent',
                info: 'Specify if temporary/contract/permanent'
              },
              { field: 'lastDate', label: 'Last Date to Apply', type: 'date' },
              { 
                field: 'description', 
                label: 'Job Description', 
                placeholder: 'Detailed job description...', 
                textarea: true,
                required: false
              },
              { field: 'applyLink', label: 'Application Link (optional)', placeholder: 'https://...' }
            ].map(({ field, label, placeholder, type = 'text', textarea, info, required = true, min }) => (
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
                    required={required}
                  />
                ) : (
                  <input
                    type={type}
                    name={field}
                    placeholder={placeholder}
                    value={form[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    
                    
                    min={type === 'date' ? new Date().toISOString().split('T')[0] : min}
                  />
                )}
              </div>
            ))}

            {/* Salary Range Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-400">Salary</label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showAsRange"
                    name="showAsRange"
                    checked={form.showAsRange}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-red-500 focus:ring-red-500"
                  />
                  <label htmlFor="showAsRange" className="ml-2 text-sm text-gray-400">
                    Show as range
                  </label>
                </div>
              </div>

              {form.showAsRange ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Minimum Salary</label>
                    <input
                      type="number"
                      name="minSalary"
                      placeholder="e.g. 50000"
                      value={form.minSalary}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      min={0}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Maximum Salary</label>
                    <input
                      type="number"
                      name="maxSalary"
                      placeholder="e.g. 80000"
                      value={form.maxSalary}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      min={form.minSalary || 0}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="minSalary"
                    placeholder="e.g. 50000"
                    value={form.minSalary}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                    min={0}
                  />
                </div>
              )}

              <select
                name="salaryType"
                value={form.salaryType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="LPA">LPA</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            
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