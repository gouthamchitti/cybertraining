"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="bg-gray-900/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 transition-all duration-300 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main navigation */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="relative w-10 h-10 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 rounded-md shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                      <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3A5.25 5.25 0 0 0 12 1.5Zm-1.5 7.5v-3a1.5 1.5 0 0 1 3 0v3h-3Z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-300">CyberTrainer.in</span>
              </Link>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:ml-6 md:flex space-x-8">
              <>
                <Link
                  href="/"
                  className={`px-3 py-2 text-sm font-medium border-b-2 transition-all duration-300 ${
                    isActive('/')
                      ? 'text-purple-400 border-purple-400 font-semibold'
                      : 'text-gray-300 border-transparent hover:text-purple-300 hover:border-purple-300'
                  }`}
                >
                  Home
                </Link>

                <Link
                  href="/demo"
                  className={`px-3 py-2 text-sm font-medium border-b-2 transition-all duration-300 ${
                    isActive('/demo')
                      ? 'text-purple-400 border-purple-400 font-semibold'
                      : 'text-gray-300 border-transparent hover:text-purple-300 hover:border-purple-300'
                  }`}
                >
                  Trainer AI
                </Link>
                <Link
                  href="/contact"
                  className={`px-3 py-2 text-sm font-medium border-b-2 transition-all duration-300 ${
                    isActive('/contact')
                      ? 'text-purple-400 border-purple-400 font-semibold'
                      : 'text-gray-300 border-transparent hover:text-purple-300 hover:border-purple-300'
                  }`}
                >
                  Contact Us
                </Link>
              </>
            </nav>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2.5 rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none shadow-md transition-all duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - simplified implementation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 shadow-xl border-t border-gray-800 absolute left-0 right-0 z-50 rounded-b-xl mx-2">
          <div className="px-4 pt-4 pb-5 space-y-3">
            <Link
              href="/"
              className={`flex items-center px-4 py-3.5 rounded-lg text-lg font-medium border-l-4 transition-all duration-200 ${
                isActive('/')
                  ? 'bg-purple-900/30 text-purple-300 border-purple-500'
                  : 'text-gray-300 hover:bg-gray-800 border-transparent hover:border-purple-500/50'
              }`}
              onClick={toggleMenu}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>

            <Link
              href="/demo"
              className={`flex items-center px-4 py-3.5 rounded-lg text-lg font-medium border-l-4 transition-all duration-200 ${
                isActive('/demo')
                  ? 'bg-purple-900/30 text-purple-300 border-purple-500'
                  : 'text-gray-300 hover:bg-gray-800 border-transparent hover:border-purple-500/50'
              }`}
              onClick={toggleMenu}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Trainer AI
            </Link>

            <Link
              href="/contact"
              className={`flex items-center px-4 py-3.5 rounded-lg text-lg font-medium border-l-4 transition-all duration-200 ${
                isActive('/contact')
                  ? 'bg-purple-900/30 text-purple-300 border-purple-500'
                  : 'text-gray-300 hover:bg-gray-800 border-transparent hover:border-purple-500/50'
              }`}
              onClick={toggleMenu}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
