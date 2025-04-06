import React, { useState } from 'react';

const CommonAttacks = () => {
  const [activeAttack, setActiveAttack] = useState<string | null>(null);

  const attacks = [
    {
      id: 'malware',
      name: 'Malware',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      description: 'Malicious software designed to damage, disrupt, or gain unauthorized access to computer systems.',
      examples: ['Viruses', 'Worms', 'Trojans', 'Ransomware', 'Spyware', 'Adware', 'Rootkits'],
      realWorldExample: 'In 2017, the WannaCry ransomware attack affected over 200,000 computers across 150 countries. It encrypted users\' files and demanded ransom payments in Bitcoin. The attack exploited a vulnerability in older Windows systems and caused an estimated $4 billion in damages worldwide.',
      mitigations: [
        'Keep software and operating systems updated',
        'Use reputable antivirus and anti-malware software',
        'Implement application whitelisting',
        'Regular system backups',
        'User education on suspicious attachments and downloads'
      ]
    },
    {
      id: 'phishing',
      name: 'Phishing',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      description: 'Fraudulent attempts to obtain sensitive information by disguising as a trustworthy entity.',
      examples: ['Email phishing', 'Spear phishing', 'Whaling', 'Vishing (voice phishing)', 'Smishing (SMS phishing)', 'Clone phishing'],
      realWorldExample: 'In 2016, a phishing attack targeting John Podesta, the chairman of Hillary Clinton\'s presidential campaign, led to the leak of thousands of emails. The attack used a fake security notification that appeared to come from Google, tricking Podesta into entering his credentials on a fraudulent login page.',
      mitigations: [
        'Employee security awareness training',
        'Email filtering solutions',
        'Multi-factor authentication',
        'Domain monitoring for lookalike domains',
        'Anti-spoofing controls (SPF, DKIM, DMARC)'
      ]
    },
    {
      id: 'social-engineering',
      name: 'Social Engineering',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      description: 'Psychological manipulation to trick users into making security mistakes or giving away sensitive information.',
      examples: ['Pretexting', 'Baiting', 'Quid pro quo', 'Tailgating/Piggybacking', 'Scareware', 'Watering hole attacks'],
      realWorldExample: 'In 2011, RSA Security was compromised when employees were tricked into opening an Excel spreadsheet titled "2011 Recruitment Plan" that contained a zero-day exploit. This breach ultimately led to information being stolen that could reduce the effectiveness of RSA\'s SecurID two-factor authentication products.',
      mitigations: [
        'Regular security awareness training',
        'Establish verification procedures for sensitive requests',
        'Implement the principle of least privilege',
        'Create a security-conscious culture',
        'Physical security controls (for tailgating prevention)'
      ]
    },
    {
      id: 'ddos',
      name: 'DDoS Attacks',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      description: 'Attempts to make a network resource unavailable by flooding it with traffic from multiple sources.',
      examples: ['Volume-based attacks (UDP floods)', 'Protocol attacks (SYN floods)', 'Application layer attacks (HTTP floods)', 'Amplification attacks (DNS amplification)', 'Botnet-driven attacks'],
      realWorldExample: 'In 2016, the Mirai botnet was used to launch a massive DDoS attack against Dyn, a major DNS provider. The attack disrupted services for major websites including Twitter, Netflix, Reddit, and CNN. The botnet consisted of IoT devices like cameras and routers that had been infected with malware.',
      mitigations: [
        'DDoS protection services',
        'Traffic filtering and rate limiting',
        'Network architecture designed for resilience',
        'Anycast network distribution',
        'Bandwidth scaling capabilities'
      ]
    },
    {
      id: 'mitm',
      name: 'Man-in-the-Middle',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      description: 'Attacks where the attacker secretly relays and possibly alters communications between two parties.',
      examples: ['ARP poisoning', 'DNS spoofing', 'HTTPS spoofing', 'SSL stripping', 'Wi-Fi eavesdropping', 'Session hijacking'],
      realWorldExample: 'In 2017, a major MITM attack affected users in Brazil when attackers compromised a Brazilian ISP and performed BGP hijacking to redirect users attempting to visit websites like Google and Facebook to convincing phishing pages designed to steal banking credentials.',
      mitigations: [
        'Use of HTTPS with HSTS',
        'Certificate pinning',
        'VPN for sensitive communications',
        'Public key infrastructure (PKI)',
        'Network traffic monitoring for unusual patterns'
      ]
    },
    {
      id: 'injection',
      name: 'Injection Attacks',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      description: 'Insertion of malicious code into vulnerable software to change its execution or access data.',
      examples: ['SQL injection', 'Cross-site scripting (XSS)', 'Command injection', 'LDAP injection', 'XML injection', 'CRLF injection'],
      realWorldExample: 'In 2011, Sony PlayStation Network suffered a major breach through SQL injection, exposing personal and financial information of 77 million users. The attackers exploited a vulnerability in the web application to inject malicious SQL commands that extracted sensitive data from the database.',
      mitigations: [
        'Input validation and sanitization',
        'Parameterized queries',
        'Least privilege database accounts',
        'Web application firewalls',
        'Regular security testing'
      ]
    }
  ];

  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Common Attack Types</h3>
      
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Understanding common attack types is essential for effective cybersecurity. These attacks represent the primary 
        methods threat actors use to compromise systems, steal data, or disrupt services.
      </p>
      
      {/* Attack type selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {attacks.map((attack) => (
          <button
            key={attack.id}
            onClick={() => setActiveAttack(attack.id === activeAttack ? null : attack.id)}
            className={`p-4 rounded-lg border transition-all ${
              attack.id === activeAttack
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 shadow-md'
                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'
            }`}
          >
            <div className="flex flex-col items-center">
              {attack.icon}
              <span className={`mt-2 text-sm font-medium ${
                attack.id === activeAttack
                  ? 'text-indigo-700 dark:text-indigo-300'
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
                {attack.name}
              </span>
            </div>
          </button>
        ))}
      </div>
      
      {/* Attack details */}
      {activeAttack && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700 animate-fadeIn">
          {attacks.filter(attack => attack.id === activeAttack).map((attack) => (
            <div key={attack.id}>
              <div className="flex items-center mb-4">
                {attack.icon}
                <h4 className="text-xl font-medium text-gray-900 dark:text-white ml-3">{attack.name}</h4>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">{attack.description}</p>
              
              <div className="mb-6">
                <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Common Examples</h5>
                <div className="flex flex-wrap gap-2">
                  {attack.examples.map((example, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Real-World Example</h5>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <p className="text-gray-700 dark:text-gray-300 text-sm italic">{attack.realWorldExample}</p>
                </div>
              </div>
              
              <div>
                <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Mitigation Strategies</h5>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  {attack.mitigations.map((mitigation, index) => (
                    <li key={index}>{mitigation}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Attack vectors visualization */}
      <div className="mt-8">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Attack Vectors Visualization</h4>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex justify-center">
            <div className="relative w-full max-w-3xl">
              <div className="flex justify-center items-center mb-8">
                <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-4 text-center w-40 h-40 flex items-center justify-center border-2 border-red-500">
                  <span className="text-red-800 dark:text-red-300 font-bold">Target System</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-0 h-16 border-2 border-dashed border-blue-500 dark:border-blue-400"></div>
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-2 text-center w-full flex items-center justify-center border-2 border-blue-500 h-16">
                    <span className="text-blue-800 dark:text-blue-300 font-bold">Network</span>
                  </div>
                  <div className="mt-2 space-y-1 w-full">
                    <div className="bg-blue-50 dark:bg-blue-900/10 p-1 rounded text-xs text-center text-blue-700 dark:text-blue-300">DDoS</div>
                    <div className="bg-blue-50 dark:bg-blue-900/10 p-1 rounded text-xs text-center text-blue-700 dark:text-blue-300">Man-in-the-Middle</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-0 h-16 border-2 border-dashed border-green-500 dark:border-green-400"></div>
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-2 text-center w-full flex items-center justify-center border-2 border-green-500 h-16">
                    <span className="text-green-800 dark:text-green-300 font-bold">Application</span>
                  </div>
                  <div className="mt-2 space-y-1 w-full">
                    <div className="bg-green-50 dark:bg-green-900/10 p-1 rounded text-xs text-center text-green-700 dark:text-green-300">Injection</div>
                    <div className="bg-green-50 dark:bg-green-900/10 p-1 rounded text-xs text-center text-green-700 dark:text-green-300">XSS</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-0 h-16 border-2 border-dashed border-yellow-500 dark:border-yellow-400"></div>
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-2 text-center w-full flex items-center justify-center border-2 border-yellow-500 h-16">
                    <span className="text-yellow-800 dark:text-yellow-300 font-bold">Human</span>
                  </div>
                  <div className="mt-2 space-y-1 w-full">
                    <div className="bg-yellow-50 dark:bg-yellow-900/10 p-1 rounded text-xs text-center text-yellow-700 dark:text-yellow-300">Phishing</div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/10 p-1 rounded text-xs text-center text-yellow-700 dark:text-yellow-300">Social Engineering</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Interactive exercise */}
      <div className="mt-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Attack Identification Exercise</h4>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          For each scenario below, identify the type of attack being described.
        </p>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <p className="text-gray-800 dark:text-gray-200 mb-4">
              "An employee receives an email that appears to be from their bank, asking them to verify their account information by clicking on a link. The link takes them to a website that looks identical to their bank's site."
            </p>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 hover:bg-blue-100 text-gray-800 dark:bg-gray-600 dark:hover:bg-blue-900/30 dark:text-gray-200 transition-colors">
                Malware
              </button>
              <button className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 hover:bg-blue-100 text-gray-800 dark:bg-gray-600 dark:hover:bg-blue-900/30 dark:text-gray-200 transition-colors">
                Phishing
              </button>
              <button className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 hover:bg-blue-100 text-gray-800 dark:bg-gray-600 dark:hover:bg-blue-900/30 dark:text-gray-200 transition-colors">
                DDoS
              </button>
              <button className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 hover:bg-blue-100 text-gray-800 dark:bg-gray-600 dark:hover:bg-blue-900/30 dark:text-gray-200 transition-colors">
                Man-in-the-Middle
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <p className="text-gray-800 dark:text-gray-200 mb-4">
              "A company's website becomes extremely slow and eventually crashes. Investigation reveals that thousands of devices are simultaneously sending traffic to the server."
            </p>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 hover:bg-blue-100 text-gray-800 dark:bg-gray-600 dark:hover:bg-blue-900/30 dark:text-gray-200 transition-colors">
                SQL Injection
              </button>
              <button className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 hover:bg-blue-100 text-gray-800 dark:bg-gray-600 dark:hover:bg-blue-900/30 dark:text-gray-200 transition-colors">
                Ransomware
              </button>
              <button className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 hover:bg-blue-100 text-gray-800 dark:bg-gray-600 dark:hover:bg-blue-900/30 dark:text-gray-200 transition-colors">
                DDoS
              </button>
              <button className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 hover:bg-blue-100 text-gray-800 dark:bg-gray-600 dark:hover:bg-blue-900/30 dark:text-gray-200 transition-colors">
                Social Engineering
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonAttacks;
