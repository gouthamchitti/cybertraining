/**
 * Utility functions to analyze user queries and determine the best response type
 */

export type QueryType = 'definition' | 'tips' | 'practice' | 'scenario' | 'unknown';

/**
 * Analyzes a user query to determine what type of information they're looking for
 */
export function analyzeQuery(query: string): QueryType {
  // Convert to lowercase for case-insensitive matching
  const normalizedQuery = query.toLowerCase().trim();
  
  // Definition/explanation patterns
  const definitionPatterns = [
    /^what\s+is\s+/i,                   // "What is X"
    /^what\s+are\s+/i,                  // "What are X"
    /^what\s+does\s+.+\s+mean/i,        // "What does X mean"
    /^define\s+/i,                      // "Define X"
    /^explain\s+/i,                     // "Explain X"
    /^how\s+does\s+.+\s+work/i,         // "How does X work"
    /^tell\s+me\s+about\s+/i,           // "Tell me about X"
    /^describe\s+/i,                    // "Describe X"
    /^meaning\s+of\s+/i,                // "Meaning of X"
    /^definition\s+of\s+/i,             // "Definition of X"
    /\s+meaning$/i,                     // "X meaning"
    /\s+definition$/i,                  // "X definition"
    /^what\'s\s+/i,                     // "What's X"
  ];
  
  // Tips/best practices patterns
  const tipsPatterns = [
    /^how\s+to\s+/i,                    // "How to X"
    /^tips\s+for\s+/i,                  // "Tips for X"
    /^best\s+practices\s+for\s+/i,      // "Best practices for X"
    /^ways\s+to\s+/i,                   // "Ways to X"
    /^strategies\s+for\s+/i,            // "Strategies for X"
    /^advice\s+on\s+/i,                 // "Advice on X"
    /^how\s+can\s+i\s+/i,               // "How can I X"
    /^how\s+do\s+i\s+/i,                // "How do I X"
    /^steps\s+to\s+/i,                  // "Steps to X"
    /^guide\s+for\s+/i,                 // "Guide for X"
  ];
  
  // Practice questions patterns
  const practicePatterns = [
    /^quiz\s+/i,                        // "Quiz X"
    /^test\s+/i,                        // "Test X"
    /^practice\s+questions\s+/i,        // "Practice questions X"
    /^questions\s+about\s+/i,           // "Questions about X"
    /^exam\s+/i,                        // "Exam X"
    /^assessment\s+/i,                  // "Assessment X"
    /^challenge\s+/i,                   // "Challenge X"
    /^exercise\s+/i,                    // "Exercise X"
  ];
  
  // Scenario analysis patterns
  const scenarioPatterns = [
    /^analyze\s+/i,                     // "Analyze X"
    /^scenario\s+/i,                    // "Scenario X"
    /^what\s+if\s+/i,                   // "What if X"
    /^case\s+study\s+/i,                // "Case study X"
    /^evaluate\s+/i,                    // "Evaluate X"
    /^assess\s+/i,                      // "Assess X"
    /^review\s+/i,                      // "Review X"
    /^incident\s+/i,                    // "Incident X"
  ];
  
  // Check for cybersecurity-specific terms that would indicate a definition is needed
  const cybersecurityTerms = [
    'siem', 'ids', 'ips', 'dlp', 'edr', 'xdr', 'ndr', 'soar', 'zero trust', 
    'firewall', 'vpn', 'encryption', 'malware', 'ransomware', 'phishing', 
    'social engineering', 'penetration testing', 'vulnerability', 'exploit',
    'threat', 'attack vector', 'backdoor', 'botnet', 'brute force', 'ddos',
    'mitm', 'rootkit', 'spyware', 'trojan', 'virus', 'worm', 'csrf', 'xss',
    'sql injection', 'cve', 'cwe', 'owasp', 'nist', 'iso 27001', 'gdpr', 'hipaa',
    'pci dss', 'soc', 'cert', 'csirt', 'ciso', 'security operations center'
  ];
  
  // Check if the query is just a cybersecurity term by itself
  const queryWords = normalizedQuery.split(/\s+/);
  if (queryWords.length <= 3) {
    for (const term of cybersecurityTerms) {
      if (normalizedQuery.includes(term) && queryWords.length <= 3) {
        return 'definition';
      }
    }
  }
  
  // Check against each pattern set
  for (const pattern of definitionPatterns) {
    if (pattern.test(normalizedQuery)) {
      return 'definition';
    }
  }
  
  for (const pattern of tipsPatterns) {
    if (pattern.test(normalizedQuery)) {
      return 'tips';
    }
  }
  
  for (const pattern of practicePatterns) {
    if (pattern.test(normalizedQuery)) {
      return 'practice';
    }
  }
  
  for (const pattern of scenarioPatterns) {
    if (pattern.test(normalizedQuery)) {
      return 'scenario';
    }
  }
  
  // If the query contains a question mark, it's likely a question
  if (normalizedQuery.includes('?')) {
    // Simple heuristic: if it's short, it's probably a definition question
    if (normalizedQuery.length < 60) {
      return 'definition';
    }
    // If it's longer, it might be a scenario
    return 'scenario';
  }
  
  // Default to unknown if no patterns match
  return 'unknown';
}

/**
 * Extracts the main topic from a query
 */
export function extractTopic(query: string): string {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Remove common question prefixes
  let cleanedQuery = normalizedQuery
    .replace(/^what\s+is\s+/i, '')
    .replace(/^what\s+are\s+/i, '')
    .replace(/^how\s+does\s+/i, '')
    .replace(/^how\s+to\s+/i, '')
    .replace(/^define\s+/i, '')
    .replace(/^explain\s+/i, '')
    .replace(/^tell\s+me\s+about\s+/i, '')
    .replace(/^describe\s+/i, '')
    .replace(/\?$/, '');
  
  // Remove filler words
  cleanedQuery = cleanedQuery
    .replace(/\s+the\s+/g, ' ')
    .replace(/\s+a\s+/g, ' ')
    .replace(/\s+an\s+/g, ' ')
    .replace(/\s+in\s+/g, ' ')
    .replace(/\s+of\s+/g, ' ')
    .replace(/\s+for\s+/g, ' ')
    .replace(/\s+to\s+/g, ' ')
    .replace(/\s+on\s+/g, ' ')
    .replace(/\s+with\s+/g, ' ')
    .trim();
  
  return cleanedQuery;
}

/**
 * Maps a query type to the appropriate assistant mode
 */
export function queryTypeToMode(queryType: QueryType): 'tips' | 'explain' | 'practice' | 'analyze' {
  switch (queryType) {
    case 'definition':
      return 'explain';
    case 'tips':
      return 'tips';
    case 'practice':
      return 'practice';
    case 'scenario':
      return 'analyze';
    case 'unknown':
    default:
      // Default to explanation for unknown query types
      return 'explain';
  }
}
