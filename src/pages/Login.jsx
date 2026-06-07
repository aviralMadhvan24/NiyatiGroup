import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiInfo, FiArrowRight } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await googleLogin();
      navigate(from, { replace: true });
    } catch (err) {
      setError('Connection failed. Please check your internet and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen niyati-bg-pattern bg-[#e8f4f8] flex items-center justify-center px-4 pt-16">
      
      {/* Dynamic Background Blobs */}
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
           <div className="flex justify-center mb-6">
              <motion.div 
                whileHover={{ rotate: 10 }}
                className="bg-white p-5 rounded-[2rem] shadow-2xl shadow-teal-900/10 border border-white"
              >
                 <img src="/logo3.png" alt="Niyati Logo" className="w-20 h-20" />
              </motion.div>
           </div>
           <h1 className="text-4xl font-black text-slate-800 tracking-tight">Admin Access</h1>
           <p className="text-slate-500 font-bold mt-3 uppercase tracking-widest text-xs">Niyati Group Dashboard</p>
        </div>

        <motion.div
          className="bg-white/80 backdrop-blur-xl p-10 md:p-12 rounded-[3rem] shadow-2xl shadow-teal-900/10 border border-white relative overflow-hidden"
        >
           {error && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-xs font-bold border border-red-100"
             >
               <FiInfo className="shrink-0 text-lg" />
               {error}
             </motion.div>
           )}

           <div className="space-y-8">
              <div className="text-center">
                 <p className="text-slate-600 font-medium leading-relaxed mb-8">
                    To maintain security, administrative access is restricted to authorized Google accounts only.
                 </p>
              </div>

              <motion.button
                type="button"
                disabled={loading}
                onClick={handleGoogleLogin}
                whileHover={{ scale: 1.02, backgroundColor: '#ffffff' }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-white border-2 border-slate-100 text-slate-800 rounded-[1.5rem] font-black shadow-xl shadow-teal-900/5 transition-all flex items-center justify-center gap-4 disabled:opacity-70 group"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-3 border-teal-500 border-t-transparent"></div>
                ) : (
                  <>
                    <FcGoogle className="text-2xl" />
                    <span>Continue with Google</span>
                    <FiArrowRight className="text-slate-300 group-hover:text-teal-500 transition-colors" />
                  </>
                )}
              </motion.button>
           </div>

           <div className="mt-12 pt-8 border-t border-slate-50 text-center">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed">
                Secure Authentication <br />
                Managed by Google Firebase
              </p>
           </div>
        </motion.div>

        <div className="mt-10 text-center">
           <Link to="/" className="text-slate-400 hover:text-teal-600 text-xs font-black uppercase tracking-widest transition-colors">
              ← Return to Main Site
           </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;