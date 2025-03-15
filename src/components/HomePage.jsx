// src/components/HomePage.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Team Data
const teamMembers = [
  { id: 1, name: 'John Doe', role: 'CEO' },
  { id: 2, name: 'Jane Smith', role: 'CTO' },
  { id: 3, name: 'Alice Johnson', role: 'Lead Designer' },
  { id: 4, name: 'Bob Brown', role: 'Software Engineer' },
];

// HomePage Component
const HomePage = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-1000 flex justify-between items-center p-5 bg-black bg-opacity-20">
        <img src="/logo1.png" alt="Logo 1" className="h-10 mx-5" />
        <div className="flex gap-5">
          <Link to="/" className="text-white text-lg hover:underline">
            Home
          </Link>
          <Link to="/recommendations" className="text-white text-lg hover:underline">
            Recommendations
          </Link>
        </div>
        <img src="/logo2.png" alt="Logo 2" className="h-10 mx-5" />
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white text-center p-5">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-5"
        >
          Meet Our Team
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl mb-10"
        >
          The talented individuals behind our success
        </motion.h2>

        {/* Team Grid */}
        <div className="grid grid-cols-2 gap-5 w-full max-w-2xl">
          {teamMembers.map((member) => (
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