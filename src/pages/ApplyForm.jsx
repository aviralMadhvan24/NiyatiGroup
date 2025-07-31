import React, { useState } from "react";
import { db } from '../firebase';  // Your Firebase config should export `db` (Firestore)
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from "framer-motion";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/djs7dznnh/auto/upload";
const CLOUDINARY_PRESET = "niyatigroup";

const ApplyForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    name: '',
    email: '',
    phone: '',
    location: '',
    position: '',
    linkedin: '',
    experience_level: '',
    cvUrl: '',           // to store Cloudinary URL after upload
  });
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
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
    setSubmitting(true);

    try {
      let cvUrl = "";

      if (file) {
        // Upload and get URL
        const uploadRes = await uploadToCloudinary(file);
        if (uploadRes.secure_url) {
          cvUrl = uploadRes.secure_url;
        } else {
          alert("Failed to upload CV to Cloudinary.");
          setSubmitting(false);
          return;
        }
      }

      // Save application data + cvUrl to Firestore
      await addDoc(collection(db, "jobApplications"), {
        ...formData,
        cvUrl,
        createdAt: serverTimestamp(),
      });

      alert("Application submitted!");
      setFormData({
        jobTitle: '',
        name: '',
        email: '',
        phone: '',
        location: '',
        position: '',
        linkedin: '',
        experience_level: '',
        cvUrl: '',
      });
      setFile(null);
      setUploadProgress(0);
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
      <div className="relative mt-20 z-10 max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gray-950 p-10 rounded-2xl border border-gray-800 shadow-2xl"
        >
          <motion.h2
            className="text-3xl font-bold text-gray-100 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Apply for a Position
          </motion.h2>
          <p className="text-gray-400 mb-8">
            Fill out the application form and upload your CV in PDF format.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { name: "jobTitle", type: "text", placeholder: "Job Title", required: true },
              { name: "name", type: "text", placeholder: "Full Name", required: true },
              { name: "email", type: "email", placeholder: "Email Address", required: true },
              { name: "phone", type: "tel", placeholder: "Phone Number", required: true },
              { name: "location", type: "text", placeholder: "City / State", required: true },
              { name: "position", type: "text", placeholder: "Position Applying For", required: true },
              { name: "linkedin", type: "url", placeholder: "LinkedIn Profile (optional)", required: false },
            ].map((field, index) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-100 placeholder-gray-500 transition-all"
                />
              </motion.div>
            ))}

            {/* Experience Level Select */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <select
                name="experience_level"
                value={formData.experience_level}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-100 placeholder-gray-500 transition-all"
              >
                <option value="" disabled>
                  Select Experience Level
                </option>
                <option value="Fresher">Fresher</option>
                <option value="Experienced">Experienced</option>
              </select>
            </motion.div>

            {/* File upload for CV */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <label className="block mb-2 text-gray-400" htmlFor="cvFile">
                Upload CV/Resume (PDF only)
              </label>
              <input
                id="cvFile"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="w-full text-gray-100"
                disabled={submitting}
              />
              {uploadProgress > 0 && (
                <p className="text-sm text-gray-400 mt-1">Uploading: {uploadProgress}%</p>
              )}
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 bg-primary text-white rounded-lg font-medium shadow-lg hover:bg-primary/90 transition-all"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              disabled={submitting}
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
