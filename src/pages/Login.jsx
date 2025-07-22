import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate(location.state?.from || "/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div 
      className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-black min-h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-red-500"
            style={{
              width: Math.random() * 5 + 1 + 'px',
              height: Math.random() * 5 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div 
          className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">To access all features including Tax Calculator, EMI Calculator, and more</p>
          </div>

          <div className="mb-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
            <p className="text-center text-red-400 font-medium">
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Please login to continue
            </p>
          </div>

          <motion.button
            onClick={handleLogin}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg font-medium text-white transition flex items-center justify-center gap-3 shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </motion.button>

          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-400">
              By continuing, you agree to our <NavLink to="/terms" className="text-red-400 hover:underline">Terms of Service</NavLink> and <NavLink to="/privacy" className="text-red-400 hover:underline">Privacy Policy</NavLink>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              © {new Date().getFullYear()} Niyati Group. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;