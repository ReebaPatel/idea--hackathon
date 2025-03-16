// src/components/HomePage.js
import React from 'react';
import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
import Navbar from './Navbar';

// Team Data
const services = [
  { id: 1, name: 'Service 1', role: 'smthn' },
  { id: 2, name: 'Service 1', role: 'smthn' },
  { id: 3, name: 'Service 1', role: 'smthn' },
  { id: 4, name: 'Service 1', role: 'smthn' },
];

// HomePage Component
const HomePage = () => {
  return (
    <>
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white text-center p-5 font-poppins">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-5"
        >
          Our Services 
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl mb-10"
        >
          Manage your Finances with us
        </motion.h2>

        {/* Team Grid */}
        <div className="grid grid-cols-2 gap-5 w-full max-w-2xl">
          {services.map((member) => (
            <motion.div
              key={member.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + member.id * 0.1 }}
              className="bg-white bg-opacity-10 p-5 rounded-lg text-center cursor-pointer hover:bg-opacity-20"
            >
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-200">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
