import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with your API key from environment variables
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyCjrRX2vRmhFk1OQxHLleXMq0pGJC6xXrM";

if (!API_KEY) {
  console.error("Gemini API key is missing. Please check your environment variables.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Get the Gemini Pro model - using the correct model name for the current API version
export const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// Function to generate cybersecurity tips
export async function generateCybersecurityTips(topic: string): Promise<string> {
  try {
    const prompt = `Generate 5 practical cybersecurity tips related to "${topic}".

    Your response MUST follow this exact structure:

    ## Cybersecurity Tips: ${topic}

    1. **[Tip Title]**: [Detailed explanation of the tip in 1-2 sentences. Make it actionable and specific.] [Relevant emoji]

    2. **[Tip Title]**: [Detailed explanation of the tip in 1-2 sentences. Make it actionable and specific.] [Relevant emoji]

    3. **[Tip Title]**: [Detailed explanation of the tip in 1-2 sentences. Make it actionable and specific.] [Relevant emoji]

    4. **[Tip Title]**: [Detailed explanation of the tip in 1-2 sentences. Make it actionable and specific.] [Relevant emoji]

    5. **[Tip Title]**: [Detailed explanation of the tip in 1-2 sentences. Make it actionable and specific.] [Relevant emoji]

    ## Why These Tips Matter
    [A brief 2-3 sentence explanation of why these practices are important for cybersecurity]

    Make all tips practical, actionable, and suitable for beginners. Use clear language and avoid jargon.`;

    const generationConfig = {
      temperature: 0.3,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    };

    const result = await geminiModel.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error generating cybersecurity tips:", error);
    return "Unable to generate tips at this time. Please try again later.";
  }
}

// Function to explain cybersecurity concepts
export async function explainCybersecurityConcept(concept: string): Promise<string> {
  try {
    const prompt = `Explain the cybersecurity concept of "${concept}" in a structured, educational format.

    Your response MUST follow this exact structure:

    ## What is ${concept}?
    [Provide a clear, comprehensive definition in 3-4 sentences that a beginner can understand]

    ## Why is ${concept} important?
    [Explain the significance and impact in cybersecurity in 2-3 sentences]

    ## How does ${concept} work?
    [Explain the basic mechanics or principles in 3-4 sentences]

    ## Real-world example:
    [Provide one concrete, relatable example that illustrates the concept]

    ## Related concepts:
    [List 2-3 related cybersecurity concepts with a brief explanation of how they connect]

    Make your explanation accessible to beginners while being technically accurate. Use analogies where helpful.`;

    const generationConfig = {
      temperature: 0.2, // Lower temperature for more factual, consistent output
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    };

    const result = await geminiModel.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error explaining cybersecurity concept:", error);
    return "Unable to generate explanation at this time. Please try again later.";
  }
}

// Function to generate practice questions
export async function generatePracticeQuestions(topic: string, difficulty: string = "beginner"): Promise<string> {
  try {
    const prompt = `Generate 3 multiple-choice practice questions about "${topic}" for ${difficulty} level cybersecurity students.

    Your response MUST follow this exact structure:

    ## Practice Questions: ${topic} (${difficulty} level)

    ### Question 1
    [Clear, specific question about ${topic} appropriate for ${difficulty} level]

    A. [Option A]
    B. [Option B]
    C. [Option C]
    D. [Option D]

    **Correct Answer:** [Letter]

    **Explanation:** [Detailed explanation of why this answer is correct and why others are incorrect. Include relevant concepts and principles.]

    ### Question 2
    [Clear, specific question about ${topic} appropriate for ${difficulty} level]

    A. [Option A]
    B. [Option B]
    C. [Option C]
    D. [Option D]

    **Correct Answer:** [Letter]

    **Explanation:** [Detailed explanation of why this answer is correct and why others are incorrect. Include relevant concepts and principles.]

    ### Question 3
    [Clear, specific question about ${topic} appropriate for ${difficulty} level]

    A. [Option A]
    B. [Option B]
    C. [Option C]
    D. [Option D]

    **Correct Answer:** [Letter]

    **Explanation:** [Detailed explanation of why this answer is correct and why others are incorrect. Include relevant concepts and principles.]

    ## Learning Objectives
    [Brief explanation of what knowledge these questions are testing and why it's important for cybersecurity professionals]

    Make questions challenging but fair for the specified difficulty level. Ensure all questions are factually accurate.`;

    const generationConfig = {
      temperature: 0.2,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1500,
    };

    const result = await geminiModel.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error generating practice questions:", error);
    return "Unable to generate practice questions at this time. Please try again later.";
  }
}

// Function to analyze security scenario
export async function analyzeSecurityScenario(scenario: string): Promise<string> {
  try {
    const prompt = `Analyze the following cybersecurity scenario and provide a structured security assessment:

    "${scenario}"

    Your response MUST follow this exact structure:

    ## Security Scenario Analysis

    ### Scenario Summary
    [Briefly summarize the key elements of the scenario in 2-3 sentences]

    ### Identified Security Issues
    1. **[Issue Title]**: [Detailed explanation of the security vulnerability or risk]
    2. **[Issue Title]**: [Detailed explanation of the security vulnerability or risk]
    3. **[Issue Title]**: [Detailed explanation of the security vulnerability or risk]

    ### Potential Impacts
    [Explain what could happen if these security issues are exploited, including potential business, data, and reputation impacts]

    ### Recommended Actions
    1. **Immediate Actions**:
       - [Specific, actionable step to address the most critical issues]
       - [Specific, actionable step to address the most critical issues]

    2. **Short-term Measures**:
       - [Specific, actionable step to implement within weeks]
       - [Specific, actionable step to implement within weeks]

    3. **Long-term Strategy**:
       - [Broader security improvements to prevent similar issues]
       - [Broader security improvements to prevent similar issues]

    ### Applicable Security Frameworks
    [Mention 1-2 relevant security frameworks or standards that apply to this scenario and how they would help]

    Make your analysis practical, actionable, and technically sound while remaining accessible to non-technical stakeholders.`;

    const generationConfig = {
      temperature: 0.3,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1500,
    };

    const result = await geminiModel.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error analyzing security scenario:", error);
    return "Unable to analyze the scenario at this time. Please try again later.";
  }
}
