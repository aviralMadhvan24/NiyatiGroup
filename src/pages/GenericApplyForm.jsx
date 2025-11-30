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
    <div className="relative bg-gradient-to-br from-red-700 via-red-800 to-black text-gray-300 min-h-screen overflow-hidden">
      <div className="relative mt-20 z-10 max-w-md mx-auto px-6 py-16">
        <motion.div className="bg-gray-950 p-10 rounded-2xl border border-gray-800 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Submit Your Resume for Future Opportunities
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name}
              onChange={handleChange} required placeholder="Full Name"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100"
            />
            <input type="email" name="email" value={formData.email}
              onChange={handleChange} required placeholder="Email Address"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100"
            />
            <input type="tel" name="phone" value={formData.phone}
              onChange={handleChange} required placeholder="Phone Number"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100"
            />
            <input type="text" name="location" value={formData.location}
              onChange={handleChange} required placeholder="City / State"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100"
            />
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100"
            >
              <option value="" disabled>Select Experience Level</option>
              <option value="Fresher">Fresher</option>
              <option value="Experienced">Experienced</option>
            </select>

            {/* CV Upload */}
            <div>
              <label className="block mb-2 text-gray-400">CV/Resume (PDF only)</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                required
                className="w-full text-gray-100"
              />
            </div>

            {/* Payment Screenshot Upload */}
            {hasClickedPay && (
              <div>
                <label className="block mb-2 text-gray-400">Upload Payment Screenshot</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPaymentFile(e.target.files[0])}
                  required
                  className="w-full text-gray-100"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
            >
              {hasClickedPay ? (submitting ? "Submitting..." : "Submit Application") : "Proceed to Pay ₹500"}
            </button>
          </form>
        </motion.div>
      </div>

      {/* PAYMENT MODAL */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-8 rounded-xl text-center border border-gray-700 w-96">

            <h3 className="text-xl font-bold text-red-400 mb-4">Pay ₹500 to Continue</h3>

            <p className="text-gray-300 mb-2">UPI ID:</p>
            <p className="text-white font-semibold text-lg mb-4">
              nitishsaxena8-2@okhsfcbank
            </p>

            {/* UPI Deep Link */}
            <a
              href="upi://pay?pa=nitishsaxena8-2@okhsfcbank&pn=NIYATI%20GROUP&am=500&cu=INR"
              className="block w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium mb-3"
            >
              Pay ₹500
            </a>

            {/* QR Code */}
            <img
              src="/qrniyati.jpg"
              alt="UPI QR Code"
              className="w-48 h-48 mx-auto rounded-lg border border-gray-700 mb-4"
            />

            <button
              onClick={() => setShowConfirmModal(true)}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
            >
              I Have Paid
            </button>

            <button
              onClick={() => setShowPaymentModal(false)}
              className="w-full py-2 mt-3 text-gray-400 hover:text-white"
            >
              Cancel
            </button>

          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-8 rounded-xl text-center border border-gray-700 w-96">

            <h3 className="text-xl font-bold text-yellow-400 mb-4">Are you sure?</h3>

            <p className="text-gray-300 mb-6">
              You must upload the payment screenshot afterwards to continue.
            </p>

            <button
              onClick={() => {
                setHasClickedPay(true);
                setShowConfirmModal(false);
                setShowPaymentModal(false);
              }}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium mb-3"
            >
              Yes, Continue
            </button>

            <button
              onClick={() => setShowConfirmModal(false)}
              className="w-full py-2 text-gray-400 hover:text-white"
            >
              Cancel
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default GenericApplyForm;
