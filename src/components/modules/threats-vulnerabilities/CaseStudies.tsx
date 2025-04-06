import React, { useState } from 'react';

const CaseStudies = () => {
  const [activeCase, setActiveCase] = useState<string | null>('solarwinds');

  const caseStudies = [
    {
      id: 'solarwinds',
      name: 'SolarWinds Supply Chain Attack',
      year: '2020',
      attackType: 'Supply Chain Attack',
      description: 'A sophisticated supply chain attack where attackers compromised the software build system of SolarWinds Orion, inserting malicious code into software updates that were then distributed to thousands of organizations.',
      impact: 'Affected approximately 18,000 organizations, including multiple U.S. government agencies, critical infrastructure entities, and Fortune 500 companies.',
      timeline: [
        { date: 'Early 2020', event: 'Attackers gain access to SolarWinds network' },
        { date: 'March 2020', event: 'Attackers inject malicious code (SUNBURST) into Orion software build process' },
        { date: 'March-June 2020', event: 'Compromised updates distributed to customers' },
        { date: 'December 2020', event: 'FireEye discovers the breach while investigating their own security incident' },
        { date: 'December 13, 2020', event: 'Public disclosure of the attack' }
      ],
      techniques: [
        { tactic: 'Initial Access', technique: 'Supply Chain Compromise', description: 'Attackers compromised the build system for SolarWinds Orion software.' },
        { tactic: 'Execution', technique: 'User Execution: Malicious File', description: 'When customers installed the compromised update, the malicious code would execute and establish a backdoor.' },
        { tactic: 'Defense Evasion', technique: 'Obfuscated Files & Information', description: 'The malware would remain dormant for up to two weeks before activating and used multiple obfuscation techniques.' },
        { tactic: 'Command and Control', technique: 'Application Layer Protocol', description: 'The malware communicated with C2 servers using legitimate-looking domains and encrypted communications.' },
        { tactic: 'Lateral Movement', technique: 'Internal Spearphishing', description: 'Once inside target networks, attackers moved laterally to access high-value targets.' }
      ],
      lessons: [
        'Verify the integrity of software throughout the development and distribution process',
        'Implement a zero-trust architecture that assumes breach',
        'Monitor for unusual network traffic, even from trusted applications',
        'Maintain proper network segmentation to limit lateral movement',
        'Develop and test incident response plans for supply chain attacks'
      ]
    },
    {
      id: 'colonial-pipeline',
      name: 'Colonial Pipeline Ransomware Attack',
      year: '2021',
      attackType: 'Ransomware Attack',
      description: 'A ransomware attack against Colonial Pipeline, the largest fuel pipeline in the United States, which led to the company shutting down its entire 5,500-mile pipeline system as a precautionary measure.',
      impact: 'Caused fuel shortages across the Eastern United States, panic buying, and temporary price increases. Colonial Pipeline paid a ransom of 75 Bitcoin (approximately $4.4 million at the time).',
      timeline: [
        { date: 'May 6, 2021', event: 'Initial compromise through a leaked VPN password' },
        { date: 'May 7, 2021', event: 'Colonial Pipeline discovers the attack and shuts down pipeline operations' },
        { date: 'May 7, 2021', event: 'Colonial pays 75 Bitcoin ransom to DarkSide ransomware group' },
        { date: 'May 12, 2021', event: 'Pipeline operations begin to resume' },
        { date: 'May 13, 2021', event: 'Full service restoration' },
        { date: 'June 7, 2021', event: 'U.S. Department of Justice announces recovery of approximately $2.3 million of the ransom payment' }
      ],
      techniques: [
        { tactic: 'Initial Access', technique: 'Valid Accounts', description: 'Attackers used a compromised VPN account password that had been leaked on the dark web.' },
        { tactic: 'Execution', technique: 'Command and Scripting Interpreter', description: 'Attackers executed malicious code to deploy the ransomware payload.' },
        { tactic: 'Impact', technique: 'Data Encrypted for Impact', description: 'The DarkSide ransomware encrypted critical business files and systems.' },
        { tactic: 'Collection', technique: 'Data from Local System', description: 'Before encryption, the attackers exfiltrated approximately 100GB of data for double-extortion.' },
        { tactic: 'Command and Control', technique: 'Encrypted Channel', description: 'Communications with command and control servers were encrypted to avoid detection.' }
      ],
      lessons: [
        'Implement multi-factor authentication for all remote access, including VPNs',
        'Regularly audit and disable unused accounts and credentials',
        'Segment operational technology (OT) networks from information technology (IT) networks',
        'Maintain offline backups of critical systems and data',
        'Develop and test business continuity plans for ransomware scenarios'
      ]
    },
    {
      id: 'equifax',
      name: 'Equifax Data Breach',
      year: '2017',
      attackType: 'Web Application Vulnerability Exploitation',
      description: 'A massive data breach at Equifax, one of the three largest credit bureaus in the United States, exposed sensitive personal and financial information of approximately 147 million people.',
      impact: 'Exposed names, Social Security numbers, birth dates, addresses, and in some cases driver\'s license numbers and credit card information of nearly half the U.S. population. Resulted in a $575 million settlement.',
      timeline: [
        { date: 'March 7, 2017', event: 'Apache Struts vulnerability (CVE-2017-5638) publicly disclosed' },
        { date: 'March 9, 2017', event: 'Equifax security team notified of the need to patch vulnerable systems' },
        { date: 'May 13, 2017', event: 'Initial compromise of Equifax systems via unpatched Apache Struts vulnerability' },
        { date: 'May-July 2017', event: 'Attackers maintain access and exfiltrate data' },
        { date: 'July 29, 2017', event: 'Equifax discovers the breach' },
        { date: 'September 7, 2017', event: 'Public disclosure of the breach' }
      ],
      techniques: [
        { tactic: 'Initial Access', technique: 'Exploit Public-Facing Application', description: 'Attackers exploited a known vulnerability in Apache Struts (CVE-2017-5638).' },
        { tactic: 'Discovery', technique: 'Network Service Discovery', description: 'Attackers conducted internal reconnaissance to locate databases containing sensitive information.' },
        { tactic: 'Credential Access', technique: 'Credentials from Password Stores', description: 'Attackers obtained credentials stored in plaintext configuration files.' },
        { tactic: 'Lateral Movement', technique: 'Remote Services', description: 'Attackers used legitimate credentials to access additional systems.' },
        { tactic: 'Exfiltration', technique: 'Exfiltration Over Web Service', description: 'Data was exfiltrated through encrypted web queries to disguise the traffic.' }
      ],
      lessons: [
        'Implement a robust vulnerability management program with timely patching',
        'Employ network segmentation to limit access to sensitive data',
        'Implement proper encryption for sensitive data at rest',
        'Deploy web application firewalls to protect public-facing applications',
        'Conduct regular security assessments and penetration testing'
      ]
    }
  ];

  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Real-World Case Studies</h3>
      
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Analyzing real-world cyber attacks provides valuable insights into threat actor tactics, techniques, and procedures (TTPs). 
        These case studies illustrate how attacks unfold and the lessons organizations can learn to improve their security posture.
      </p>
      
      {/* Case study selection tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-4">
          {caseStudies.map((caseStudy) => (
            <button
              key={caseStudy.id}
              onClick={() => setActiveCase(caseStudy.id)}
              className={`py-2 px-3 border-b-2 font-medium text-sm ${
                activeCase === caseStudy.id
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {caseStudy.name}
              <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">({caseStudy.year})</span>
            </button>
          ))}
        </nav>
      </div>
      
      {/* Case study details */}
      {activeCase && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          {caseStudies.filter(caseStudy => caseStudy.id === activeCase).map((caseStudy) => (
            <div key={caseStudy.id}>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <div>
                  <h4 className="text-xl font-medium text-gray-900 dark:text-white">{caseStudy.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{caseStudy.year} | {caseStudy.attackType}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                    High Impact
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Overview</h5>
                <p className="text-gray-700 dark:text-gray-300">{caseStudy.description}</p>
              </div>
              
              <div className="mb-6">
                <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Impact</h5>
                <p className="text-gray-700 dark:text-gray-300">{caseStudy.impact}</p>
              </div>
              
              <div className="mb-6">
                <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Timeline</h5>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                  <ul className="space-y-4">
                    {caseStudy.timeline.map((event, index) => (
                      <li key={index} className="relative pl-10">
                        <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border-2 border-indigo-500 flex items-center justify-center">
                          <span className="text-xs font-medium text-indigo-800 dark:text-indigo-300">{index + 1}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{event.date}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{event.event}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mb-6">
                <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Attack Techniques (MITRE ATT&CK)</h5>
                <div className="space-y-3">
                  {caseStudy.techniques.map((technique, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 dark:text-white">{technique.tactic}:</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200">
                          {technique.technique}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{technique.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Key Lessons</h5>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  {caseStudy.lessons.map((lesson, index) => (
                    <li key={index}>{lesson}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Interactive exercise */}
      <div className="mt-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Case Study Analysis Exercise</h4>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Based on the case studies above, answer the following questions to test your understanding of attack patterns and security lessons.
        </p>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <p className="text-gray-800 dark:text-gray-200 mb-4">
              "Which of the following security controls would have been most effective in preventing the Equifax breach?"
            </p>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="radio" name="q1" className="form-radio h-4 w-4 text-indigo-600" />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Network segmentation</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="q1" className="form-radio h-4 w-4 text-indigo-600" />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Timely patch management</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="q1" className="form-radio h-4 w-4 text-indigo-600" />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Multi-factor authentication</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="q1" className="form-radio h-4 w-4 text-indigo-600" />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Endpoint protection</span>
              </label>
            </div>
            <button className="mt-4 text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Check Answer
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <p className="text-gray-800 dark:text-gray-200 mb-4">
              "What common attack vector was used in both the Colonial Pipeline and SolarWinds attacks?"
            </p>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="radio" name="q2" className="form-radio h-4 w-4 text-indigo-600" />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Web application vulnerability</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="q2" className="form-radio h-4 w-4 text-indigo-600" />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Phishing email</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="q2" className="form-radio h-4 w-4 text-indigo-600" />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Compromised credentials</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="q2" className="form-radio h-4 w-4 text-indigo-600" />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Zero-day exploit</span>
              </label>
            </div>
            <button className="mt-4 text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Check Answer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
