"use client"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const WelcomePopup = ({ username, duration = 3500 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1  }}
      exit={{ opacity: 0, y: -50,  scale: 0.8 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="fixed top-20 left-1/2 animate-bounce transform -translate-x-1/2 p-4 bg-white shadow-lg rounded-lg z-50"
    >
      <p className="text-lg font-semibold text-gray-800">Welcome {username}</p>
      <motion.div 
       initial={{ width: 0 }}
       animate={{  width: "100%"  }}
       transition={{ duration: 3.4 , ease: "easeIn" }}
       
      className="w-full h-[4px] bg-sky-400"></motion.div>
    </motion.div>
  );
};

export default WelcomePopup;
