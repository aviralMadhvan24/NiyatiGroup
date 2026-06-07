import React, { useState } from "react";
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from "framer-motion";
import { FiUsers, FiMail, FiPhone, FiMapPin, FiBriefcase, FiUploadCloud, FiCreditCard, FiX, FiCheck, FiArrowRight } from "react-icons/fi";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/djs7dznnh/auto/upload";
const CLOUDINARY_PRESET = "niyatigroup";

const GenericApplyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    cvUrl: "",
  });

  const [file, setFile] = useState(null);
  const [paymentFile, setPaymentFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [hasClickedPay, setHasClickedPay] = useState(false);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0] && e.target.files[0].type === "application/pdf") {
      setFile(e.target.files[0]);
    } else {
      alert("Please upload a PDF file only.");
      e.target.value = null;
    }
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', CLOUDINARY_PRESET);

    const response = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: data,
    });

    if (!response.ok) throw new Error("Cloudinary upload failed");
    return response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasClickedPay) {
      setShowPaymentModal(true);
      return;
    }

    if (!paymentFile) {
      alert("Please upload the payment screenshot.");
      return;
    }

    setSubmitting(true);

    try {
      let cvUrl = "";
      let paymentScreenshotUrl = "";

      if (file) {
        const uploadRes = await uploadToCloudinary(file);
        cvUrl = uploadRes.secure_url;
      }

      if (paymentFile) {
        const payUpload = await uploadToCloudinary(paymentFile);
        paymentScreenshotUrl = payUpload.secure_url;
      }

      await addDoc(collection(db, "genericjobApplications"), {
        ...formData,
        cvUrl,
        paymentScreenshot: paymentScreenshotUrl,
        createdAt: serverTimestamp()
      });

      alert("Application submitted successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        experience: "",
        cvUrl: "",
      });
      setFile(null);
      setPaymentFile(null);
      setHasClickedPay(false);

    } catch (error) {
      alert("Error submitting form. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen niyati-bg-pattern bg-[#e8f4f8] pt-24 pb-20 px-4">
      
      <div className="max-w-4xl mx-auto relative z-10">
        <header className="text-center mb-12">
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center px-4 py-2 mb-6 font-bold rounded-full text-teal-700 bg-white border border-teal-100 shadow-sm">
                <FiUsers className="mr-2" />
                Talent Pool Submission
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">
                Connect for <span className="text-teal-600">Future</span> Roles
              </h1>
              <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                Submit your profile to our recruitment database. We'll reach out when a position matches your expertise.
              </p>
           </motion.div>
        </header>

        <div className="bg-white rounded-[3rem] shadow-2xl shadow-teal-900/10 border border-teal-50 overflow-hidden flex flex-col md:flex-row">
           {/* Left Side - Form */}
           <div className="p-8 md:p-12 md:w-3/5">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <FiUsers className="absolute top-4 left-4 text-teal-600" />
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-medium" />
                  </div>
                  <div className="relative">
                    <FiMail className="absolute top-4 left-4 text-teal-600" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-medium" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <FiPhone className="absolute top-4 left-4 text-teal-600" />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Phone" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-medium" />
                  </div>
                  <div className="relative">
                    <FiMapPin className="absolute top-4 left-4 text-teal-600" />
                    <input type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="City/State" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-medium" />
                  </div>
                </div>

                <div className="relative">
                   <FiBriefcase className="absolute top-4 left-4 text-teal-600" />
                   <select name="experience" value={formData.experience} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 font-bold appearance-none cursor-pointer">
                      <option value="" disabled>Select Experience Level</option>
                      <option value="Fresher">Fresher</option>
                      <option value="Experienced">Experienced</option>
                   </select>
                </div>

                <div className="p-6 border-2 border-dashed border-teal-100 rounded-2xl bg-teal-50/20 text-center relative group">
                   <input type="file" accept="application/pdf" onChange={handleFileChange} required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                   <FiUploadCloud className="mx-auto text-2xl text-slate-300 mb-2 group-hover:text-teal-600 transition-colors" />
                   <p className="text-xs font-bold text-slate-500">{file ? file.name : "Upload CV/Resume (PDF)"}</p>
                </div>

                {hasClickedPay && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-center relative">
                     <input type="file" accept="image/*" onChange={(e) => setPaymentFile(e.target.files[0])} required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                     <FiCreditCard className="mx-auto text-2xl text-emerald-600 mb-2" />
                     <p className="text-xs font-bold text-emerald-800">{paymentFile ? paymentFile.name : "Upload Payment Screenshot"}</p>
                  </motion.div>
                )}

                <motion.button type="submit" disabled={submitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold shadow-xl shadow-teal-900/10 transition-all flex items-center justify-center gap-2">
                   {hasClickedPay ? (submitting ? "Submitting..." : "Submit Profile") : "Proceed to Registration Fee (₹500)"}
                   <FiArrowRight />
                </motion.button>
              </form>
           </div>

           {/* Right Side - Info Box */}
           <div className="niyati-card-dark p-8 md:p-12 md:w-2/5 text-white flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5 -mr-16 -mt-16 bg-white w-48 h-48 rounded-full"></div>
              <h3 className="text-xl font-black mb-6">Why Submit Your CV?</h3>
              <ul className="space-y-6">
                {[
                  "Early access to unlisted jobs",
                  "Direct contact with HR experts",
                  "Personalized career matching",
                  "Priority review for new roles"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                     <div className="w-5 h-5 bg-teal-400/20 rounded-full flex items-center justify-center border border-teal-400/30 shrink-0 mt-0.5">
                        <FiCheck className="text-[10px] text-teal-300" />
                     </div>
                     <span className="text-sm font-medium text-teal-50/80">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-12 pt-8 border-t border-white/10 text-center">
                 <p className="text-[10px] text-teal-100/40 font-black uppercase tracking-widest">Niyati Group Official HR Database</p>
              </div>
           </div>
        </div>
      </div>

      {/* PAYMENT MODAL */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white p-8 rounded-[2.5rem] shadow-2xl w-full max-w-sm text-center relative">
              <button onClick={() => setShowPaymentModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800">
                <FiX size={24} />
              </button>

              <h3 className="text-xl font-bold text-slate-800 mb-6">Registration Fee</h3>
              <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100 mb-6">
                 <p className="text-teal-600 font-black text-3xl font-poppins mb-1">₹500</p>
                 <p className="text-[10px] text-teal-600/60 font-black uppercase tracking-[0.2em]">One-time Enrollment</p>
              </div>

              <p className="text-slate-500 font-medium text-xs mb-6">Scan QR or use UPI ID to complete your registration in our talent database.</p>

              <div className="bg-slate-50 p-4 rounded-2xl mb-6 shadow-inner border border-slate-100 pointer-events-none">
                 <img src="/qrniyati.jpg" alt="UPI QR" className="w-48 h-48 mx-auto rounded-lg" />
              </div>

              <div className="space-y-3">
                 <a href="upi://pay?pa=nitishsaxena8-2@okhsfcbank&pn=NIYATI%20GROUP&am=500&cu=INR" className="flex items-center justify-center gap-2 w-full py-4 bg-teal-600 text-white rounded-2xl font-bold shadow-xl shadow-teal-900/10 transition-all hover:bg-teal-700">
                    <FiCreditCard />
                    Pay via UPI Phone App
                 </a>
                 <button onClick={() => setShowConfirmModal(true)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl transition-all">
                    I Have Paid
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CONFIRMATION MODAL */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[60] p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white p-8 rounded-[2.5rem] shadow-2xl w-full max-w-sm text-center">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-amber-100">
                 <FiArrowRight className="text-3xl text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Payment Confirmation</h3>
              <p className="text-slate-500 font-medium text-sm mb-8">You must upload a screenshot of the payment on the next screen to verify your registration.</p>
              
              <div className="space-y-3">
                 <button onClick={() => { setHasClickedPay(true); setShowConfirmModal(false); setShowPaymentModal(false); }} className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold shadow-lg shadow-teal-900/10">
                    Confirm & Proceed
                 </button>
                 <button onClick={() => setShowConfirmModal(false)} className="w-full py-4 bg-slate-100 text-slate-400 rounded-2xl font-bold">
                    Go Back
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GenericApplyForm;
