import React from 'react';
import { motion } from 'framer-motion';

const TeamCard = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
      }}
      className="bg-white rounded-xl overflow-hidden shadow-md"
    >
      <div className="p-6">
        <div className="flex justify-center">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32" />
        </div>
        
        <div className="mt-4 text-center">
          <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
          <p className="text-accent font-medium">{member.position}</p>
          <p className="mt-2 text-gray-600 text-sm">{member.bio}</p>
          
          <div className="mt-4 flex justify-center space-x-3">
            {[1, 2, 3].map((item) => (
              <motion.a
                key={item}
                href="#"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="bg-gray-100 p-2 rounded-full"
              >
                <div className="w-4 h-4 bg-gray-300 rounded-full" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamCard;