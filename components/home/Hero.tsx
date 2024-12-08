"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover opacity-80"
      >
        <source src="/videos/heroVideo.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/50 to-black" />
      
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20 sm:py-32"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white text-center mb-6 px-4"
          >
            Building the Future of IT
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 text-center max-w-3xl px-4"
          >
            Enterprise technology solutions that scale with your business
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mt-8 px-4"
          >
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm sm:text-base">
              Get Started
            </button>
            <button className="px-8 py-3 border border-white text-white hover:bg-white/10 rounded-md transition-colors text-sm sm:text-base">
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: scrolled ? 1 : 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden sm:block"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-1 bg-white/60 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
}