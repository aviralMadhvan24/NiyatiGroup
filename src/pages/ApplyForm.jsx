import React, { useState } from "react";
import { db } from '../firebase';  // Your Firebase config should export `db` (Firestore)
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from "framer-motion";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/djs7dznnh/auto/upload";
const CLOUDINARY_PRESET = "niyatigroup";

const ApplyForm = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0] && e.target.files[0].type === "application/pdf") {
      setFile(e.target.files[0]);
    } else {
      alert("Please upload a PDF file only.");
      e.target.value = null;  // reset input
    }
  };

  // Upload file to Cloudinary (unsigned)
  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', CLOUDINARY_PRESET);

    const response = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: data,
    });

    if (!response.ok) {
      throw new Error("Cloudinary upload failed");
    }

    return response.json();  // returns response including secure_url
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a PDF file to upload.");
      return;
    }

    setSubmitting(true);

    try {
      // Upload and get URL
      const uploadRes = await uploadToCloudinary(file);
      const cvUrl = uploadRes.secure_url;

      if (!cvUrl) {
        alert("Failed to upload CV to Cloudinary.");
        setSubmitting(false);
        return;
      }

      // Save CV URL to Firestore with timestamp
      await addDoc(collection(db, "jobApplications"), {
        cvUrl,
        createdAt: serverTimestamp(),
      });

      alert("CV uploaded successfully!");
      setFile(null);
      setUploadProgress(0);
      // Clear file input manually (optional)
      document.getElementById("cvFile").value = null;

    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-red-700 via-red-800 to-black text-gray-300 min-h-screen overflow-hidden">
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900/50 to-gray-950">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
      </div>

      {/* Form Container */}
      <div className="relative mt-20 z-10 max-w-md mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gray-950 p-10 rounded-2xl border border-gray-800 shadow-2xl"
        >
          <motion.h2
            className="text-3xl font-bold text-gray-100 mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Upload Your CV (PDF)
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block mb-2 text-gray-400" htmlFor="cvFile">
                CV/Resume (PDF only)
              </label>
              <input
                id="cvFile"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="w-full text-gray-100"
                disabled={submitting}
                required
              />
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 bg-primary text-white rounded-lg font-medium shadow-lg hover:bg-primary/90 transition-all"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              disabled={submitting}
            >
              {submitting ? "Uploading..." : "Submit"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ApplyForm;
