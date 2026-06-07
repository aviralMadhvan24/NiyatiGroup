import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  X,
  Clock
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
    <div className="flex flex-col lg:grid lg:grid-cols-2 bg-white min-h-[600px]">
      {/* Form Section - Clean Light Side */}
      <div className="p-8 md:p-12 lg:p-16">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Send us a Message</h3>
        <p className="text-slate-500 mb-10 text-sm font-medium italic">We'll get back to you within 24 hours.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-slate-700 mb-2 text-sm font-bold">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-400 font-medium transition-all"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-slate-700 mb-2 text-sm font-bold">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-400 font-medium transition-all"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="service" className="block text-slate-700 mb-2 text-sm font-bold">Service Interested In</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 font-medium transition-all appearance-none"
            >
              <option value="">Select a service</option>
              <option value="itr">Income Tax Return Filing</option>
              <option value="gst">GST Registration & Filing</option>
              <option value="audit">Tax Audit</option>
              <option value="loans">Loan Assistance</option>
              <option value="recruitment">Job Recruitment</option>
              <option value="other">Other Services</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-slate-700 mb-2 text-sm font-bold">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-400 font-medium transition-all"
              placeholder="Tell us about your requirements..."
            ></textarea>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-teal-600 text-white rounded-xl font-bold shadow-xl shadow-teal-900/10 hover:bg-teal-700 transition-all flex items-center justify-center gap-2"
          >
            Send Message
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </form>
      </div>

      {/* Info Section - Dark Teal Side matching the card theme */}
      <div className="niyati-card-dark p-8 md:p-12 lg:p-16 text-white flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 -mr-20 -mt-20">
           <img src="/logo3.png" alt="" className="w-80 h-80" />
        </div>
        
        <div className="relative z-10 space-y-10">
          <div>
            <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
            <p className="text-teal-50/70 text-sm">Have a project in mind? We'd love to help you grow your business and manage your finances effectively.</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 shrink-0">
                <MapPin className="w-5 h-5 text-teal-300" />
              </div>
              <div className="text-sm">
                 <p className="font-bold">Address</p>
                 <p className="text-teal-50/70">Rajni Niwas, 616, Ganesh Nagar,<br />Bareilly, Uttar Pradesh 243001</p>
                 <a href="#" className="text-teal-400 text-xs font-bold hover:underline mt-1 inline-block">View on Maps</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 shrink-0">
                <Phone className="w-5 h-5 text-teal-300" />
              </div>
              <div className="text-sm">
                 <p className="font-bold">Phone</p>
                 <p className="text-teal-50/70">9997070599, 7060439854</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 shrink-0">
                <Mail className="w-5 h-5 text-teal-300" />
              </div>
              <div className="text-sm">
                 <p className="font-bold">Email</p>
                 <p className="text-teal-50/70">niyatigroup1@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 shrink-0">
                <Clock className="w-5 h-5 text-teal-300" />
              </div>
              <div className="text-sm">
                 <p className="font-bold">Business Hours</p>
                 <p className="text-teal-50/70">Mon–Sat: 9:30 AM – 9:00 PM</p>
                 <p className="text-teal-50/70 text-xs">Sunday: 9:00 AM – 9:00 PM</p>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <motion.a 
                key={i} 
                href="#" 
                whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,0.2)' }}
                className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center transition-colors"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* UPI Section */}
        <div className="mt-12 p-6 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-sm relative z-10 flex items-center justify-between gap-4">
           <div className="max-w-[150px]">
              <p className="text-sm font-bold mb-1">UPI Payment</p>
              <p className="text-[10px] text-teal-50/50 leading-relaxed font-medium">Scan to pay instantly for any of our professional services.</p>
           </div>
           <motion.div 
             whileHover={{ scale: 1.05 }}
             onClick={() => setQrOpen(true)}
             className="w-20 h-20 bg-white p-2 rounded-xl cursor-pointer shadow-2xl"
           >
              <img src="/upi.jpg" alt="UPI QR" className="w-full h-full object-contain" />
           </motion.div>
        </div>

        {/* Modal for QR */}
        {qrOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4" onClick={() => setQrOpen(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-6 rounded-3xl max-w-sm w-full relative"
              onClick={e => e.stopPropagation()}
            >
              <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-800" onClick={() => setQrOpen(false)}>
                <X className="w-6 h-6" />
              </button>
              <div className="text-center">
                 <h4 className="text-slate-800 font-bold mb-4">Scan to Pay via UPI</h4>
                 <div className="bg-teal-50 p-4 rounded-2xl mb-4 border border-teal-100 flex justify-center">
                    <img src="/upi.jpg" alt="UPI QR" className="w-56 h-56 object-contain shadow-sm rounded-lg" />
                 </div>
                 <p className="text-xs text-slate-500 font-medium">Safe & Secure Payment</p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;