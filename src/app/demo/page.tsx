"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AIAssistant from "@/components/AIAssistant";
import CybersecurityResources from "@/components/CybersecurityResources";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

export default function DemoPage() {
  const [showAI, setShowAI] = useState(true);
  const [aiError, setAIError] = useState(false);

  // Function to handle AI errors
  const handleAIError = () => {
    setAIError(true);
    setShowAI(false);
  };

  // Function to toggle between AI and resources
  const toggleView = () => {
    setShowAI(!showAI);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <JsonLd type="course" courseName="Cybersecurity Training with AI Assistant" courseDescription="Interactive cybersecurity training with our AI assistant. Learn ethical hacking, penetration testing, and network security with hands-on guidance." />
      <NavBar />

      {/* Main Content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              {showAI ? "Try Our AI-Powered Cybersecurity Assistant" : "Cybersecurity Learning Resources"}
            </h1>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
              {showAI
                ? "Experience how our AI assistant can help you learn cybersecurity concepts, get practical tips, practice with questions, and analyze security scenarios."
                : "Explore these valuable resources to enhance your cybersecurity knowledge and skills."}
            </p>

            {!aiError && (
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={toggleView}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {showAI ? "View Learning Resources" : "Try AI Assistant"}
                </button>

                {/* Training Dashboard link removed */}
              </div>
            )}
          </div>

          <div className="mt-10">
            {showAI ? <AIAssistant /> : <CybersecurityResources />}
          </div>

          <div className="mt-16 bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                How Our AI Assistant Enhances Your Learning
              </h2>

            </div>
            <div className="border-t border-gray-200 dark:border-gray-700">
              <dl>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Get Cybersecurity Tips
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    Receive practical, actionable cybersecurity tips on any topic, from password security to phishing prevention.
                  </dd>
                </div>
                <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Explain Cybersecurity Concepts
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    Get clear, beginner-friendly explanations of complex cybersecurity concepts and terminology.
                  </dd>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Practice with Questions
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    Generate custom practice questions at your preferred difficulty level to test your knowledge.
                  </dd>
                </div>
                <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Analyze Security Scenarios
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    Describe a security scenario and receive analysis, recommendations, and best practices.
                  </dd>
                </div>
              </dl>
            </div>
          </div>


        </div>
      </main>

      <Footer />
    </div>
  );
}
