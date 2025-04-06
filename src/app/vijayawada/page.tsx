"use client";

import Link from "next/link";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

export default function VijayawadaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-850 dark:to-gray-800">
      <JsonLd type="localBusiness" location="Vijayawada" />
      {/* Header/Navigation */}
      <NavBar />

      {/* Hero Section */}
      <main>
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 py-16 sm:py-24">
          <div className="relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                <div className="sm:text-center lg:text-left lg:col-span-6">
                  <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6 animate-fade-in-up">
                    <span className="block">Best Cybersecurity</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Training in Vijayawada</span>
                  </h1>
                  <div className="mt-6 animate-fade-in-up animation-delay-100">
                    <p className="text-lg md:text-xl leading-7 md:leading-8 text-gray-300 max-w-3xl">
                      Join Vijayawada's premier cybersecurity training program led by <span className="text-indigo-400 font-semibold">Goutham Kumar</span>, an industry expert with 8+ years of experience. Master ethical hacking, penetration testing, and network security with hands-on training.
                    </p>
                  </div>

                  <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
                    <Link
                      href="/contact"
                      className="group relative px-6 sm:px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 transform hover:-translate-y-1 overflow-hidden flex items-center justify-center w-full sm:w-auto"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600/50 to-purple-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative z-10 flex items-center font-semibold">Contact Now
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </Link>
                    <Link
                      href="#features"
                      className="group relative px-6 sm:px-8 py-4 border border-indigo-500 text-base font-medium rounded-xl text-indigo-300 hover:text-white bg-transparent hover:bg-indigo-600/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 transform hover:-translate-y-1 overflow-hidden flex items-center justify-center w-full sm:w-auto"
                    >
                      <span className="relative z-10 flex items-center font-semibold">Learn More
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </Link>
                  </div>

                  {/* Social share buttons removed from hero section */}
                </div>

                <div className="mt-12 relative lg:mt-0 lg:col-span-6 animate-fade-in animation-delay-200">
                  <div className="relative mx-auto max-w-md px-4 sm:max-w-2xl">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-transform duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-sm z-0"></div>
                      <div className="w-full h-[400px] md:h-[500px] bg-indigo-50 dark:bg-gray-800/50 rounded-2xl overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-72 h-72 md:w-96 md:h-96">
                            <div className="absolute inset-0 border-4 border-dashed border-indigo-500/30 dark:border-indigo-400/30 rounded-full animate-spin-slow"></div>
                            <div className="absolute inset-8 border-2 border-purple-500/40 dark:border-purple-400/40 rounded-full animate-reverse-spin"></div>
                            <div className="absolute inset-[-15px] border border-indigo-500/20 dark:border-indigo-400/20 rounded-full animate-spin-slower"></div>
                            <div className="absolute inset-[-30px] border border-purple-500/10 dark:border-purple-400/10 rounded-full animate-reverse-spin-slower"></div>

                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="relative w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/50 dark:shadow-indigo-700/50 overflow-hidden border-4 border-indigo-400/50">
                                <Image
                                  src="/images/trainers/goutham.png"
                                  alt="Goutham Kumar - Cybersecurity Expert in Vijayawada"
                                  className="w-full h-full object-cover"
                                  width={256}
                                  height={256}
                                  priority
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location-specific content */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                <span className="block">Cybersecurity Training in</span>
                <span className="block text-indigo-600 dark:text-indigo-400">Vijayawada</span>
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 mx-auto">
                Comprehensive cybersecurity training tailored for professionals and students in Vijayawada
              </p>
            </div>

            <div className="mt-10">
              <div className="prose prose-indigo dark:prose-invert max-w-none">
                <p>
                  Our cybersecurity training program in Vijayawada is designed to provide hands-on experience with real-world scenarios. Located in the heart of Vijayawada, our training center offers a convenient location for professionals and students looking to enhance their cybersecurity skills.
                </p>

                <h3>Why Choose Our Cybersecurity Training in Vijayawada?</h3>

                <ul>
                  <li><strong>Expert Trainer:</strong> Learn from Goutham Kumar, a cybersecurity expert with 8+ years of industry experience</li>
                  <li><strong>Hands-on Labs:</strong> Practice in real-world environments with our state-of-the-art lab facilities</li>
                  <li><strong>Comprehensive Curriculum:</strong> Cover ethical hacking, penetration testing, network security, and more</li>
                  <li><strong>Flexible Schedule:</strong> Weekend and evening batches available for working professionals</li>
                  <li><strong>Job Assistance:</strong> Get help with resume building and interview preparation</li>
                </ul>

                <h3>Popular Courses in Vijayawada</h3>

                <ul>
                  <li>Ethical Hacking and Penetration Testing</li>
                  <li>Network Security Fundamentals</li>
                  <li>Web Application Security</li>
                  <li>Mobile Application Security</li>
                  <li>Cloud Security</li>
                </ul>

                <p>
                  Join the growing cybersecurity community in Vijayawada and take your career to the next level. Our training programs are designed to help you build practical skills that are in high demand in today's job market.
                </p>

                <div className="mt-8 flex justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Contact Us for Training in Vijayawada
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
