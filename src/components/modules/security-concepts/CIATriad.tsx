import React from 'react';
import Image from 'next/image';

const CIATriad = () => {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">The CIA Triad</h3>
      
      {/* Visual representation of CIA Triad */}
      <div className="flex justify-center mb-6">
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon 
                points="50,10 90,80 10,80" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                className="text-indigo-500 dark:text-indigo-400"
              />
              
              {/* Confidentiality */}
              <circle cx="50" cy="10" r="8" className="fill-blue-500" />
              <text x="50" y="10" textAnchor="middle" dy=".3em" className="fill-white text-xs font-bold">C</text>
              
              {/* Integrity */}
              <circle cx="90" cy="80" r="8" className="fill-green-500" />
              <text x="90" y="80" textAnchor="middle" dy=".3em" className="fill-white text-xs font-bold">I</text>
              
              {/* Availability */}
              <circle cx="10" cy="80" r="8" className="fill-red-500" />
              <text x="10" y="80" textAnchor="middle" dy=".3em" className="fill-white text-xs font-bold">A</text>
            </svg>
          </div>
        </div>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        The CIA triad is a model designed to guide policies for information security within an organization. 
        It represents the three most crucial components of information security.
      </p>
      
      {/* Confidentiality Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-4 rounded">
        <h4 className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-2">Confidentiality</h4>
        <p className="text-gray-700 dark:text-gray-300 mb-3">
          Ensuring that information is not disclosed to unauthorized individuals, entities, or processes.
        </p>
        
        <div className="mb-3">
          <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Real-world example:</h5>
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            "A hospital implements strict access controls to ensure that only authorized medical staff can view patient records. 
            When a celebrity is admitted, the hospital uses special access logs to track who views the records to prevent unauthorized access by curious staff members."
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Implemented through:</h5>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
              <li>Encryption</li>
              <li>Access controls</li>
              <li>Authentication</li>
              <li>Data classification</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-1">When breached:</h5>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
              <li>Data leaks</li>
              <li>Privacy violations</li>
              <li>Identity theft</li>
              <li>Compliance failures</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Integrity Section */}
      <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 mb-4 rounded">
        <h4 className="text-lg font-medium text-green-700 dark:text-green-300 mb-2">Integrity</h4>
        <p className="text-gray-700 dark:text-gray-300 mb-3">
          Maintaining and assuring the accuracy and completeness of data over its entire lifecycle.
        </p>
        
        <div className="mb-3">
          <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Real-world example:</h5>
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            "A bank uses checksums and verification processes to ensure that when money is transferred between accounts, 
            the exact amount is debited from one account and credited to another. Any discrepancy triggers an immediate alert and investigation."
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Implemented through:</h5>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
              <li>Hashing</li>
              <li>Digital signatures</li>
              <li>Version control</li>
              <li>Checksums</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-1">When breached:</h5>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
              <li>Data corruption</li>
              <li>Unauthorized changes</li>
              <li>System malfunctions</li>
              <li>Loss of trust</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Availability Section */}
      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-4 rounded">
        <h4 className="text-lg font-medium text-red-700 dark:text-red-300 mb-2">Availability</h4>
        <p className="text-gray-700 dark:text-gray-300 mb-3">
          Ensuring that information is accessible to authorized users when needed.
        </p>
        
        <div className="mb-3">
          <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Real-world example:</h5>
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            "An e-commerce company implements redundant servers across multiple geographic locations to ensure that 
            their website remains operational even if one data center experiences an outage. This is critical during high-traffic 
            sales events when any downtime would result in significant revenue loss."
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Implemented through:</h5>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
              <li>Redundancy</li>
              <li>Backups</li>
              <li>Disaster recovery</li>
              <li>Load balancing</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-1">When breached:</h5>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
              <li>Service outages</li>
              <li>Business disruption</li>
              <li>Revenue loss</li>
              <li>Reputation damage</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Interactive Simulation */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-6">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">CIA Triad in Action: Interactive Scenario</h4>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Imagine you're the security officer for a financial institution. For each scenario below, identify which component(s) 
          of the CIA triad is primarily affected and what security controls you would implement.
        </p>
        
        <div className="space-y-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
            <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Scenario 1: Customer Data Breach</h5>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Your bank discovers that an employee has been accessing and selling customer financial data to identity thieves.
            </p>
            <div className="flex space-x-4 mb-3">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Confidentiality</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Integrity</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Availability</span>
              </label>
            </div>
            <button className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Show Answer
            </button>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
            <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Scenario 2: Ransomware Attack</h5>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Your systems have been infected with ransomware that has encrypted critical financial databases, making them inaccessible.
            </p>
            <div className="flex space-x-4 mb-3">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Confidentiality</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Integrity</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Availability</span>
              </label>
            </div>
            <button className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Show Answer
            </button>
          </div>
        </div>
      </div>
      
      {/* Mind Map */}
      <div className="mt-8">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">CIA Triad Mind Map</h4>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex justify-center">
            <div className="relative w-full max-w-2xl">
              {/* Mind map visualization */}
              <div className="flex justify-center items-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-4 text-center w-32 h-32 flex items-center justify-center border-2 border-purple-500">
                  <span className="text-purple-800 dark:text-purple-300 font-bold">CIA Triad</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-3 text-center w-24 h-24 flex items-center justify-center border-2 border-blue-500">
                    <span className="text-blue-800 dark:text-blue-300 font-bold">Confidentiality</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="bg-blue-50 dark:bg-blue-900/10 p-1 rounded text-xs text-center text-blue-700 dark:text-blue-300">Encryption</div>
                    <div className="bg-blue-50 dark:bg-blue-900/10 p-1 rounded text-xs text-center text-blue-700 dark:text-blue-300">Access Control</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3 text-center w-24 h-24 flex items-center justify-center border-2 border-green-500">
                    <span className="text-green-800 dark:text-green-300 font-bold">Integrity</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="bg-green-50 dark:bg-green-900/10 p-1 rounded text-xs text-center text-green-700 dark:text-green-300">Hashing</div>
                    <div className="bg-green-50 dark:bg-green-900/10 p-1 rounded text-xs text-center text-green-700 dark:text-green-300">Digital Signatures</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-3 text-center w-24 h-24 flex items-center justify-center border-2 border-red-500">
                    <span className="text-red-800 dark:text-red-300 font-bold">Availability</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="bg-red-50 dark:bg-red-900/10 p-1 rounded text-xs text-center text-red-700 dark:text-red-300">Redundancy</div>
                    <div className="bg-red-50 dark:bg-red-900/10 p-1 rounded text-xs text-center text-red-700 dark:text-red-300">Backups</div>
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

export default CIATriad;
