"use client";

import React from 'react';

interface MarkdownRendererProps {
  markdown: string;
}

export default function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  // Process the markdown to handle different elements
  const renderMarkdown = () => {
    // Split the markdown into lines
    const lines = markdown.split('\n');

    // Initialize variables to track state
    let result = [];
    let inList = false;
    let listItems = [];
    let currentHeadingLevel = 0;
    let inCodeBlock = false;
    let codeBlockContent = [];
    let codeBlockLanguage = '';

    // Process each line
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Handle code blocks
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          // Start of code block
          inCodeBlock = true;
          codeBlockContent = [];
          codeBlockLanguage = line.slice(3).trim();
        } else {
          // End of code block
          inCodeBlock = false;
          result.push(
            <div key={`code-${i}`} className="my-4 rounded-md overflow-hidden">
              <div className="bg-gray-800 text-gray-200 px-4 py-2 text-sm font-mono">
                {codeBlockContent.map((codeLine, index) => (
                  <div key={index}>{codeLine}</div>
                ))}
              </div>
            </div>
          );
        }
        continue;
      }

      // If we're in a code block, add the line to the code block content
      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }

      // Handle headings (## Heading)
      if (line.startsWith('##')) {
        // If we were in a list, add the list to the result
        if (inList) {
          result.push(<ul key={`list-${i}`} className="list-disc pl-6 mb-4">{listItems}</ul>);
          inList = false;
          listItems = [];
        }

        // Count the number of # to determine heading level
        const match = line.match(/^(#+)\s+(.+)$/);
        if (match) {
          const level = match[1].length;
          const text = match[2];

          // Create appropriate heading element
          if (level === 2) {
            result.push(
              <h2 key={`h2-${i}`} className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-6 mb-3">
                {text}
              </h2>
            );
          } else if (level === 3) {
            result.push(
              <h3 key={`h3-${i}`} className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-5 mb-2">
                {text}
              </h3>
            );
          } else if (level === 4) {
            result.push(
              <h4 key={`h4-${i}`} className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-4 mb-2">
                {text}
              </h4>
            );
          }

          currentHeadingLevel = level;
        }
      }
      // Handle list items (- Item or * Item or 1. Item)
      else if (line.match(/^\s*[\-\*]\s+(.+)$/) || line.match(/^\s*\d+\.\s+(.+)$/)) {
        if (!inList) {
          inList = true;
          listItems = [];
        }

        const match = line.match(/^\s*[\-\*\d+\.]\s+(.+)$/);
        if (match) {
          const text = match[1];

          // Check for bold text within list items
          const boldMatch = text.match(/\*\*([^*]+)\*\*:?\s*(.*)/);
          if (boldMatch) {
            listItems.push(
              <li key={`li-${i}`} className="mb-2">
                <span className="font-bold">{boldMatch[1]}</span>
                {boldMatch[2] ? `: ${boldMatch[2]}` : ''}
              </li>
            );
          } else {
            listItems.push(<li key={`li-${i}`} className="mb-2">{text}</li>);
          }
        }
      }
      // Handle bold text (**Bold**), inline code (`code`), and links ([text](url))
      else if (line.match(/\*\*([^*]+)\*\*/) || line.match(/`([^`]+)`/) || line.match(/\[([^\]]+)\]\(([^)]+)\)/)) {
        // If we were in a list, add the list to the result
        if (inList) {
          result.push(<ul key={`list-${i}`} className="list-disc pl-6 mb-4">{listItems}</ul>);
          inList = false;
          listItems = [];
        }

        const parts = [];
        let lastIndex = 0;

        // Process bold text
        let boldMatch;
        const boldRegex = /\*\*([^*]+)\*\*/g;

        // Process inline code
        let codeMatch;
        const codeRegex = /`([^`]+)`/g;

        // Process links
        let linkMatch;
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

        // Find all matches and their positions
        const matches = [];

        while ((boldMatch = boldRegex.exec(line)) !== null) {
          matches.push({ type: 'bold', match: boldMatch, index: boldMatch.index, length: boldMatch[0].length, content: boldMatch[1] });
        }

        while ((codeMatch = codeRegex.exec(line)) !== null) {
          matches.push({ type: 'code', match: codeMatch, index: codeMatch.index, length: codeMatch[0].length, content: codeMatch[1] });
        }

        while ((linkMatch = linkRegex.exec(line)) !== null) {
          matches.push({ type: 'link', match: linkMatch, index: linkMatch.index, length: linkMatch[0].length, text: linkMatch[1], url: linkMatch[2] });
        }

        // Sort matches by their position in the string
        matches.sort((a, b) => a.index - b.index);

        // Process matches in order
        for (const match of matches) {
          // Add text before the match
          if (match.index > lastIndex) {
            parts.push(<span key={`text-${i}-${lastIndex}`}>{line.substring(lastIndex, match.index)}</span>);
          }

          // Add the formatted element based on type
          if (match.type === 'bold') {
            parts.push(<strong key={`bold-${i}-${match.index}`} className="font-bold">{match.content}</strong>);
          } else if (match.type === 'code') {
            parts.push(<code key={`code-${i}-${match.index}`} className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded font-mono text-sm">{match.content}</code>);
          } else if (match.type === 'link') {
            parts.push(
              <a
                key={`link-${i}-${match.index}`}
                href={match.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {match.text}
              </a>
            );
          }

          lastIndex = match.index + match.length;
        }

        // Add any remaining text
        if (lastIndex < line.length) {
          parts.push(<span key={`text-${i}-${lastIndex}`}>{line.substring(lastIndex)}</span>);
        }

        result.push(<p key={`p-${i}`} className="mb-3">{parts}</p>);
      }
      // Handle empty lines
      else if (line.trim() === '') {
        // If we were in a list, add the list to the result
        if (inList) {
          result.push(<ul key={`list-${i}`} className="list-disc pl-6 mb-4">{listItems}</ul>);
          inList = false;
          listItems = [];
        }

        // Add a spacer
        result.push(<div key={`spacer-${i}`} className="h-2"></div>);
      }
      // Handle regular text
      else {
        // If we were in a list, add the list to the result
        if (inList) {
          result.push(<ul key={`list-${i}`} className="list-disc pl-6 mb-4">{listItems}</ul>);
          inList = false;
          listItems = [];
        }

        result.push(<p key={`p-${i}`} className="mb-3">{line}</p>);
      }
    }

    // If we ended while still in a list, add the list to the result
    if (inList) {
      result.push(<ul key="list-final" className="list-disc pl-6 mb-4">{listItems}</ul>);
    }

    return result;
  };

  return (
    <div className="markdown-content text-gray-700 dark:text-gray-300">
      {renderMarkdown()}
    </div>
  );
}
