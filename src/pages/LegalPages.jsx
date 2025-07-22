import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiLock, FiShield, FiUser, FiBook, FiBriefcase, FiDollarSign } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const LegalPages = ({ page }) => {
  const navigate = useNavigate();
  const isTerms = page === 'terms';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-300">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-red-900 via-red-950 to-black py-4 px-4 sm:px-6 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="bg-gray-900/50 border border-gray-800 w-10 h-10 rounded-lg flex items-center justify-center shadow-md">
              <img src="/logo3.png" alt="Logo" className="w-8 h-8" />
            </div>
            <span className="text-white font-bold text-lg">
              Niyati<span className="text-gray-400">Group</span>
            </span>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div 
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-red-900 via-red-950 to-black p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-900/50 border border-gray-800 w-12 h-12 rounded-lg flex items-center justify-center">
                  {isTerms ? <FiBook className="w-6 h-6 text-red-400" /> : <FiLock className="w-6 h-6 text-red-400" />}
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    {isTerms ? "Terms of Service" : "Privacy Policy"}
                  </h1>
                  <p className="text-gray-400">
                    Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
              
              <div className="hidden sm:block bg-gray-900/30 rounded-lg px-4 py-2 border border-gray-800">
                <div className="flex items-center">
                  <FiUser className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="font-medium">Nitish Saxena</span>
                </div>
                <p className="text-xs text-gray-500">Founder & CEO</p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Introduction */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <FiBriefcase className="mr-2 text-red-400" />
                About Niyati Group
              </h2>
              <p className="mb-4">
                Niyati Group, founded by Nitish Saxena in 2019, is a premier service provider specializing in 
                financial and employment solutions. We are dedicated to helping individuals and businesses 
                navigate complex financial landscapes and employment challenges.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <FiDollarSign className="w-5 h-5 text-red-400 mr-2" />
                    <h3 className="font-bold text-white">Tax Services</h3>
                  </div>
                  <p className="text-sm">
                    Expert tax preparation, planning, and consulting services for individuals and businesses.
                  </p>
                </div>
                
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <FiDollarSign className="w-5 h-5 text-red-400 mr-2" />
                    <h3 className="font-bold text-white">Loan Assistance</h3>
                  </div>
                  <p className="text-sm">
                    Comprehensive loan solutions including personal, business, and mortgage loans.
                  </p>
                </div>
                
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <FiBriefcase className="w-5 h-5 text-red-400 mr-2" />
                    <h3 className="font-bold text-white">Job Recruitment</h3>
                  </div>
                  <p className="text-sm">
                    Connecting talented professionals with leading companies through strategic recruitment.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Main Content */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <FiShield className="mr-2 text-red-400" />
                {isTerms ? "Terms Governing Our Services" : "Your Privacy Matters"}
              </h2>
              
              {isTerms ? (
                <>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-white mb-2">1. Acceptance of Terms</h3>
                      <p>
                        By accessing or using any services provided by Niyati Group, you agree to be bound by these Terms of Service. 
                        If you do not agree to these terms, please do not use our services.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-white mb-2">2. Service Description</h3>
                      <p>
                        Niyati Group provides financial consultation, tax services, loan assistance, and recruitment services. 
                        All services are subject to availability and may be modified or discontinued without notice.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-white mb-2">3. User Responsibilities</h3>
                      <p>
                        Users must provide accurate and complete information when using our services. You are responsible for 
                                        maintaining the confidentiality of your account information and for all activities that occur under your account.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-white mb-2">4. Financial Services</h3>
                      <p>
                        Our tax and loan services are provided for informational purposes only and do not constitute financial advice. 
                        We recommend consulting with a certified financial advisor before making any financial decisions.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-white mb-2">5. Recruitment Services</h3>
                      <p>
                        Job placements are subject to employer requirements and candidate qualifications. 
                        Niyati Group does not guarantee employment and makes no representations regarding salary or employment terms.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-white mb-2">6. Intellectual Property</h3>
                      <p>
                        All content on our platform, including text, graphics, logos, and software, is the property of Niyati Group 
                        and protected by intellectual property laws.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-white mb-2">7. Limitation of Liability</h3>
                      <p>
                        Niyati Group shall not be liable for any indirect, incidental, special, or consequential damages resulting 
                        from the use or inability to use our services.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-white mb-2">8. Governing Law</h3>
                      <p>
                        These Terms shall be governed by and construed in accordance with the laws of India, without regard to its 
                        conflict of law principles.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-white mb-2">1. Information We Collect</h3>
                      <p>
                        We collect personal information when you register, use our services, or communicate with us. 
                        This may include name, contact information, financial details, employment history, and other 
                        information necessary to provide our services.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-white mb-2">2. How We Use Your Information</h3>
                      <p>
                        We use your information to provide and improve our services, process transactions, communicate with you, 
                        and comply with legal obligations. We do not sell your personal information to third parties.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-white mb-2">3. Data Protection</h3>
                      <p>
                        We implement industry-standard security measures to protect your information from unauthorized access, 
                        alteration, or destruction. All financial transactions are encrypted using SSL technology.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-white mb-2">4. Third-Party Services</h3>
                      <p>
                        We may use trusted third-party services to process payments, verify information, or provide additional 
                        services. These partners are required to maintain the confidentiality of your information.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-white mb-2">5. Cookies and Tracking</h3>
                      <p>
                        Our website uses cookies to enhance user experience and analyze usage patterns. You can control cookie 
                        preferences through your browser settings.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-white mb-2">6. Data Retention</h3>
                      <p>
                        We retain your personal information only as long as necessary to provide services, comply with legal 
                        obligations, resolve disputes, and enforce agreements.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-white mb-2">7. Your Rights</h3>
                      <p>
                        You have the right to access, correct, or delete your personal information. To exercise these rights, 
                        please contact us at privacy@niyatigroup.com.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-white mb-2">8. Policy Changes</h3>
                      <p>
                        We may update this Privacy Policy periodically. Significant changes will be communicated through our 
                        website or direct notification.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </section>
            
            {/* Contact Information */}
            <section className="mt-12 pt-6 border-t border-gray-800">
              <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <h3 className="font-bold text-white mb-2">Niyati Group Headquarters</h3>
                  <p className="mb-1">Rajni Niwas, 616, Ganesh Nagar,
Bareilly, Uttar Pradesh, 243001</p>
                  
                  <p>India</p>
                </div>
                
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <h3 className="font-bold text-white mb-2">Contact Information</h3>
                  <p className="mb-1">Email: niyatigroup1@gmail.com</p>
                  <p className="mb-1">Phone: +919997070599</p>
                  
                </div>
              </div>
            </section>
            
            {/* Acceptance */}
            <div className="mt-8 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
              <div className="flex items-start">
                <FiCheck className="w-5 h-5 text-green-400 mr-2 mt-1 flex-shrink-0" />
                <p>
                  By using our services, you acknowledge that you have read, understood, and agree to be bound by 
                  {isTerms ? " our Terms of Service" : " our Privacy Policy"}. If you have any questions or concerns, 
                  please contact our support team.
                </p>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-gradient-to-r from-red-900 via-red-950 to-black p-6 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center justify-center sm:justify-start mb-4 sm:mb-0">
                <div className="bg-gray-900/50 border border-gray-800 w-10 h-10 rounded-lg flex items-center justify-center shadow-md">
                  <img src="/logo3.png" alt="Logo" className="w-8 h-8" />
                </div>
                <span className="text-white font-bold text-lg ml-2">
                  Niyati<span className="text-gray-400">Group</span>
                </span>
              </div>
              
              <div className="text-gray-400 text-sm">
                <p>© {new Date().getFullYear()} Niyati Group. All rights reserved.</p>
                <p className="mt-1">Founded by Nitish Saxena in 2019</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LegalPages;