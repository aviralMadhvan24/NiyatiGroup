import React from 'react';
import FileUpload from '../components/ui/FileUpload';
import { motion } from 'framer-motion';

const Upload = () => {
  return (
    <div>
      {/* Page Header */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Secure <span className="text-primary">Document</span> Upload
            </motion.h1>
            <motion.p 
              className="mt-6 text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Upload your documents securely for tax filing and compliance services
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Upload Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FileUpload />
            </motion.div>
            
            <motion.div 
              className="mt-16 bg-gray-50 rounded-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Document Security</h3>
              <p className="text-gray-600 mb-4">
                We take the security of your documents seriously. All files uploaded through this portal are protected with:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>256-bit SSL encryption during transfer</li>
                <li>Secure storage on encrypted servers</li>
                <li>Access restricted to authorized personnel only</li>
                <li>Automatic deletion after 90 days of service completion</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Upload;