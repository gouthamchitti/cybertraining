import React from 'react';

const NISTFramework = () => {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">NIST Cybersecurity Framework</h3>
      
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        The NIST Cybersecurity Framework (CSF) provides a policy framework of computer security guidance for how private sector organizations 
        can assess and improve their ability to prevent, detect, and respond to cyber attacks.
      </p>
      
      {/* Visual representation of NIST Framework */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-3xl">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {/* Identify */}
            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3 w-40 h-40 flex flex-col items-center justify-center border-2 border-blue-500 transition-transform hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <span className="text-blue-800 dark:text-blue-300 font-bold text-center">Identify</span>
              <span className="text-xs text-blue-600 dark:text-blue-400 text-center mt-1">Asset Management, Risk Assessment</span>
            </div>
            
            {/* Protect */}
            <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3 w-40 h-40 flex flex-col items-center justify-center border-2 border-green-500 transition-transform hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-green-800 dark:text-green-300 font-bold text-center">Protect</span>
              <span className="text-xs text-green-600 dark:text-green-400 text-center mt-1">Access Control, Training, Data Security</span>
            </div>
            
            {/* Detect */}
            <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-3 w-40 h-40 flex flex-col items-center justify-center border-2 border-yellow-500 transition-transform hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-yellow-800 dark:text-yellow-300 font-bold text-center">Detect</span>
              <span className="text-xs text-yellow-600 dark:text-yellow-400 text-center mt-1">Anomalies, Monitoring, Detection</span>
            </div>
            
            {/* Respond */}
            <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-3 w-40 h-40 flex flex-col items-center justify-center border-2 border-red-500 transition-transform hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="text-red-800 dark:text-red-300 font-bold text-center">Respond</span>
              <span className="text-xs text-red-600 dark:text-red-400 text-center mt-1">Response Planning, Communications</span>
            </div>
            
            {/* Recover */}
            <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-3 w-40 h-40 flex flex-col items-center justify-center border-2 border-purple-500 transition-transform hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <span className="text-purple-800 dark:text-purple-300 font-bold text-center">Recover</span>
              <span className="text-xs text-purple-600 dark:text-purple-400 text-center mt-1">Recovery Planning, Improvements</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Detailed explanation of each function */}
      <div className="space-y-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded">
          <h4 className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-2">Identify</h4>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            Develop an organizational understanding to manage cybersecurity risk to systems, people, assets, data, and capabilities.
          </p>
          
          <div className="mb-3">
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Real-world example:</h5>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              "A retail company conducts a comprehensive inventory of all hardware, software, and data assets. They classify each asset 
              based on its criticality to business operations and identify potential vulnerabilities and threats to those assets."
            </p>
          </div>
          
          <div className="text-sm">
            <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Key activities include:</h5>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
              <li>Asset management</li>
              <li>Business environment analysis</li>
              <li>Governance establishment</li>
              <li>Risk assessment</li>
              <li>Risk management strategy</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded">
          <h4 className="text-lg font-medium text-green-700 dark:text-green-300 mb-2">Protect</h4>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            Develop and implement appropriate safeguards to ensure delivery of critical services.
          </p>
          
          <div className="mb-3">
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Real-world example:</h5>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              "A financial institution implements multi-factor authentication for all employee accounts, encrypts sensitive customer data, 
              and conducts regular security awareness training for all staff to prevent phishing attacks."
            </p>
          </div>
          
          <div className="text-sm">
            <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Key activities include:</h5>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
              <li>Access control implementation</li>
              <li>Security awareness training</li>
              <li>Data security measures</li>
              <li>Information protection processes</li>
              <li>Protective technology deployment</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded">
          <h4 className="text-lg font-medium text-yellow-700 dark:text-yellow-300 mb-2">Detect</h4>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            Develop and implement appropriate activities to identify the occurrence of a cybersecurity event.
          </p>
          
          <div className="mb-3">
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Real-world example:</h5>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              "A technology company implements a Security Information and Event Management (SIEM) system that continuously monitors network 
              traffic and system logs. The system is configured to alert security personnel when unusual patterns are detected, such as 
              multiple failed login attempts or unexpected data transfers."
            </p>
          </div>
          
          <div className="text-sm">
            <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Key activities include:</h5>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
              <li>Anomaly and event detection</li>
              <li>Continuous security monitoring</li>
              <li>Detection processes</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
          <h4 className="text-lg font-medium text-red-700 dark:text-red-300 mb-2">Respond</h4>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            Develop and implement appropriate activities to take action regarding a detected cybersecurity incident.
          </p>
          
          <div className="mb-3">
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Real-world example:</h5>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              "When a healthcare organization detects unauthorized access to patient records, they activate their incident response plan. 
              This includes isolating affected systems, investigating the breach, notifying affected parties as required by law, and 
              coordinating with law enforcement."
            </p>
          </div>
          
          <div className="text-sm">
            <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Key activities include:</h5>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
              <li>Response planning</li>
              <li>Communications coordination</li>
              <li>Analysis of incidents</li>
              <li>Mitigation actions</li>
              <li>Improvements to response processes</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4 rounded">
          <h4 className="text-lg font-medium text-purple-700 dark:text-purple-300 mb-2">Recover</h4>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            Develop and implement appropriate activities to maintain plans for resilience and to restore any capabilities or services 
            that were impaired due to a cybersecurity incident.
          </p>
          
          <div className="mb-3">
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Real-world example:</h5>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              "After experiencing a ransomware attack, an e-commerce company activates its business continuity plan, restoring systems 
              from clean backups. They also conduct a post-incident review to identify how the attack occurred and implement additional 
              safeguards to prevent similar incidents in the future."
            </p>
          </div>
          
          <div className="text-sm">
            <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Key activities include:</h5>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
              <li>Recovery planning</li>
              <li>Recovery strategy implementation</li>
              <li>Improvements based on lessons learned</li>
              <li>Communications during recovery</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Interactive Exercise */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-8">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">NIST Framework in Action: Scenario Analysis</h4>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          For each security control below, identify which NIST CSF function it primarily supports.
        </p>
        
        <div className="space-y-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
            <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">1. Implementing a firewall</h5>
            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>Select a function</option>
              <option>Identify</option>
              <option>Protect</option>
              <option>Detect</option>
              <option>Respond</option>
              <option>Recover</option>
            </select>
            <button className="mt-2 text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Check Answer
            </button>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
            <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">2. Setting up intrusion detection systems</h5>
            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>Select a function</option>
              <option>Identify</option>
              <option>Protect</option>
              <option>Detect</option>
              <option>Respond</option>
              <option>Recover</option>
            </select>
            <button className="mt-2 text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Check Answer
            </button>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
            <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">3. Creating an incident response plan</h5>
            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>Select a function</option>
              <option>Identify</option>
              <option>Protect</option>
              <option>Detect</option>
              <option>Respond</option>
              <option>Recover</option>
            </select>
            <button className="mt-2 text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Check Answer
            </button>
          </div>
        </div>
      </div>
      
      {/* Mind Map */}
      <div className="mt-8">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">NIST Framework Mind Map</h4>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex justify-center">
            <div className="relative w-full max-w-3xl">
              {/* Mind map visualization */}
              <div className="flex justify-center items-center mb-4">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-full p-4 text-center w-40 h-40 flex items-center justify-center border-2 border-indigo-500">
                  <span className="text-indigo-800 dark:text-indigo-300 font-bold">NIST Cybersecurity Framework</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-2 text-center w-full flex items-center justify-center border-2 border-blue-500 h-16">
                    <span className="text-blue-800 dark:text-blue-300 font-bold">Identify</span>
                  </div>
                  <div className="mt-2 space-y-1 w-full">
                    <div className="bg-blue-50 dark:bg-blue-900/10 p-1 rounded text-xs text-center text-blue-700 dark:text-blue-300">Asset Management</div>
                    <div className="bg-blue-50 dark:bg-blue-900/10 p-1 rounded text-xs text-center text-blue-700 dark:text-blue-300">Risk Assessment</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-2 text-center w-full flex items-center justify-center border-2 border-green-500 h-16">
                    <span className="text-green-800 dark:text-green-300 font-bold">Protect</span>
                  </div>
                  <div className="mt-2 space-y-1 w-full">
                    <div className="bg-green-50 dark:bg-green-900/10 p-1 rounded text-xs text-center text-green-700 dark:text-green-300">Access Control</div>
                    <div className="bg-green-50 dark:bg-green-900/10 p-1 rounded text-xs text-center text-green-700 dark:text-green-300">Training</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-2 text-center w-full flex items-center justify-center border-2 border-yellow-500 h-16">
                    <span className="text-yellow-800 dark:text-yellow-300 font-bold">Detect</span>
                  </div>
                  <div className="mt-2 space-y-1 w-full">
                    <div className="bg-yellow-50 dark:bg-yellow-900/10 p-1 rounded text-xs text-center text-yellow-700 dark:text-yellow-300">Monitoring</div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/10 p-1 rounded text-xs text-center text-yellow-700 dark:text-yellow-300">Anomalies</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-2 text-center w-full flex items-center justify-center border-2 border-red-500 h-16">
                    <span className="text-red-800 dark:text-red-300 font-bold">Respond</span>
                  </div>
                  <div className="mt-2 space-y-1 w-full">
                    <div className="bg-red-50 dark:bg-red-900/10 p-1 rounded text-xs text-center text-red-700 dark:text-red-300">Planning</div>
                    <div className="bg-red-50 dark:bg-red-900/10 p-1 rounded text-xs text-center text-red-700 dark:text-red-300">Communications</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-2 text-center w-full flex items-center justify-center border-2 border-purple-500 h-16">
                    <span className="text-purple-800 dark:text-purple-300 font-bold">Recover</span>
                  </div>
                  <div className="mt-2 space-y-1 w-full">
                    <div className="bg-purple-50 dark:bg-purple-900/10 p-1 rounded text-xs text-center text-purple-700 dark:text-purple-300">Restoration</div>
                    <div className="bg-purple-50 dark:bg-purple-900/10 p-1 rounded text-xs text-center text-purple-700 dark:text-purple-300">Improvements</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NISTFramework;
