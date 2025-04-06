"use client";

import { useState, useEffect } from "react";
import {
  generateCybersecurityTips,
  explainCybersecurityConcept,
  generatePracticeQuestions,
  analyzeSecurityScenario
} from "@/utils/gemini";
import { analyzeQuery, extractTopic, queryTypeToMode, QueryType } from "@/utils/query-analyzer";
import MarkdownRenderer from "./MarkdownRenderer";
import LoadingAnimation from "./LoadingAnimation";

type AssistantMode = "tips" | "explain" | "practice" | "analyze";

export default function AIAssistant() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<AssistantMode>("tips");
  const [difficulty, setDifficulty] = useState("beginner");
  const [detectedQueryType, setDetectedQueryType] = useState<QueryType>("unknown");
  const [autoModeEnabled, setAutoModeEnabled] = useState(true);
  const [lastQuery, setLastQuery] = useState("");

  // Effect to analyze input and detect query type
  useEffect(() => {
    if (input.trim()) {
      const queryType = analyzeQuery(input);
      setDetectedQueryType(queryType);
    } else {
      setDetectedQueryType("unknown");
    }
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResponse("");
    setLastQuery(input);

    try {
      let result = "";
      let effectiveMode = mode;

      // If auto mode is enabled, use the detected query type to determine the mode
      if (autoModeEnabled) {
        const queryType = analyzeQuery(input);
        effectiveMode = queryTypeToMode(queryType);

        // Update the UI mode to match what we're actually using
        setMode(effectiveMode);
      }

      // Extract the core topic if needed
      let processedInput = input;
      if (effectiveMode === "explain") {
        // For explanations, try to extract just the core topic
        const topic = extractTopic(input);
        if (topic && topic !== input) {
          processedInput = topic;
        }
      }

      console.log(`Query: "${input}" | Detected type: ${detectedQueryType} | Using mode: ${effectiveMode} | Processed input: "${processedInput}"`);

      switch (effectiveMode) {
        case "tips":
          result = await generateCybersecurityTips(processedInput);
          break;
        case "explain":
          result = await explainCybersecurityConcept(processedInput);
          break;
        case "practice":
          result = await generatePracticeQuestions(processedInput, difficulty);
          break;
        case "analyze":
          result = await analyzeSecurityScenario(processedInput);
          break;
      }

      setResponse(result);
    } catch (error: any) {
      console.error("Error using AI assistant:", error);

      // Provide more specific error messages based on the error type
      if (error.message && error.message.includes("404")) {
        setResponse(
          "The AI model is currently unavailable. This could be due to an API version mismatch or service outage. " +
          "Please try again later or contact support if the issue persists.\n\n" +
          "In the meantime, here are some general cybersecurity resources:\n" +
          "- NIST Cybersecurity Framework: https://www.nist.gov/cyberframework\n" +
          "- OWASP Top 10: https://owasp.org/www-project-top-ten/\n" +
          "- Cybersecurity & Infrastructure Security Agency: https://www.cisa.gov/"
        );
      } else if (error.message && error.message.includes("429")) {
        setResponse("We've reached our AI request limit. Please try again in a few minutes.");
      } else {
        setResponse("Sorry, there was an error processing your request. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
          </svg>
        </div>
        <h2 className="ml-3 text-xl font-bold text-gray-900 dark:text-white">CyberSage AI Assistant</h2>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setMode("tips")}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                mode === "tips"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              Get Tips
            </button>
            <button
              type="button"
              onClick={() => setMode("explain")}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                mode === "explain"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              Explain Concept
            </button>
            <button
              type="button"
              onClick={() => setMode("practice")}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                mode === "practice"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              Practice Questions
            </button>
            <button
              type="button"
              onClick={() => setMode("analyze")}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                mode === "analyze"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              Analyze Scenario
            </button>
          </div>

          <div className="flex items-center">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoModeEnabled}
                onChange={() => setAutoModeEnabled(!autoModeEnabled)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-700 dark:text-gray-300">Auto-detect</span>
            </label>
          </div>
        </div>

        {/* Query type detection indicator */}
        {input.trim() && autoModeEnabled && (
          <div className="mb-4 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Detected query type: </span>
            <span className="font-medium">
              {detectedQueryType === "definition" && "Definition/Explanation"}
              {detectedQueryType === "tips" && "Tips/Best Practices"}
              {detectedQueryType === "practice" && "Practice Questions"}
              {detectedQueryType === "scenario" && "Scenario Analysis"}
              {detectedQueryType === "unknown" && "Unknown (will use selected mode)"}
            </span>
          </div>
        )}

        {mode === "practice" && (
          <div className="mb-4">
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Difficulty Level:
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex items-start">
            <div className="flex-grow">
              <label htmlFor="assistant-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {mode === "tips" && "Ask for cybersecurity tips on:"}
                {mode === "explain" && "Ask to explain a cybersecurity concept:"}
                {mode === "practice" && "Generate practice questions about:"}
                {mode === "analyze" && "Describe a security scenario to analyze:"}
              </label>
              <textarea
                id="assistant-input"
                rows={3}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  mode === "tips"
                    ? "e.g., 'How to secure my home network' or 'Tips for password security'"
                    : mode === "explain"
                    ? "e.g., 'What is SIEM?' or 'Explain zero trust architecture'"
                    : mode === "practice"
                    ? "e.g., 'Network security questions' or 'Test me on encryption basics'"
                    : "e.g., 'Analyze this scenario: An employee received an email asking to verify credentials...'"
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="ml-3 mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
          <LoadingAnimation />
        </div>
      ) : response ? (
        <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
          {lastQuery && (
            <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Query: </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">"{lastQuery}"</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                    {mode === "tips" && "Tips"}
                    {mode === "explain" && "Explanation"}
                    {mode === "practice" && "Practice Questions"}
                    {mode === "analyze" && "Scenario Analysis"}
                  </span>
                </div>
              </div>
            </div>
          )}

          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Response:</h3>
          <div className="prose dark:prose-invert max-w-none overflow-auto">
            <MarkdownRenderer markdown={response} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
