import React from 'react';

interface Resource {
  title: string;
  description: string;
  url: string;
  category: string;
}

const resources: Resource[] = [
  {
    title: "NIST Cybersecurity Framework",
    description: "Guidelines, standards, and best practices to manage cybersecurity-related risk",
    url: "https://www.nist.gov/cyberframework",
    category: "Framework"
  },
  {
    title: "OWASP Top 10",
    description: "Standard awareness document for developers about the most critical security risks to web applications",
    url: "https://owasp.org/www-project-top-ten/",
    category: "Web Security"
  },
  {
    title: "Cybersecurity & Infrastructure Security Agency",
    description: "Resources to help organizations protect their systems",
    url: "https://www.cisa.gov/",
    category: "Government"
  },
  {
    title: "Have I Been Pwned",
    description: "Check if your email or phone is in a data breach",
    url: "https://haveibeenpwned.com/",
    category: "Tools"
  },
  {
    title: "Cybersecurity Courses - Coursera",
    description: "Online courses in cybersecurity from top universities and companies",
    url: "https://www.coursera.org/browse/information-technology/security",
    category: "Learning"
  },
  {
    title: "TryHackMe",
    description: "Learn cybersecurity through hands-on exercises and labs",
    url: "https://tryhackme.com/",
    category: "Learning"
  }
];

export default function CybersecurityResources() {
  // Group resources by category
  const resourcesByCategory = resources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {} as Record<string, Resource[]>);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Cybersecurity Resources</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Here are some valuable cybersecurity resources you can explore to enhance your knowledge:
      </p>

      <div className="space-y-6">
        {Object.entries(resourcesByCategory).map(([category, categoryResources]) => (
          <div key={category}>
            <h3 className="text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-3">{category}</h3>
            <ul className="space-y-4">
              {categoryResources.map((resource) => (
                <li key={resource.title} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:shadow-md transition-shadow">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <h4 className="text-gray-900 dark:text-white font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      {resource.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                      {resource.description}
                    </p>
                    <div className="mt-2 text-indigo-600 dark:text-indigo-400 text-xs flex items-center">
                      Visit resource
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
