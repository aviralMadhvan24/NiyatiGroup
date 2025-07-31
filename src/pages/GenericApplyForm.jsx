import React, { useState } from "react";
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from "framer-motion";

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
  const [submitting, setSubmitting] = useState(false);

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

  // Upload PDF to Cloudinary
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
    setSubmitting(true);

    let cvUrl = "";
    try {
      if (file) {
        const uploadRes = await uploadToCloudinary(file);
        if (uploadRes.secure_url) {
          cvUrl = uploadRes.secure_url;
        } else {
          alert("Failed to upload CV.");
          setSubmitting(false);
          return;
        }
      }

      await addDoc(collection(db, "genericjobApplications"), {
        ...formData,
        cvUrl,
        createdAt: serverTimestamp()
      });

      alert("Application submitted!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        experience: "",
        cvUrl: "",
      });
      setFile(null);
    } catch (error) {
      alert("Error submitting form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-red-700 via-red-800 to-black text-gray-300 min-h-screen overflow-hidden">
      <div className="relative mt-20 z-10 max-w-md mx-auto px-6 py-16">
        <motion.div
          
          className="bg-gray-950 p-10 rounded-2xl border border-gray-800 shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Submit Your Resume for Future Opportunities
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name}
              onChange={handleChange} required placeholder="Full Name"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 mb-2"
            />
            <input type="email" name="email" value={formData.email}
              onChange={handleChange} required placeholder="Email Address"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 mb-2"
            />
            <input type="tel" name="phone" value={formData.phone}
              onChange={handleChange} required placeholder="Phone Number"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 mb-2"
            />
            <input type="text" name="location" value={formData.location}
              onChange={handleChange} required placeholder="City / State"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 mb-2"
            />
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 mb-2"
            >
              <option value="" disabled>Select Experience Level</option>
              <option value="Fresher">Fresher</option>
              <option value="Experienced">Experienced</option>
            </select>
            <div className="mb-2">
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
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default GenericApplyForm;

