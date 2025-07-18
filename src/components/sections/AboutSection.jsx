import React from 'react';
import { motion } from 'framer-motion';
import teamData from '../../data/team';
import TeamCard from '../ui/TeamCard';
const AboutSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              About <span className="text-primary">Niyati Group</span>
            </h2>

            <p className="text-gray-400 mb-4">
              Founded in 2019, Niyati Group has been providing comprehensive tax consultancy services to individuals and businesses across India. Our team of certified professionals brings expertise in all areas of taxation.
            </p>

            <p className="text-gray-400 mb-8">
              We pride ourselves on delivering personalized solutions that help our clients navigate complex tax regulations, maximize savings, and achieve financial peace of mind.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { title: '15+ Years', desc: 'Industry Experience' },
                { title: '5000+', desc: 'Happy Clients' },
                { title: '98%', desc: 'Client Retention' },
                { title: '24/7', desc: 'Support Available' },
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 text-red-500"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-primary">{item.title}</h3>
                  <p className="text-violet-600 mt-1">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
           
          >
            <img 
              src="/MainAboutPic.jpg" 
              alt="About Niyati Group" 
              className="w-full h-auto rounded-xl shadow-lg"
            />
            <p className="mt-4 text-shadow-red-800 text-3xl font-semibold text-center text-white">
  Mr. Nitish Saxena, Founder & CEO
</p>

          </motion.div>
        </div>
        
        <div className="mt-24">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Meet Our <span className="text-primary">Expert</span> Team
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamData.map((member, index) => (
              <TeamCard 
                key={member.id} 
                member={member} 
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;