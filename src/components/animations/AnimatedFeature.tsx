"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedFeatureProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export default function AnimatedFeature({ icon, title, description, delay = 0 }: AnimatedFeatureProps) {
  return (
    <motion.div
      className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/50 transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-indigo-100 dark:bg-indigo-900/20 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
      <div className="absolute -top-4 -left-4 w-16 h-16 bg-indigo-100 dark:bg-indigo-900/20 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
    </motion.div>
  );
}
