import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  MapPin, 
  Phone, 
  Calendar, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  X
} from 'lucide-react';

const ContactForm = () => {
  const [qrOpen, setQrOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://formspree.io/f/xjkokeey", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Thank you for your message! We will contact you soon.');
        setFormData({
          name: '',
          email: '',
          service: '',
          message: ''
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      alert('There was an error submitting your form. Please try again later.');
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 bg-gray-950 rounded-xl overflow-hidden border border-gray-800 shadow-2xl"
      >
        {/* Form Section */}
        <div className="p-6 sm:p-8 lg:p-12">
          <motion.h3 
            className="text-2xl sm:text-3xl font-bold text-gray-100 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Get in Touch
          </motion.h3>
          <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
            Fill out the form and our team will get back to you within 24 hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <input type="hidden" name="_subject" value="New Contact Form Submission" />
            <input type="hidden" name="_next" value="https://yourwebsite.com/thank-you" />

            {/* Name */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <label htmlFor="name" className="block text-gray-300 mb-2 text-sm sm:text-base font-medium">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-900 border border-gray-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-100 placeholder-gray-500 transition-all"
                placeholder="John Doe"
              />
            </motion.div>

            {/* Email */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <label htmlFor="email" className="block text-gray-300 mb-2 text-sm sm:text-base font-medium">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-900 border border-gray-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-100 placeholder-gray-500 transition-all"
                placeholder="john@example.com"
              />
            </motion.div>

            {/* Service */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <label htmlFor="service" className="block text-gray-300 mb-2 text-sm sm:text-base font-medium">Service Interested In</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-900 border border-gray-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-100 transition-all appearance-none"
              >
                <option value="">Select a service</option>
                <option value="itr">Income Tax Return Filing</option>
                <option value="gst">GST Registration & Filing</option>
                <option value="audit">Tax Audit</option>
                <option value="other">Other Services</option>
              </select>
            </motion.div>

            {/* Message */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <label htmlFor="message" className="block text-gray-300 mb-2 text-sm sm:text-base font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-900 border border-gray-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-100 placeholder-gray-500 transition-all"
                placeholder="Tell us about your requirements..."
              ></textarea>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-2 sm:py-3 text-sm sm:text-base bg-primary text-white rounded-lg font-medium shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Send Message
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
            </motion.button>
          </form>
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-900 p-6 sm:p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-gray-800"
        >
          {/* Address */}
          <div className="space-y-6 sm:space-y-8">
            <div className="text-gray-300 text-sm sm:text-base">
              <h4 className="font-semibold mb-1">Address</h4>
              <p>Rajni Niwas, 616, Ganesh Nagar</p>
              <p>Bareilly, Uttar Pradesh 243001</p>
              <a 
                href="https://www.google.com/maps/place/Niyati+Group/@28.3464594,79.3996806,17z/data=!3m1!4b1!4m6!3m5!1s0x39a001ad1ccdb735:0xe77d309c2ea8cc23!8m2!3d28.3464547!4d79.4022555!16s%2Fg%2F11fl45w23d!5m2!1e4!1e2?entry=ttu&g_ep=EgoyMDI1MDcyMi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                className=" text-indigo-400 hover:underline text-xs"
              >
                View on map
              </a>
            </div>

            {/* Phone & Email */}
            <div className="text-gray-300 text-sm sm:text-base">
              <h4 className="font-semibold mb-1">Phone & Email</h4>
              <p>9997070599, 7060439854</p>
              <p>niyatigroup1@gmail.com</p>
              <div className="flex gap-3 mt-2">
                <a href="tel:09412190338" className="text-indigo-400 hover:underline text-xs">Call now</a>
                <a href="mailto:niyatigroup1@gmail.com" className="text-indigo-400 hover:underline text-xs">Email us</a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="text-gray-300 text-sm sm:text-base">
              <h4 className="font-semibold mb-1">Business Hours</h4>
              <p>Mon–Sat: 9:30 AM – 9:00 PM</p>
              <p>Sunday: 9:00 AM – 9:00 PM</p>
              <a 
                href="https://wa.me/919997070599?text=Hi%2C%20I%20would%20like%20to%20book%20an%20appointment."
                className="text-indigo-400 hover:underline text-xs block mt-2"
                target="_blank"
              >
                Book an appointment
              </a>
            </div>

            {/* UPI Section */}
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="text-gray-100 mb-3 text-sm font-semibold">Make Payment via UPI</h4>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div
                  className="bg-white p-2 rounded-lg cursor-pointer hover:shadow-lg"
                  onClick={() => setQrOpen(true)}
                >
                  <img src="/upi.jpg" alt="UPI QR" className="w-20 h-20 object-contain" />
                </div>
                <p className="text-gray-400 text-xs">
                  Scan the QR with any UPI app to make the payment.
                </p>
              </div>
            </div>

            {/* Modal - Made smaller */}
            {qrOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
                onClick={() => setQrOpen(false)}
              >
                <motion.div
                  className="relative bg-white p-4 rounded-lg max-w-xs" // Smaller max width
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    onClick={() => setQrOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <img
                    src="/upi.jpg"
                    alt="UPI QR Large"
                    className="w-48 h-48 object-contain" // Fixed smaller size
                  />
                  <p className="text-center text-sm mt-2 text-gray-600">Scan to make payment</p>
                </motion.div>
              </div>
            )}

            {/* Social Icons */}
            <div className="flex gap-3 mt-4 text-gray-400">
              <a href="#" className="hover:text-gray-300"><Facebook /></a>
              <a href="#" className="hover:text-gray-300"><Twitter /></a>
              <a href="#" className="hover:text-gray-300"><Instagram /></a>
              <a href="#" className="hover:text-gray-300"><Linkedin /></a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactForm;