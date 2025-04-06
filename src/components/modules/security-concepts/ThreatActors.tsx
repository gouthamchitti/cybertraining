import React from 'react';

const ThreatActors = () => {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Threat Actors</h3>
      
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Threat actors are individuals or groups that can adversely impact an organization's security. Understanding the different 
        types of threat actors and their motivations is crucial for effective security planning.
      </p>
      
      {/* Visual representation of Threat Actors */}
      <div className="flex justify-center mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
          {/* Nation-States */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-900 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-red-700 dark:text-red-300">Nation-States</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Government-sponsored groups with significant resources and sophisticated capabilities.
            </p>
            <div className="mt-3">
              <span className="text-xs font-medium text-red-700 dark:text-red-300">Motivation:</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">Espionage, sabotage, political advantage</span>
            </div>
            <div className="mt-1">
              <span className="text-xs font-medium text-red-700 dark:text-red-300">Threat Level:</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">Very High</span>
            </div>
          </div>
          
          {/* Cybercriminals */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-900 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-blue-700 dark:text-blue-300">Cybercriminals</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Individuals or groups motivated by financial gain.
            </p>
            <div className="mt-3">
              <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Motivation:</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">Financial profit, data theft, ransomware</span>
            </div>
            <div className="mt-1">
              <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Threat Level:</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">High</span>
            </div>
          </div>
          
          {/* Hacktivists */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-900 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-green-700 dark:text-green-300">Hacktivists</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Politically or socially motivated actors who use hacking to promote their cause.
            </p>
            <div className="mt-3">
              <span className="text-xs font-medium text-green-700 dark:text-green-300">Motivation:</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">Political/social change, publicity</span>
            </div>
            <div className="mt-1">
              <span className="text-xs font-medium text-green-700 dark:text-green-300">Threat Level:</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">Medium</span>
            </div>
          </div>
          
          {/* Insiders */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-900 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-yellow-700 dark:text-yellow-300">Insiders</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Current or former employees or contractors with legitimate access to systems.
            </p>
            <div className="mt-3">
              <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">Motivation:</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">Revenge, financial gain, whistleblowing</span>
            </div>
            <div className="mt-1">
              <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">Threat Level:</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">High (due to access)</span>
            </div>
          </div>
          
          {/* Script Kiddies */}
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-900 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-purple-700 dark:text-purple-300">Script Kiddies</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Inexperienced hackers using pre-written scripts or tools.
            </p>
            <div className="mt-3">
              <span className="text-xs font-medium text-purple-700 dark:text-purple-300">Motivation:</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">Thrill, curiosity, status</span>
            </div>
            <div className="mt-1">
              <span className="text-xs font-medium text-purple-700 dark:text-purple-300">Threat Level:</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">Low to Medium</span>
            </div>
          </div>
          
          {/* APT Groups */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 border border-indigo-200 dark:border-indigo-900 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-indigo-700 dark:text-indigo-300">APT Groups</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Advanced Persistent Threat groups with sophisticated capabilities for long-term operations.
            </p>
            <div className="mt-3">
              <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">Motivation:</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">Espionage, intellectual property theft</span>
            </div>
            <div className="mt-1">
              <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">Threat Level:</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">Very High</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Detailed explanations with stories */}
      <div className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Nation-States: The Digital Cold War</h4>
          
          <div className="prose dark:prose-invert max-w-none text-sm">
            <p>
              In 2020, a sophisticated supply chain attack was discovered affecting SolarWinds Orion software. The attackers, 
              later attributed to a nation-state actor, inserted malicious code into software updates that were then distributed 
              to thousands of organizations, including multiple U.S. government agencies.
            </p>
            
            <p>
              This attack demonstrated the hallmarks of nation-state threat actors:
            </p>
            
            <ul>
              <li><strong>Sophisticated techniques:</strong> The attackers used advanced methods to avoid detection for months.</li>
              <li><strong>Significant resources:</strong> The operation required substantial funding, expertise, and time.</li>
              <li><strong>Strategic targets:</strong> The focus was on high-value government and corporate targets.</li>
              <li><strong>Long-term objectives:</strong> The goal was persistent access for espionage rather than immediate financial gain.</li>
            </ul>
            
            <p>
              Nation-state actors typically have the backing of government resources, allowing them to conduct operations that may 
              take years to develop and execute. Their motivations are usually tied to national security interests, economic advantage, 
              or geopolitical objectives.
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Cybercriminals: Following the Money</h4>
          
          <div className="prose dark:prose-invert max-w-none text-sm">
            <p>
              In 2017, the WannaCry ransomware attack affected over 200,000 computers across 150 countries. The attackers exploited 
              a vulnerability in Windows systems to encrypt files and demand Bitcoin payments for decryption.
            </p>
            
            <p>
              This attack illustrated key characteristics of cybercriminal operations:
            </p>
            
            <ul>
              <li><strong>Financial motivation:</strong> The primary goal was monetary gain through ransom payments.</li>
              <li><strong>Opportunistic targeting:</strong> Rather than focusing on specific organizations, the attack spread widely to maximize potential victims.</li>
              <li><strong>Exploitation of known vulnerabilities:</strong> The attackers used existing tools rather than developing sophisticated zero-day exploits.</li>
              <li><strong>Anonymity:</strong> Cryptocurrency payments were demanded to maintain anonymity and avoid tracking.</li>
            </ul>
            
            <p>
              Cybercriminals range from loosely organized groups to sophisticated criminal enterprises with business-like structures. 
              Their tactics evolve based on profitability, with ransomware, data theft, and financial fraud being common approaches.
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Insiders: The Threat Within</h4>
          
          <div className="prose dark:prose-invert max-w-none text-sm">
            <p>
              A financial analyst at a large corporation became disgruntled after being passed over for promotion. Before resigning, 
              they downloaded sensitive financial forecasts and client information, which they later shared with a competitor in exchange 
              for a new position.
            </p>
            
            <p>
              This scenario highlights why insider threats are particularly dangerous:
            </p>
            
            <ul>
              <li><strong>Legitimate access:</strong> Insiders already have authorized access to systems and data.</li>
              <li><strong>Knowledge of systems:</strong> They understand the organization's security measures and potential weaknesses.</li>
              <li><strong>Trusted position:</strong> Their activities may not trigger the same alerts as external threats.</li>
              <li><strong>Various motivations:</strong> From financial gain to revenge or ideological reasons.</li>
            </ul>
            
            <p>
              Insider threats can be malicious (intentional harm) or negligent (accidental security violations). Detecting insider threats 
              often requires different approaches than external threats, such as behavior analytics and strict access controls.
            </p>
          </div>
        </div>
      </div>
      
      {/* Interactive Exercise */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-8">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Threat Actor Analysis: Case Studies</h4>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          For each scenario below, identify the most likely type of threat actor involved.
        </p>
        
        <div className="space-y-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
            <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Scenario 1:</h5>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              A company discovers that their intellectual property related to a new technology has been stolen. The attack was highly sophisticated, 
              targeted only specific research documents, and showed evidence of long-term network presence.
            </p>
            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>Select threat actor type</option>
              <option>Nation-State</option>
              <option>Cybercriminal</option>
              <option>Hacktivist</option>
              <option>Insider</option>
              <option>Script Kiddie</option>
              <option>APT Group</option>
            </select>
            <button className="mt-2 text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Check Answer
            </button>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
            <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Scenario 2:</h5>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              A company's website is defaced with messages protesting their environmental policies. The attackers also leaked internal 
              emails showing discussions about regulatory compliance issues.
            </p>
            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>Select threat actor type</option>
              <option>Nation-State</option>
              <option>Cybercriminal</option>
              <option>Hacktivist</option>
              <option>Insider</option>
              <option>Script Kiddie</option>
              <option>APT Group</option>
            </select>
            <button className="mt-2 text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Check Answer
            </button>
          </div>
        </div>
      </div>
      
      {/* Mind Map */}
      <div className="mt-8">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Threat Actors Mind Map</h4>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex justify-center">
            <div className="relative w-full max-w-3xl">
              {/* Mind map visualization */}
              <div className="flex justify-center items-center mb-6">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-4 text-center w-32 h-32 flex items-center justify-center border-2 border-gray-500">
                  <span className="text-gray-800 dark:text-gray-200 font-bold">Threat Actors</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-2 text-center w-full flex items-center justify-center border-2 border-red-500 h-16">
                    <span className="text-red-800 dark:text-red-300 font-bold">Nation-States</span>
                  </div>
                  <div className="mt-2 space-y-1 w-full">
                    <div className="bg-red-50 dark:bg-red-900/10 p-1 rounded text-xs text-center text-red-700 dark:text-red-300">Espionage</div>
                    <div className="bg-red-50 dark:bg-red-900/10 p-1 rounded text-xs text-center text-red-700 dark:text-red-300">Political Gain</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-2 text-center w-full flex items-center justify-center border-2 border-blue-500 h-16">
                    <span className="text-blue-800 dark:text-blue-300 font-bold">Cybercriminals</span>
                  </div>
                  <div className="mt-2 space-y-1 w-full">
                    <div className="bg-blue-50 dark:bg-blue-900/10 p-1 rounded text-xs text-center text-blue-700 dark:text-blue-300">Financial Gain</div>
                    <div className="bg-blue-50 dark:bg-blue-900/10 p-1 rounded text-xs text-center text-blue-700 dark:text-blue-300">Data Theft</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-2 text-center w-full flex items-center justify-center border-2 border-green-500 h-16">
                    <span className="text-green-800 dark:text-green-300 font-bold">Hacktivists</span>
                  </div>
                  <div className="mt-2 space-y-1 w-full">
                    <div className="bg-green-50 dark:bg-green-900/10 p-1 rounded text-xs text-center text-green-700 dark:text-green-300">Political Cause</div>
                    <div className="bg-green-50 dark:bg-green-900/10 p-1 rounded text-xs text-center text-green-700 dark:text-green-300">Public Awareness</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-2 text-center w-full flex items-center justify-center border-2 border-yellow-500 h-16">
                    <span className="text-yellow-800 dark:text-yellow-300 font-bold">Insiders</span>
                  </div>
                  <div className="mt-2 space-y-1 w-full">
                    <div className="bg-yellow-50 dark:bg-yellow-900/10 p-1 rounded text-xs text-center text-yellow-700 dark:text-yellow-300">Revenge</div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/10 p-1 rounded text-xs text-center text-yellow-700 dark:text-yellow-300">Financial Gain</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-2 text-center w-full flex items-center justify-center border-2 border-purple-500 h-16">
                    <span className="text-purple-800 dark:text-purple-300 font-bold">Script Kiddies</span>
                  </div>
                  <div className="mt-2 space-y-1 w-full">
                    <div className="bg-purple-50 dark:bg-purple-900/10 p-1 rounded text-xs text-center text-purple-700 dark:text-purple-300">Curiosity</div>
                    <div className="bg-purple-50 dark:bg-purple-900/10 p-1 rounded text-xs text-center text-purple-700 dark:text-purple-300">Status</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-lg p-2 text-center w-full flex items-center justify-center border-2 border-indigo-500 h-16">
                    <span className="text-indigo-800 dark:text-indigo-300 font-bold">APT Groups</span>
                  </div>
                  <div className="mt-2 space-y-1 w-full">
                    <div className="bg-indigo-50 dark:bg-indigo-900/10 p-1 rounded text-xs text-center text-indigo-700 dark:text-indigo-300">Espionage</div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/10 p-1 rounded text-xs text-center text-indigo-700 dark:text-indigo-300">IP Theft</div>
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

export default ThreatActors;
