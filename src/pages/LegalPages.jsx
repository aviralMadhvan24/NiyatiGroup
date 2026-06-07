import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiLock, FiShield, FiUser, FiBook, FiBriefcase, FiDollarSign } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const LegalPages = ({ page }) => {
  const navigate = useNavigate();
  const isTerms = page === 'terms';
  
  return (
    <div className="min-h-screen niyati-bg-pattern bg-[#e8f4f8] text-slate-600">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md py-4 px-4 sm:px-6 shadow-xl shadow-teal-900/5">
        <div className="container mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-slate-500 hover:text-teal-600 font-bold transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="bg-teal-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-teal-600/20">
              <img src="/logo3.png" alt="Logo" className="w-8 h-8" />
            </div>
            <span className="text-slate-800 font-black text-lg">
              Niyati<span className="text-teal-600">Group</span>
            </span>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div 
          className="bg-white rounded-[3rem] shadow-2xl shadow-teal-900/10 border border-teal-50 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Card - Updated to match Niyati Card */}
          <div className="niyati-card p-10 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5 -mr-16 -mt-16 bg-white w-64 h-64 rounded-full"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center space-x-6 text-center md:text-left">
                <div className="bg-white/10 border border-white/20 w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-sm shrink-0">
                  {isTerms ? <FiBook className="w-8 h-8 text-teal-300" /> : <FiLock className="w-8 h-8 text-teal-300" />}
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-black text-white">
                    {isTerms ? "Terms of Service" : "Privacy Policy"}
                  </h1>
                  <p className="text-teal-100/60 font-bold uppercase tracking-widest text-xs mt-2">
                    Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-2xl px-6 py-4 border border-white/10 backdrop-blur-sm text-center">
                <div className="flex items-center justify-center mb-1">
                  <FiUser className="w-4 h-4 text-teal-300 mr-2" />
                  <span className="font-black text-white text-sm">Nitish Saxena</span>
                </div>
                <p className="text-[10px] text-teal-100/50 font-bold uppercase tracking-widest">Founder & CEO</p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Introduction */}
            <section className="mb-16">
              <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center">
                <FiBriefcase className="mr-3 text-teal-600" />
                About Niyati Group
              </h2>
              <p className="mb-8 text-slate-500 leading-relaxed font-medium">
                Niyati Group, founded by Nitish Saxena in 2019, is a premier service provider specializing in 
                financial and employment solutions. We are dedicated to helping individuals and businesses 
                navigate complex financial landscapes and employment challenges.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {[
                    { title: "Tax Services", desc: "Expert tax preparation, planning, and consulting.", icon: <FiDollarSign /> },
                    { title: "Loan Assistance", desc: "Comprehensive loan solutions including business and mortgage.", icon: <FiDollarSign /> },
                    { title: "Recruitment", desc: "Connecting talent with leading companies.", icon: <FiBriefcase /> }
                ].map((s, i) => (
                    <div key={i} className="bg-teal-50/50 border border-teal-50 rounded-[2rem] p-6 transition-all hover:bg-teal-50">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 text-teal-600 shadow-sm">
                            {s.icon}
                        </div>
                        <h3 className="font-bold text-slate-800 mb-2">{s.title}</h3>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{s.desc}</p>
                    </div>
                ))}
              </div>
            </section>
            
            {/* Main Content */}
            <section>
              <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center">
                <FiShield className="mr-4 text-teal-600" />
                {isTerms ? "Terms Governing Our Services" : "Your Privacy Matters"}
              </h2>
              
              <div className="space-y-10">
                {isTerms ? (
                  <>
                    {[
                      { h: "1. Acceptance of Terms", p: "By accessing or using any services provided by Niyati Group, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services." },
                      { h: "2. Service Description", p: "Niyati Group provides financial consultation, tax services, loan assistance, and recruitment services. All services are subject to availability and may be modified or discontinued without notice." },
                      { h: "3. User Responsibilities", p: "Users must provide accurate and complete information when using our services. You are responsible for maintaining the confidentiality of your account information." },
                      { h: "4. Financial Services", p: "Our tax and loan services are provided for informational purposes only and do not constitute financial advice. Consult with a professional before making decisions." },
                      { h: "5. Recruitment Services", p: "Job placements are subject to employer requirements and candidate qualifications. Niyati Group does not guarantee employment." }
                    ].map((item, i) => (
                      <div key={i}>
                        <h3 className="font-black text-slate-800 mb-3 text-lg">{item.h}</h3>
                        <p className="text-slate-500 font-medium leading-relaxed">{item.p}</p>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {[
                      { h: "1. Information We Collect", p: "We collect personal information when you register, use our services, or communicate with us. This may include contact info, financial details, and employment history." },
                      { h: "2. How We Use Information", p: "We use your information to provide and improve our services, process transactions, and comply with legal obligations. We do not sell your personal information." },
                      { h: "3. Data Protection", p: "We implement industry-standard security measures to protect your information. All financial transactions are encrypted using SSL technology." },
                      { h: "4. Third-Party Services", p: "We may use trusted third-party services to process payments and verify information. These partners are required to maintain strict confidentiality." }
                    ].map((item, i) => (
                      <div key={i}>
                        <h3 className="font-black text-slate-800 mb-3 text-lg">{item.h}</h3>
                        <p className="text-slate-500 font-medium leading-relaxed">{item.p}</p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </section>
            
            {/* Contact Information */}
            <section className="mt-20 pt-12 border-t border-slate-100">
              <h2 className="text-2xl font-black text-slate-800 mb-8">Official Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
                  <h3 className="font-black text-slate-800 mb-3">Headquarters</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-4">
                    Rajni Niwas, 616, Ganesh Nagar,<br />
                    Bareilly, Uttar Pradesh, 243001<br />
                    India
                  </p>
                </div>
                
                <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 text-center flex flex-col justify-center items-center">
                   <p className="font-black text-teal-600 text-xl mb-1">+91 9997070599</p>
                   <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">General Information</p>
                   <div className="w-10 h-1 bg-teal-100 my-4 rounded-full"></div>
                   <p className="text-slate-500 font-bold text-sm">niyatigroup1@gmail.com</p>
                </div>
              </div>
            </section>
            
            {/* Acceptance */}
            <div className="mt-12 p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-emerald-100 mr-4">
                    <FiCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <p className="text-emerald-800 text-sm font-bold leading-relaxed">
                  By using our services, you acknowledge that you have read, understood, and agree to be bound by 
                  {isTerms ? " our Terms of Service" : " our Privacy Policy"}.
                </p>
              </div>
            </div>
          </div>
          
          {/* Bottom Branding */}
          <div className="bg-slate-50 p-10 border-t border-slate-100 text-center">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto italic">
              <div className="flex items-center">
                <div className="bg-teal-600 w-8 h-8 rounded-lg flex items-center justify-center shadow-lg">
                  <img src="/logo3.png" alt="Logo" className="w-6 h-6" />
                </div>
                <span className="text-slate-800 font-black text-sm ml-3">
                  Niyati<span className="text-teal-600">Group</span>
                </span>
              </div>
              
              <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                <p>© {new Date().getFullYear()} Niyati Group. Global Official Document.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LegalPages;