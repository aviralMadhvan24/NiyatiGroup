import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiArrowRight, FiInfo } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen niyati-bg-pattern bg-[#e8f4f8] flex items-center justify-center px-4 pt-16">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-200/10 rounded-full blur-[120px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
           <div className="flex justify-center mb-6">
              <div className="bg-white p-4 rounded-3xl shadow-xl shadow-teal-900/5 border border-teal-50">
                 <img src="/logo3.png" alt="Logo" className="w-16 h-16" />
              </div>
           </div>
           <h1 className="text-3xl font-bold text-slate-800">Welcome Back</h1>
           <p className="text-slate-500 font-medium mt-2">Sign in to your NiyatiGroup account</p>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-teal-900/10 border border-teal-50 relative overflow-hidden">
           {error && (
             <motion.div 
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-bold border border-red-100"
             >
               <FiInfo className="shrink-0" />
               {error}
             </motion.div>
           )}

           <form onSubmit={handleSubmit} className="space-y-6">
             <div>
                <label className="block text-slate-700 font-bold mb-2 text-sm ml-1">Email Address</label>
                <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-teal-600">
                      <FiMail />
                   </div>
                   <input
                     type="email"
                     required
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-slate-800 placeholder-slate-400 font-medium"
                     placeholder="name@company.com"
                   />
                </div>
             </div>

             <div>
                <label className="block text-slate-700 font-bold mb-2 text-sm ml-1 flex justify-between">
                   <span>Password</span>
                   <Link to="#" className="text-teal-600 text-xs hover:underline">Forgot password?</Link>
                </label>
                <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-teal-600">
                      <FiLock />
                   </div>
                   <input
                     type="password"
                     required
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-slate-800 placeholder-slate-400 font-medium"
                     placeholder="••••••••"
                   />
                </div>
             </div>

             <motion.button
               type="submit"
               disabled={loading}
               whileHover={{ scale: 1.02, backgroundColor: '#0d9488' }}
               whileTap={{ scale: 0.98 }}
               className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold shadow-xl shadow-teal-900/10 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
             >
               {loading ? 'Signing in...' : 'Sign In'}
               <FiArrowRight />
             </motion.button>
           </form>

           <div className="mt-8 pt-8 border-t border-slate-50 text-center">
              <p className="text-slate-500 text-sm font-medium">
                Administrative access only. By signing in, you agree to our 
                <Link to="/terms" className="text-teal-600 ml-1">Terms</Link>
              </p>
           </div>
        </div>

        <div className="mt-8 text-center">
           <Link to="/" className="text-slate-400 hover:text-teal-600 text-sm font-medium transition-colors">
              ← Back to homepage
           </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;