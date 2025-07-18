import React from 'react';
import ContactForm from '../components/sections/ContactForm';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section className="relative pt-28 pb-32 md:pt-36 md:pb-36 lg:pt-44 lg:pb-40 bg-red-950 overflow-hidden">
      {/* Background Grid */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900/50 to-gray-950">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        {/* Floating Circles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              width: Math.random() * 10 + 2,
              height: Math.random() * 10 + 2,
            }}
            animate={{
              y: [null, Math.random() * 50 - 25],
              x: [null, Math.random() * 50 - 25],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Content Section */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get in <span className="text-primary">Touch</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-gray-300 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            Reach out to our tax professionals for expert advice, support, and personalized solutions tailored to your financial goals.
          </motion.p>
        </div>

        {/* Contact Form */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-2xl"
          >
            <ContactForm />
          </motion.div>
        </div>

        {/* Map Placeholder */}
       <div className="mt-20 w-full aspect-[3/2] md:aspect-[3/1] rounded-lg overflow-hidden border border-gray-800 shadow-xl">
  <iframe
    className="w-full h-full"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3511.409896550413!2d79.39968057549034!3d28.34645467582223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a001ad1ccdb735%3A0xe77d309c2ea8cc23!2sNiyati%20Tax%20%26%20Financial%20Services!5e0!3m2!1sen!2sin!4v1752815570141!5m2!1sen!2sin"
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>
      </div>
    </section>
  );
};

export default Contact;
