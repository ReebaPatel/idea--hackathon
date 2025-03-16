// src/components/HomePage.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // ✅ Import Link for navigation
import Navbar from './Navbar';

// Services Data (new data from the latest code)
const services = [
  { id: 1, name: 'Loans and Advances', role: 'Manage accounts, pay bills, and more', link: '/loans' },
  { id: 2, name: 'Savings and Deposit Accounts', role: 'Bank on the go with our mobile app', link: '/SavingsAndDeposits' },
  { id: 3, name: 'Customer Onboarding', role: 'Seamless digital onboarding process', link: '/onboarding' },
  { id: 4, name: 'Global Transactions', role: 'Cross-border payments made easy', link: '/global-transactions' },
];

// HomePage Component
const HomePage = () => {
  return (
    <>
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white text-center p-20 font-poppins">
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
          Manage your finances with us
        </motion.h2>

        {/* Services Grid */}
        <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
          {services.map((service) => (
            <Link key={service.id} to={service.link}> {/* ✅ Wrap with Link */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + service.id * 0.1 }}
                className="bg-white bg-opacity-10 p-5 rounded-lg text-center cursor-pointer hover:bg-opacity-20 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-200">{service.role}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;