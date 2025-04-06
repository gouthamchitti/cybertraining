/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7c3aed', // Violet-600
          dark: '#6d28d9',    // Violet-700
          light: '#8b5cf6',   // Violet-500
        },
        secondary: {
          DEFAULT: '#10b981', // Emerald-500
          dark: '#059669',    // Emerald-600
          light: '#34d399',   // Emerald-400
        },
        accent: {
          DEFAULT: '#f59e0b', // Amber-500
          dark: '#d97706',    // Amber-600
          light: '#fbbf24',   // Amber-400
        },
        darkbg: {
          DEFAULT: '#1e1b4b', // Indigo-950
          light: '#312e81',   // Indigo-900
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-pattern": "linear-gradient(to right bottom, rgba(124, 58, 237, 0.8), rgba(30, 27, 75, 0.9))",
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
        'spin-slower': 'spin 25s linear infinite',
        'reverse-spin': 'reverse-spin 12s linear infinite',
        'reverse-spin-slower': 'reverse-spin 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 8s ease-in-out 1s infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-delay-slow': 'float 12s ease-in-out 2s infinite',
      },
      keyframes: {
        'reverse-spin': {
          from: {
            transform: 'rotate(360deg)'
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
