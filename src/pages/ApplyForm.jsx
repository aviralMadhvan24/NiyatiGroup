import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/djs7dznnh/auto/upload";
const CLOUDINARY_PRESET = "niyatigroup";
const ApplyForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get jobId and jobTitle from route state if available
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
      e.target.reset(); // Reset file input

      navigate("/"); // Redirect or wherever you want

    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-red-700 via-red-800 to-black text-gray-300 min-h-screen overflow-hidden">
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-gray-950">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_0),linear-gradient(to_bottom,#80808012_1px,transparent_0)] bg-[length:24px_24px]" />
        </div>
      </div>

      <div className="relative z-10 max-w-md mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-950 p-10 rounded-2xl border border-gray-800 shadow-2xl"
        >
          <motion.h2
            className="text-3xl font-bold text-white mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Apply for: <span className="text-red-500">{jobTitle || "General Application"}</span>
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label htmlFor="cvFile" className="block text-gray-400 mb-2 font-semibold">
                Upload your CV (PDF only)
              </label>
              <input
                id="cvFile"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="w-full cursor-pointer rounded-md border border-gray-700 bg-gray-900 p-2 text-gray-100"
                disabled={submitting}
                required
              />
              {uploadProgress > 0 && (
                <p className="mt-2 text-sm text-gray-400">Uploading: {uploadProgress}%</p>
              )}
            </motion.div>

            <motion.button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md bg-red-600 py-3 text-white shadow-lg transition hover:bg-red-700 disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ApplyForm;
