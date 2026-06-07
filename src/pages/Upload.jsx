import React from 'react';
import FileUpload from '../components/ui/FileUpload';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiShield, FiLock, FiTerminal } from 'react-icons/fi';

const Upload = () => {
  return (
    <div className="min-h-screen niyati-bg-pattern bg-[#e8f4f8]">
      {/* Page Header */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
               <div className="inline-flex items-center px-4 py-2 mb-6 font-bold rounded-full text-teal-700 bg-white border border-teal-100 shadow-sm">
                 <FiUploadCloud className="mr-2" />
                 Secure Transfer Gateway
               </div>
               <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">
                 Document <span className="text-teal-600">Vault</span>
               </h1>
               <p className="text-lg text-slate-500 font-medium leading-relaxed">
                 Upload your documents securely for tax filing and compliance services. Your data is encrypted and handled with extreme confidentiality.
               </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Upload Section */}
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-teal-900/5 border border-teal-50"
            >
              <FileUpload />
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
               {[
                 { icon: <FiShield />, title: "SSL Security", text: "256-bit SSL encryption during every transfer." },
                 { icon: <FiLock />, title: "Secure Storage", text: "Files stored on dedicated encrypted servers." },
                 { icon: <FiTerminal />, title: "Auto Purge", text: "Automatic deletion after 90 days of completion." }
               ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-teal-50"
                  >
                     <div className="text-teal-600 text-xl mb-3">{item.icon}</div>
                     <h4 className="font-black text-slate-800 text-sm mb-1">{item.title}</h4>
                     <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.text}</p>
                  </motion.div>
               ))}
            </div>

            <div className="mt-16 text-center">
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                 Niyati Group Compliance Infrastructure
               </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Upload;