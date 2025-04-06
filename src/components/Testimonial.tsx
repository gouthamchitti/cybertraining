"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  company: string;
  image: string;
  delay?: number;
}

export default function Testimonial({ quote, name, title, company, image, delay = 0 }: TestimonialProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 10 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
      <div className="absolute top-6 left-6 text-5xl text-indigo-200 dark:text-indigo-900 opacity-50">"</div>
      
      <div className="p-8 pt-10">
        <p className="text-gray-600 dark:text-gray-300 mb-6 relative z-10">
          "{quote}"
        </p>
        
        <div className="flex items-center">
          <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">{name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}, {company}</p>
          </div>
        </div>
      </div>
      
      {/* Animated gradient background on hover */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 opacity-0 -z-10"
        animate={{ opacity: isHovered ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
