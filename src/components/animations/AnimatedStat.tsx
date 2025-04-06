"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedStatProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  delay?: number;
}

export default function AnimatedStat({ value, label, prefix = "", suffix = "", delay = 0 }: AnimatedStatProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (isInView) {
      const duration = 2000; // Animation duration in ms
      const startTime = Date.now();
      
      const timer = setTimeout(() => {
        const animateCount = () => {
          const elapsedTime = Date.now() - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          const easedProgress = easeOutQuart(progress);
          
          setDisplayValue(Math.floor(easedProgress * value));
          
          if (progress < 1) {
            requestAnimationFrame(animateCount);
          }
        };
        
        requestAnimationFrame(animateCount);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, value, delay]);
  
  // Easing function for smoother animation
  const easeOutQuart = (x: number): number => {
    return 1 - Math.pow(1 - x, 4);
  };
  
  return (
    <motion.div
      ref={ref}
      className="text-center p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      viewport={{ once: true }}
    >
      <div className="text-4xl md:text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
        {prefix}{displayValue}{suffix}
      </div>
      <div className="text-gray-600 dark:text-gray-300 text-lg">
        {label}
      </div>
    </motion.div>
  );
}
