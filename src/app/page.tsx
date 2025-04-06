import Link from "next/link";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <JsonLd type="organization" />
      {/* Header/Navigation */}
      <NavBar />

      {/* Hero Section */}
      <main>
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-gray-900 to-purple-950">
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-10"></div>
            <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-purple-600/20 rounded-full filter blur-3xl opacity-30 transform translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-indigo-600/20 rounded-full filter blur-3xl opacity-30 transform -translate-x-1/4 translate-y-1/4"></div>
            <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-to-r from-purple-600/10 to-indigo-600/10 animate-pulse-slow transform -translate-x-1/2 -translate-y-1/2"></div>

            {/* Floating particles */}
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white opacity-30"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.floor(Math.random() * 10) + 5}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              ></div>
            ))}
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28 relative z-10">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                <div className="sm:text-center lg:text-left lg:col-span-6">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-600/20 text-indigo-300 mb-4 animate-fade-in">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Trained by Goutham Kumar
                  </div>
                  <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6 animate-fade-in-up">
                    <span className="block">Master the Art of</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Cyber Defense</span>
                  </h1>
                  <div className="mt-6 animate-fade-in-up animation-delay-100">
                    <p className="text-lg md:text-xl leading-7 md:leading-8 text-gray-300 max-w-3xl">
                      Training led by <span className="text-indigo-400 font-semibold">Goutham Kumar</span>, a cybersecurity expert with real-world experience defending against sophisticated threats. Gain access to advanced techniques and methodologies not taught in conventional programs.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 animate-fade-in-up animation-delay-200">
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/20">
                      <p className="text-3xl font-bold text-white">8<span className="text-indigo-400">+</span></p>
                      <p className="text-sm text-gray-400">Years Experience</p>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/20">
                      <p className="text-3xl font-bold text-white">160<span className="text-indigo-400">+</span></p>
                      <p className="text-sm text-gray-400">Professionals Trained</p>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/20">
                      <p className="text-3xl font-bold text-white">6<span className="text-indigo-400">+</span></p>
                      <p className="text-sm text-gray-400">Industry Certifications</p>
                    </div>
                  </div>

                  <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
                    <Link
                      href="/contact"
                      className="group relative px-6 sm:px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 transform hover:-translate-y-1 overflow-hidden flex items-center justify-center w-full sm:w-auto"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600/50 to-purple-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative z-10 flex items-center font-semibold">Get Started
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </Link>
                    <Link
                      href="#features"
                      className="group relative px-6 sm:px-8 py-4 border border-indigo-500 text-base font-medium rounded-xl text-indigo-300 hover:text-white bg-transparent hover:bg-indigo-600/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 transform hover:-translate-y-1 overflow-hidden flex items-center justify-center w-full sm:w-auto"
                    >
                      <span className="relative z-10 flex items-center font-semibold">Explore Features
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
                        {/* Animated cyber security elements */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-72 h-72 md:w-96 md:h-96">
                            {/* Outer ring */}
                            <div className="absolute inset-0 border-4 border-dashed border-indigo-500/30 dark:border-indigo-400/30 rounded-full animate-spin-slow"></div>

                            {/* Middle ring */}
                            <div className="absolute inset-8 border-2 border-purple-500/40 dark:border-purple-400/40 rounded-full animate-reverse-spin"></div>

                            {/* Additional outer rings for matrix effect */}
                            <div className="absolute inset-[-15px] border border-indigo-500/20 dark:border-indigo-400/20 rounded-full animate-spin-slower"></div>
                            <div className="absolute inset-[-30px] border border-purple-500/10 dark:border-purple-400/10 rounded-full animate-reverse-spin-slower"></div>

                            {/* Inner photo */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="relative w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/50 dark:shadow-indigo-700/50 overflow-hidden border-4 border-indigo-400/50">
                                <Image
                                  src="/images/trainers/goutham.png"
                                  alt="Goutham Kumar - Cybersecurity Expert"
                                  className="w-full h-full object-cover"
                                  width={256}
                                  height={256}
                                  priority
                                />
                              </div>
                            </div>

                            {/* Floating elements - more of them */}
                            <div className="absolute top-0 left-1/4 w-6 h-6 bg-blue-500 rounded-full opacity-70 animate-float"></div>
                            <div className="absolute bottom-8 right-8 w-4 h-4 bg-green-500 rounded-full opacity-70 animate-float-delay"></div>
                            <div className="absolute top-1/3 right-0 w-5 h-5 bg-purple-500 rounded-full opacity-70 animate-float-slow"></div>
                            <div className="absolute bottom-0 left-1/3 w-3 h-3 bg-yellow-500 rounded-full opacity-70 animate-float-delay-slow"></div>
                            <div className="absolute top-1/4 right-1/4 w-5 h-5 bg-indigo-500 rounded-full opacity-70 animate-float"></div>
                            <div className="absolute bottom-1/4 left-0 w-4 h-4 bg-purple-500 rounded-full opacity-70 animate-float-delay"></div>
                            <div className="absolute top-0 right-1/3 w-3 h-3 bg-cyan-500 rounded-full opacity-70 animate-float-slow"></div>
                            <div className="absolute bottom-1/3 right-1/4 w-5 h-5 bg-indigo-500 rounded-full opacity-70 animate-float-delay-slow"></div>
                          </div>
                        </div>

                        {/* Matrix code overlay - enhanced */}
                        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none select-none">
                          <div className="text-[8px] font-mono leading-tight">
                            {Array.from({ length: 50 }).map((_, i) => (
                              <div key={i} className="whitespace-nowrap">
                                {Array.from({ length: 100 }).map((_, j) => {
                                  const randomChar = () => {
                                    const chars = '01αβγδεζηθικλμνξοπρστυφχψω¥$€¢£¤¦§©®™°±×÷←→↑↓⌂■□▲►▼◄';
                                    return chars[Math.floor(Math.random() * chars.length)];
                                  };
                                  const colorClass = Math.random() > 0.95
                                    ? 'text-green-400'
                                    : Math.random() > 0.9
                                      ? 'text-indigo-400'
                                      : 'text-indigo-600 dark:text-indigo-400';
                                  return (
                                    <span key={j} className={colorClass} style={{
                                      opacity: Math.random() * 0.9 + 0.1,
                                      animation: Math.random() > 0.98 ? `pulse ${Math.floor(Math.random() * 3) + 1}s infinite` : 'none'
                                    }}>
                                      {randomChar()}
                                    </span>
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Terminal overlay - enhanced */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm p-4 border-t border-indigo-500/30 font-mono text-xs text-gray-300">
                          <div className="flex items-center justify-between mb-2 border-b border-indigo-500/20 pb-1">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-red-500 mr-1.5"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1.5"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="text-center text-xs text-gray-400">cybersec-terminal ~ goutham@securenet</div>
                            <div className="w-4"></div>
                          </div>
                          <div className="space-y-2 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-800">
                            <div className="flex items-center">
                              <span className="text-indigo-400 mr-2">$</span>
                              <span className="typing-animation">sudo nmap -sS -sV -O 192.168.1.0/24</span>
                            </div>
                            <div className="flex items-start">
                              <span className="text-gray-500 mr-2">|</span>
                              <div className="flex-1">
                                <div>Starting Nmap scan at {new Date().toLocaleTimeString()}</div>
                                <div className="text-indigo-300">Scanning 256 hosts...</div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className="text-yellow-400 mr-2">!</span>
                              <span>Found 7 active hosts, 3 with potential vulnerabilities</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-indigo-400 mr-2">$</span>
                              <span className="typing-animation">sudo metasploit framework</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-red-400 mr-2">msf6</span>
                              <span>{">"}use exploit/multi/handler</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-red-400 mr-2">msf6</span>
                              <span>{">"}set PAYLOAD windows/meterpreter/reverse_tcp</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-green-400 mr-2">+</span>
                              <span>Deploying IDS and firewall rules</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-indigo-400 mr-2">$</span>
                              <span className="typing-animation">deploying countermeasures...</span>
                            </div>
                            <div className="flex items-center text-green-400">
                              <span className="mr-2">✓</span>
                              <span>Network secured | Training simulation complete</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Trainer credentials section */}
                    <div className="mt-8 text-center">
                      <p className="text-sm font-medium text-gray-400 mb-4">Your Trainer: Goutham Kumar</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300">
                          <div className="flex items-center justify-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-xs font-medium text-gray-300">8+ Years Experience</p>
                        </div>
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300">
                          <div className="flex items-center justify-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </div>
                          <p className="text-xs font-medium text-gray-300">Certified Expert</p>
                        </div>
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300">
                          <div className="flex items-center justify-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <p className="text-xs font-medium text-gray-300">Industry Author</p>
                        </div>
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300">
                          <div className="flex items-center justify-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <p className="text-xs font-medium text-gray-300">Enterprise Consultant</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 bg-gradient-to-b from-slate-100 to-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-5 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-indigo-500 blur-3xl"></div>
            <div className="absolute top-1/2 -left-24 w-96 h-96 rounded-full bg-purple-500 blur-3xl"></div>
            <div className="absolute -bottom-24 right-1/3 w-96 h-96 rounded-full bg-blue-500 blur-3xl"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full mb-4">Features</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                Elite Cybersecurity Training for Professionals
              </h2>
              <div className="mt-4 max-w-3xl mx-auto">
                <p className="text-xl text-gray-600">
                  Our exclusive platform delivers advanced training with industry-leading experts and cutting-edge tools for serious cybersecurity professionals.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Feature 1 */}
              <div className="relative p-8 bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-100 text-indigo-600 mb-6 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-indigo-200 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                    Advanced Simulation Training
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Master cybersecurity skills through enterprise-grade simulations of real-world threats and attack scenarios used by industry leaders.
                  </p>

                </div>
              </div>

              {/* Feature 2 */}
              <div className="relative p-8 bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 text-blue-600 mb-6 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-blue-200 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    Exclusive Curriculum
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Access our proprietary curriculum developed by industry leaders, covering advanced techniques not found in standard training programs.
                  </p>

                </div>
              </div>

              {/* Feature 3 */}
              <div className="relative p-8 bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-green-100 text-green-600 mb-6 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-green-200 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                    Enterprise-Grade Labs
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Train in our custom-built environments that replicate enterprise infrastructure, allowing you to practice advanced techniques in realistic scenarios.
                  </p>

                </div>
              </div>

              {/* Feature 4 */}
              <div className="relative p-8 bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-purple-100 text-purple-600 mb-6 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-purple-200 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                    Elite Instructors
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Train with world-class cybersecurity experts who have protected Fortune 500 companies and government agencies from sophisticated threats.
                  </p>
                  <a href="#trainer-section" className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800">
                    Meet our trainer
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300">
                      <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trainer Section */}
        <div id="trainer-section" className="py-24 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-indigo-600/20 rounded-full filter blur-3xl opacity-30 transform translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-purple-600/20 rounded-full filter blur-3xl opacity-30 transform -translate-x-1/4 translate-y-1/4"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-400 bg-indigo-900/30 rounded-full mb-4">Meet Your Trainer</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                Learn from <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Industry Expert</span>
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-300">
                Gain insights and skills from a seasoned cybersecurity professional with real-world experience
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-gray-700/50 hover:border-indigo-500/30 transition-all duration-500">
              <div className="md:flex">
                {/* Trainer Image */}
                <div className="md:w-1/3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 z-10"></div>
                  <Image
                    src="/images/trainers/goutham.png"
                    alt="Goutham Kumar"
                    className="w-full h-full object-cover object-center"
                    width={400}
                    height={600}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-32 z-20"></div>
                </div>

                {/* Trainer Info */}
                <div className="md:w-2/3 p-8 md:p-10">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Goutham Kumar</h3>
                      <p className="text-indigo-400 font-medium mb-6">Lead Cybersecurity Trainer</p>

                      <p className="text-gray-300 mb-6 leading-relaxed">
                        Cybersecurity professional with expertise in penetration testing, vulnerability assessment, and security architecture. Passionate about teaching and mentoring the next generation of cybersecurity experts.
                      </p>

                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-white mb-3">Areas of Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          {["Penetration Testing", "Vulnerability Assessment", "Security Architecture", "Ethical Hacking", "Network Security"].map((skill, index) => (
                            <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-900/50 text-indigo-300 border border-indigo-700/50">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3">Experience</h4>
                          <div className="space-y-3">
                            <div>
                              <p className="font-medium text-indigo-300">Cybersecurity Consultant</p>
                              <p className="text-sm text-gray-400">Leading Security Firm (2021 - Present)</p>
                            </div>
                            <div>
                              <p className="font-medium text-indigo-300">Security Analyst</p>
                              <p className="text-sm text-gray-400">(2017- 2021)</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3">Certifications</h4>
                          <ul className="space-y-1 text-gray-300">
                            <li className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                              CEH
                            </li>
                            <li className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                              CompTIA Security+
                            </li>
                            <li className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                              OSCP
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center space-x-4">
                        <a href="mailto:goutham@cybertrainer.in" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300" title="Email Goutham Kumar" aria-label="Email Goutham Kumar">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/chittigouthamkumar/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300" title="Connect with Goutham Kumar on LinkedIn" aria-label="Connect with Goutham Kumar on LinkedIn">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      </div>
                      <Link href="/contact" className="inline-flex items-center px-4 py-2 border border-indigo-500 text-sm font-medium rounded-md text-indigo-400 bg-transparent hover:bg-indigo-900/30 transition-colors duration-300">
                        Contact for Training
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content Section */}
        <div className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-850 dark:to-gray-800 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">Course Content</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Cybersecurity Curriculum</span>
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300">
                Master essential cybersecurity skills with our structured learning path
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Course Module 1 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700 flex flex-col">
                <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                <div className="p-6 flex-1">

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Security Foundations</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Master the core concepts of cybersecurity including network security, cryptography, and security frameworks.</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">Network Security Principles</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">Cryptography Basics</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">Security Frameworks & Compliance</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Course Module 2 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700 flex flex-col">
                <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                <div className="p-6 flex-1">

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Offensive Security</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Learn ethical hacking techniques, penetration testing methodologies, and vulnerability assessment.</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">Penetration Testing Methodology</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">Vulnerability Assessment</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">Exploitation Techniques</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Course Module 3 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700 flex flex-col">
                <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                <div className="p-6 flex-1">

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Defensive Security</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Develop skills in incident response, threat hunting, and security operations center (SOC) management.</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">Incident Response</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">Threat Hunting</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">SOC Operations</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>


      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
