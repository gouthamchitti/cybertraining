import React, { useState } from 'react';

const MitreAttack = () => {
  const [activeTactic, setActiveTactic] = useState<string | null>(null);

  const tactics = [
    {
      id: 'reconnaissance',
      name: 'Reconnaissance',
      description: 'The adversary is trying to gather information they can use to plan future operations.',
      techniques: [
        'Active Scanning',
        'Gather Victim Host Information',
        'Gather Victim Identity Information',
        'Gather Victim Network Information',
        'Gather Victim Org Information',
        'Phishing for Information',
        'Search Open Websites/Domains',
        'Search Victim-Owned Websites'
      ],
      example: 'An attacker uses tools like Shodan to scan for vulnerable internet-facing systems, or performs OSINT gathering on employees using LinkedIn and social media.'
    },
    {
      id: 'resource-development',
      name: 'Resource Development',
      description: 'The adversary is trying to establish resources they can use to support operations.',
      techniques: [
        'Acquire Infrastructure',
        'Compromise Infrastructure',
        'Develop Capabilities',
        'Establish Accounts',
        'Obtain Capabilities',
        'Stage Capabilities'
      ],
      example: 'Attackers set up command and control servers, register domains similar to the target organization, or develop custom malware tailored to the target environment.'
    },
    {
      id: 'initial-access',
      name: 'Initial Access',
      description: 'The adversary is trying to get into your network.',
      techniques: [
        'Drive-by Compromise',
        'Exploit Public-Facing Application',
        'External Remote Services',
        'Hardware Additions',
        'Phishing',
        'Replication Through Removable Media',
        'Supply Chain Compromise',
        'Trusted Relationship',
        'Valid Accounts'
      ],
      example: 'An attacker sends a spear-phishing email with a malicious attachment to an employee, who opens it and unknowingly installs malware on their system.'
    },
    {
      id: 'execution',
      name: 'Execution',
      description: 'The adversary is trying to run malicious code.',
      techniques: [
        'Command and Scripting Interpreter',
        'Container Administration Command',
        'Deploy Container',
        'Exploitation for Client Execution',
        'Inter-Process Communication',
        'Native API',
        'Scheduled Task/Job',
        'Shared Modules',
        'Software Deployment Tools',
        'System Services',
        'User Execution',
        'Windows Management Instrumentation'
      ],
      example: 'After gaining access, an attacker uses PowerShell to execute malicious commands or scripts that were delivered in the initial compromise.'
    },
    {
      id: 'persistence',
      name: 'Persistence',
      description: 'The adversary is trying to maintain their foothold.',
      techniques: [
        'Account Manipulation',
        'BITS Jobs',
        'Boot or Logon Autostart Execution',
        'Browser Extensions',
        'Compromise Client Software Binary',
        'Create Account',
        'Create or Modify System Process',
        'Event Triggered Execution',
        'External Remote Services',
        'Hijack Execution Flow',
        'Implant Internal Image',
        'Modify Authentication Process',
        'Office Application Startup',
        'Pre-OS Boot',
        'Scheduled Task/Job',
        'Server Software Component',
        'Traffic Signaling',
        'Valid Accounts'
      ],
      example: 'An attacker creates a new admin account, modifies registry keys to enable automatic execution of malware at startup, or installs a backdoor service.'
    },
    {
      id: 'privilege-escalation',
      name: 'Privilege Escalation',
      description: 'The adversary is trying to gain higher-level permissions.',
      techniques: [
        'Abuse Elevation Control Mechanism',
        'Access Token Manipulation',
        'Boot or Logon Autostart Execution',
        'Domain Policy Modification',
        'Escape to Host',
        'Event Triggered Execution',
        'Exploitation for Privilege Escalation',
        'Hijack Execution Flow',
        'Process Injection',
        'Scheduled Task/Job',
        'Valid Accounts'
      ],
      example: 'An attacker exploits a local vulnerability to gain SYSTEM or root privileges from a standard user account, allowing them to access protected resources.'
    },
    {
      id: 'defense-evasion',
      name: 'Defense Evasion',
      description: 'The adversary is trying to avoid being detected.',
      techniques: [
        'Abuse Elevation Control Mechanism',
        'Access Token Manipulation',
        'BITS Jobs',
        'Build Image on Host',
        'Deobfuscate/Decode Files or Information',
        'Deploy Container',
        'Direct Volume Access',
        'Domain Policy Modification',
        'Execution Guardrails',
        'Exploitation for Defense Evasion',
        'File and Directory Permissions Modification',
        'Hide Artifacts',
        'Hijack Execution Flow',
        'Impair Defenses',
        'Indicator Removal',
        'Indirect Command Execution',
        'Masquerading',
        'Modify Authentication Process',
        'Modify Cloud Compute Infrastructure',
        'Modify Registry',
        'Modify System Image',
        'Network Boundary Bridging',
        'Obfuscated Files or Information',
        'Plist File Modification',
        'Pre-OS Boot',
        'Process Injection',
        'Reflective Code Loading',
        'Rogue Domain Controller',
        'Rootkit',
        'Subvert Trust Controls',
        'Template Injection',
        'Traffic Signaling',
        'Trusted Developer Utilities Proxy Execution',
        'Unused/Unsupported Cloud Regions',
        'Use Alternate Authentication Material',
        'Valid Accounts',
        'Virtualization/Sandbox Evasion',
        'Weaken Encryption',
        'XSL Script Processing'
      ],
      example: 'An attacker disables security tools, clears log files, uses encrypted communications, or employs fileless malware techniques to avoid detection.'
    },
    {
      id: 'credential-access',
      name: 'Credential Access',
      description: 'The adversary is trying to steal account names and passwords.',
      techniques: [
        'Adversary-in-the-Middle',
        'Brute Force',
        'Credentials from Password Stores',
        'Exploitation for Credential Access',
        'Forced Authentication',
        'Forge Web Credentials',
        'Input Capture',
        'Modify Authentication Process',
        'Multi-Factor Authentication Interception',
        'Multi-Factor Authentication Request Generation',
        'Network Sniffing',
        'OS Credential Dumping',
        'Steal Application Access Token',
        'Steal or Forge Authentication Certificates',
        'Steal or Forge Kerberos Tickets',
        'Steal Web Session Cookie',
        'Unsecured Credentials'
      ],
      example: 'An attacker uses a tool like Mimikatz to dump passwords from memory, or sets up a keylogger to capture credentials as users type them.'
    },
    {
      id: 'discovery',
      name: 'Discovery',
      description: 'The adversary is trying to figure out your environment.',
      techniques: [
        'Account Discovery',
        'Application Window Discovery',
        'Browser Information Discovery',
        'Cloud Infrastructure Discovery',
        'Cloud Service Dashboard',
        'Cloud Service Discovery',
        'Container and Resource Discovery',
        'Debugger Evasion',
        'Domain Trust Discovery',
        'File and Directory Discovery',
        'Group Policy Discovery',
        'Network Service Discovery',
        'Network Share Discovery',
        'Network Sniffing',
        'Password Policy Discovery',
        'Peripheral Device Discovery',
        'Permission Groups Discovery',
        'Process Discovery',
        'Query Registry',
        'Remote System Discovery',
        'Software Discovery',
        'System Information Discovery',
        'System Location Discovery',
        'System Network Configuration Discovery',
        'System Network Connections Discovery',
        'System Owner/User Discovery',
        'System Service Discovery',
        'System Time Discovery',
        'Virtualization/Sandbox Evasion'
      ],
      example: 'After gaining access, an attacker runs commands to enumerate users, network shares, and system information to map out the environment and identify valuable targets.'
    },
    {
      id: 'lateral-movement',
      name: 'Lateral Movement',
      description: 'The adversary is trying to move through your environment.',
      techniques: [
        'Exploitation of Remote Services',
        'Internal Spearphishing',
        'Lateral Tool Transfer',
        'Remote Service Session Hijacking',
        'Remote Services',
        'Replication Through Removable Media',
        'Software Deployment Tools',
        'Taint Shared Content',
        'Use Alternate Authentication Material'
      ],
      example: 'An attacker uses stolen credentials to access other systems via RDP, or exploits trust relationships between systems to move from one compromised host to another.'
    },
    {
      id: 'collection',
      name: 'Collection',
      description: 'The adversary is trying to gather data of interest to their goal.',
      techniques: [
        'Adversary-in-the-Middle',
        'Archive Collected Data',
        'Audio Capture',
        'Automated Collection',
        'Browser Session Hijacking',
        'Clipboard Data',
        'Data from Cloud Storage',
        'Data from Configuration Repository',
        'Data from Information Repositories',
        'Data from Local System',
        'Data from Network Shared Drive',
        'Data from Removable Media',
        'Data Staged',
        'Email Collection',
        'Input Capture',
        'Screen Capture',
        'Video Capture'
      ],
      example: 'An attacker searches through file systems and databases for specific keywords related to intellectual property, or captures screenshots of sensitive information.'
    },
    {
      id: 'command-and-control',
      name: 'Command and Control',
      description: 'The adversary is trying to communicate with compromised systems to control them.',
      techniques: [
        'Application Layer Protocol',
        'Communication Through Removable Media',
        'Data Encoding',
        'Data Obfuscation',
        'Dynamic Resolution',
        'Encrypted Channel',
        'Fallback Channels',
        'Ingress Tool Transfer',
        'Multi-Stage Channels',
        'Non-Application Layer Protocol',
        'Non-Standard Port',
        'Protocol Tunneling',
        'Proxy',
        'Remote Access Software',
        'Traffic Signaling',
        'Web Service'
      ],
      example: 'Malware on a compromised system establishes an encrypted connection to a command server controlled by the attacker, allowing them to send commands and receive stolen data.'
    },
    {
      id: 'exfiltration',
      name: 'Exfiltration',
      description: 'The adversary is trying to steal data.',
      techniques: [
        'Automated Exfiltration',
        'Data Transfer Size Limits',
        'Exfiltration Over Alternative Protocol',
        'Exfiltration Over C2 Channel',
        'Exfiltration Over Other Network Medium',
        'Exfiltration Over Physical Medium',
        'Exfiltration Over Web Service',
        'Scheduled Transfer',
        'Transfer Data to Cloud Account'
      ],
      example: 'An attacker compresses and encrypts stolen data, then transfers it out of the organization using HTTPS connections to legitimate cloud storage services to avoid detection.'
    },
    {
      id: 'impact',
      name: 'Impact',
      description: 'The adversary is trying to manipulate, interrupt, or destroy your systems and data.',
      techniques: [
        'Account Access Removal',
        'Data Destruction',
        'Data Encrypted for Impact',
        'Data Manipulation',
        'Defacement',
        'Disk Wipe',
        'Endpoint Denial of Service',
        'Firmware Corruption',
        'Inhibit System Recovery',
        'Network Denial of Service',
        'Resource Hijacking',
        'Service Stop',
        'System Shutdown/Reboot'
      ],
      example: 'An attacker deploys ransomware that encrypts critical business files across the network, or destroys system backups before wiping systems to prevent recovery.'
    }
  ];

  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">MITRE ATT&CK Framework</h3>
      
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        The MITRE ATT&CK (Adversarial Tactics, Techniques, and Common Knowledge) framework is a globally-accessible knowledge base of 
        adversary tactics and techniques based on real-world observations. It provides a common language for describing cyber attack behaviors.
      </p>
      
      {/* ATT&CK Matrix Visualization */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-8">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">ATT&CK Tactics (Kill Chain)</h4>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {tactics.map((tactic) => (
            <button
              key={tactic.id}
              onClick={() => setActiveTactic(tactic.id === activeTactic ? null : tactic.id)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                tactic.id === activeTactic
                  ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                  : 'bg-gray-100 text-gray-800 hover:bg-indigo-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-indigo-900/30'
              }`}
            >
              {tactic.name}
            </button>
          ))}
        </div>
        
        {activeTactic && (
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg animate-fadeIn">
            {tactics.filter(tactic => tactic.id === activeTactic).map((tactic) => (
              <div key={tactic.id}>
                <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{tactic.name}</h5>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{tactic.description}</p>
                
                <div className="mb-4">
                  <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Common Techniques:</h6>
                  <div className="flex flex-wrap gap-2">
                    {tactic.techniques.slice(0, 8).map((technique, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200"
                      >
                        {technique}
                      </span>
                    ))}
                    {tactic.techniques.length > 8 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200">
                        +{tactic.techniques.length - 8} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div>
                  <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Example:</h6>
                  <p className="text-gray-600 dark:text-gray-400 text-sm italic">{tactic.example}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!activeTactic && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-4">
            Select a tactic above to see details
          </div>
        )}
      </div>
      
      {/* ATT&CK Flow Diagram */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-8">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Attack Flow Visualization</h4>
        
        <div className="relative overflow-x-auto">
          <div className="min-w-max">
            <div className="flex justify-between items-center mb-8">
              <div className="w-full max-w-5xl mx-auto flex justify-between">
                {tactics.slice(0, 6).map((tactic, index) => (
                  <div key={tactic.id} className="flex flex-col items-center">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500' :
                      index === 1 ? 'bg-indigo-100 dark:bg-indigo-900/30 border-2 border-indigo-500' :
                      index === 2 ? 'bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-500' :
                      index === 3 ? 'bg-red-100 dark:bg-red-900/30 border-2 border-red-500' :
                      index === 4 ? 'bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-500' :
                      'bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-500'
                    }`}>
                      <span className={`text-xs font-medium text-center ${
                        index === 0 ? 'text-blue-800 dark:text-blue-300' :
                        index === 1 ? 'text-indigo-800 dark:text-indigo-300' :
                        index === 2 ? 'text-purple-800 dark:text-purple-300' :
                        index === 3 ? 'text-red-800 dark:text-red-300' :
                        index === 4 ? 'text-orange-800 dark:text-orange-300' :
                        'text-yellow-800 dark:text-yellow-300'
                      }`}>{tactic.name}</span>
                    </div>
                    {index < 5 && (
                      <div className="w-full h-0.5 bg-gray-300 dark:bg-gray-600 mt-10"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="w-full max-w-5xl mx-auto flex justify-between">
                {tactics.slice(6, 12).map((tactic, index) => (
                  <div key={tactic.id} className="flex flex-col items-center">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500' :
                      index === 1 ? 'bg-teal-100 dark:bg-teal-900/30 border-2 border-teal-500' :
                      index === 2 ? 'bg-cyan-100 dark:bg-cyan-900/30 border-2 border-cyan-500' :
                      index === 3 ? 'bg-pink-100 dark:bg-pink-900/30 border-2 border-pink-500' :
                      index === 4 ? 'bg-rose-100 dark:bg-rose-900/30 border-2 border-rose-500' :
                      'bg-gray-100 dark:bg-gray-700 border-2 border-gray-500'
                    }`}>
                      <span className={`text-xs font-medium text-center ${
                        index === 0 ? 'text-green-800 dark:text-green-300' :
                        index === 1 ? 'text-teal-800 dark:text-teal-300' :
                        index === 2 ? 'text-cyan-800 dark:text-cyan-300' :
                        index === 3 ? 'text-pink-800 dark:text-pink-300' :
                        index === 4 ? 'text-rose-800 dark:text-rose-300' :
                        'text-gray-800 dark:text-gray-300'
                      }`}>{tactic.name}</span>
                    </div>
                    {index < 5 && (
                      <div className="w-full h-0.5 bg-gray-300 dark:bg-gray-600 mt-10"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Real-world case studies */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Real-World Case Study: SolarWinds Attack</h4>
        
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          The SolarWinds attack was a sophisticated supply chain attack discovered in December 2020. Let's analyze it using the MITRE ATT&CK framework:
        </p>
        
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h5 className="text-md font-medium text-blue-700 dark:text-blue-300 mb-2">Initial Access</h5>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              The attackers compromised the build system for SolarWinds Orion software, inserting malicious code into the software update.
              <br />
              <span className="text-xs text-blue-600 dark:text-blue-400 mt-1">Technique: Supply Chain Compromise</span>
            </p>
          </div>
          
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
            <h5 className="text-md font-medium text-indigo-700 dark:text-indigo-300 mb-2">Execution</h5>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              When customers installed the compromised update, the malicious code (SUNBURST) would execute and establish a backdoor.
              <br />
              <span className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">Technique: User Execution: Malicious File</span>
            </p>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h5 className="text-md font-medium text-purple-700 dark:text-purple-300 mb-2">Defense Evasion</h5>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              The malware would remain dormant for up to two weeks before activating. It also checked for security tools and would terminate itself if certain products were detected.
              <br />
              <span className="text-xs text-purple-600 dark:text-purple-400 mt-1">Techniques: Obfuscated Files, Virtualization/Sandbox Evasion</span>
            </p>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <h5 className="text-md font-medium text-red-700 dark:text-red-300 mb-2">Command and Control</h5>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              The malware communicated with command and control servers using legitimate-looking domains and encrypted communications that mimicked normal SolarWinds traffic.
              <br />
              <span className="text-xs text-red-600 dark:text-red-400 mt-1">Techniques: Application Layer Protocol, Domain Fronting, Encrypted Channel</span>
            </p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h5 className="text-md font-medium text-green-700 dark:text-green-300 mb-2">Lateral Movement & Collection</h5>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Once inside target networks, attackers moved laterally to identify and access high-value targets, focusing on email and document repositories.
              <br />
              <span className="text-xs text-green-600 dark:text-green-400 mt-1">Techniques: Internal Spearphishing, Remote Services, Data from Information Repositories</span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Interactive exercise */}
      <div className="mt-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">ATT&CK Mapping Exercise</h4>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          For each scenario below, identify which MITRE ATT&CK tactic is being used.
        </p>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <p className="text-gray-800 dark:text-gray-200 mb-4">
              "An attacker uses a keylogger to capture usernames and passwords as employees log into their accounts."
            </p>
            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>Select a tactic</option>
              {tactics.map(tactic => (
                <option key={tactic.id}>{tactic.name}</option>
              ))}
            </select>
            <button className="mt-2 text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Check Answer
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <p className="text-gray-800 dark:text-gray-200 mb-4">
              "After compromising a workstation, an attacker runs commands to identify other systems on the network, active directory structure, and potential high-value targets."
            </p>
            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>Select a tactic</option>
              {tactics.map(tactic => (
                <option key={tactic.id}>{tactic.name}</option>
              ))}
            </select>
            <button className="mt-2 text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Check Answer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MitreAttack;
