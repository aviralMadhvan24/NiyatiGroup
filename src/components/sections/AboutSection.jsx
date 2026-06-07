import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
              Excellence at <br />
              <span className="text-teal-400">Niyati Group</span>
            </h2>

            <p className="text-teal-50/80 mb-6 text-lg leading-relaxed">
              Founded in 2019, Niyati Group has been a beacon of trust for individuals and businesses across India. We specialize in tax efficiency, strategic financial planning, and talent acquisition.
            </p>

            <p className="text-teal-50/60 mb-10 text-sm leading-relaxed font-medium italic">
              "Our philosophy is simple: Your growth is our success. We combine traditional values with modern expertise to deliver results that exceed expectations."
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: '15+ Years', desc: 'Industry Experience' },
                { title: '5000+', desc: 'Happy Clients' },
                { title: '98%', desc: 'Client Retention' },
                { title: '24/7', desc: 'Expert Support' },
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-white/10 p-5 rounded-2xl border border-white/10 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                >
                  <h3 className="text-2xl font-black text-teal-300">{item.title}</h3>
                  <p className="text-teal-100/70 text-xs font-bold uppercase tracking-wider mt-1">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-teal-500/20 blur-2xl rounded-full"></div>
            <img 
              src="/MainAboutPic.jpg" 
              alt="About Niyati Group" 
              className="relative w-full h-[500px] object-cover rounded-3xl shadow-2xl border-4 border-white/10"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
               <p className="text-white text-xl font-bold text-center">
                  Mr. Nitish Saxena
               </p>
               <p className="text-teal-400 text-xs font-black text-center uppercase tracking-[0.2em] mt-1">
                  Founder & CEO
               </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;