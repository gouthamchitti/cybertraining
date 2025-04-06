"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const FallbackHero = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px] bg-indigo-50 dark:bg-gray-800 rounded-lg overflow-hidden relative">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-40 h-40 md:w-60 md:h-60">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute inset-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-20 h-20 md:w-32 md:h-32">
              <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3A5.25 5.25 0 0 0 12 1.5Zm-1.5 7.5v-3a1.5 1.5 0 0 1 3 0v3h-3Z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </motion.div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-indigo-400 rounded-full opacity-10 animate-float"></div>
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-purple-400 rounded-full opacity-10 animate-float-delayed"></div>
      <div className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-blue-400 rounded-full opacity-10 animate-float-slow"></div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FallbackHero;
