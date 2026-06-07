import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import { FiBriefcase, FiUploadCloud, FiFileText, FiArrowRight } from "react-icons/fi";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/djs7dznnh/auto/upload";
const CLOUDINARY_PRESET = "niyatigroup";

const ApplyForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { jobId = "", jobTitle = "" } = location.state || {};

  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = e => {
    if (e.target.files[0] && e.target.files[0].type === "application/pdf") {
      setFile(e.target.files[0]);
    } else {
      alert("Please upload a PDF file.");
      e.target.value = null;
    }
  };

  const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", CLOUDINARY_PRESET);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", CLOUDINARY_URL);
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100;
          setUploadProgress(progress.toFixed(0));
        }
      });
      xhr.onload = () => {
        if (xhr.status === 200) resolve(JSON.parse(xhr.response));
        else reject(new Error("Upload failed"));
      };
      xhr.onerror = () => reject(new Error("Upload error"));
      xhr.send(data);
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!file) {
      alert("Please select a CV to upload.");
      return;
    }

    setSubmitting(true);
    try {
      const uploadResp = await uploadToCloudinary(file);
      if (!uploadResp.secure_url) throw new Error("Upload failed");

      await addDoc(collection(db, "jobApplications"), {
        cvUrl: uploadResp.secure_url,
        jobId,
        jobTitle,
        createdAt: serverTimestamp(),
      });

      alert("Application submitted successfully!");
      setFile(null);
      setUploadProgress(0);
      e.target.reset();

      navigate("/");

    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen niyati-bg-pattern bg-[#e8f4f8] pt-24 pb-20 flex items-center justify-center px-4">
      
      <div className="w-full max-w-lg relative z-10">
        <header className="text-center mb-10">
           <div className="inline-flex items-center px-4 py-2 mb-6 font-bold rounded-full text-teal-700 bg-white border border-teal-100 shadow-sm">
             <FiBriefcase className="mr-2" />
             Job Application
           </div>
           <h1 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight">
             Applying for <br />
             <span className="text-teal-600">{jobTitle || "Featured Position"}</span>
           </h1>
        </header>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-teal-900/10 border border-teal-50"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="p-8 border-2 border-dashed border-teal-100 rounded-[2rem] bg-teal-50/30 text-center relative group hover:bg-teal-50 transition-all">
              <input
                id="cvFile"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                disabled={submitting}
                required
              />
              <div className="relative z-10 py-4">
                 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-900/5 group-hover:scale-110 transition-transform">
                    {file ? <FiFileText className="text-3xl text-teal-600" /> : <FiUploadCloud className="text-3xl text-slate-300" />}
                 </div>
                 <p className="text-slate-700 font-bold mb-1">
                   {file ? file.name : "Choose CV/Resume"}
                 </p>
                 <p className="text-slate-400 text-xs font-medium italic">PDF file up to 5MB</p>
              </div>
            </div>

            {uploadProgress > 0 && (
              <div className="space-y-2">
                 <div className="flex justify-between text-xs font-bold text-teal-600 uppercase tracking-widest">
                    <span>Uploading Profile</span>
                    <span>{uploadProgress}%</span>
                 </div>
                 <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-teal-600" 
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                    />
                 </div>
              </div>
            )}

            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold shadow-xl shadow-teal-900/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? "Processing Application..." : "Submit Application"}
              <FiArrowRight />
            </motion.button>
            
            <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Secure Cloud Processing by Niyati Group
            </p>
          </form>
        </motion.div>

        <div className="mt-8 text-center">
           <button 
             onClick={() => navigate(-1)}
             className="text-slate-400 hover:text-teal-600 font-bold text-sm transition-colors"
           >
             ← Cancel and return
           </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyForm;
