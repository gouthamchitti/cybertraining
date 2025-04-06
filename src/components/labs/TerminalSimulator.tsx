"use client";

import { useState, useEffect, useRef } from 'react';
import { FiTerminal, FiMaximize2, FiMinimize2, FiX, FiCheck, FiClipboard } from 'react-icons/fi';

interface TerminalSimulatorProps {
  labId: string;
  initialCommands?: string[];
  expectedOutputs?: Record<string, string>;
  tasks?: { id: string; description: string; command: string; completed: boolean }[];
  onTaskComplete?: (taskId: string) => void;
}

const TerminalSimulator: React.FC<TerminalSimulatorProps> = ({
  labId,
  initialCommands = [],
  expectedOutputs = {},
  tasks = [],
  onTaskComplete
}) => {
  const [history, setHistory] = useState<{ type: 'input' | 'output', content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTasks, setCurrentTasks] = useState(tasks);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Initialize terminal with welcome message
  useEffect(() => {
    setHistory([
      { type: 'output', content: 'Welcome to CyberTrainer Terminal Simulator' },
      { type: 'output', content: `Lab ID: ${labId}` },
      { type: 'output', content: 'Type "help" for available commands.' },
      { type: 'output', content: '' }
    ]);

    // Add initial commands if provided
    if (initialCommands.length > 0) {
      const initialHistory = initialCommands.flatMap(cmd => [
        { type: 'input' as const, content: cmd },
        { type: 'output' as const, content: processCommand(cmd) }
      ]);
      setHistory(prev => [...prev, ...initialHistory]);
    }
  }, [labId, initialCommands]);

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when terminal is clicked
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Process command and return output
  const processCommand = (cmd: string): string => {
    const command = cmd.trim().toLowerCase();
    
    // Check if this command completes a task
    const taskIndex = currentTasks.findIndex(task => 
      !task.completed && task.command.toLowerCase() === command
    );
    
    if (taskIndex !== -1 && onTaskComplete) {
      const newTasks = [...currentTasks];
      newTasks[taskIndex].completed = true;
      setCurrentTasks(newTasks);
      onTaskComplete(currentTasks[taskIndex].id);
    }

    // Basic command processing
    if (command === '') {
      return '';
    } else if (command === 'help') {
      return `Available commands:
help - Display this help message
clear - Clear the terminal
ls - List files in current directory
pwd - Print working directory
whoami - Display current user
echo [text] - Display text
cat [file] - Display file content
tasks - Show current lab tasks`;
    } else if (command === 'clear') {
      setTimeout(() => {
        setHistory([]);
      }, 100);
      return '';
    } else if (command === 'ls') {
      return 'file1.txt  file2.txt  directory1/  directory2/';
    } else if (command === 'pwd') {
      return '/home/user';
    } else if (command === 'whoami') {
      return 'student';
    } else if (command.startsWith('echo ')) {
      return command.substring(5);
    } else if (command.startsWith('cat ')) {
      const file = command.substring(4).trim();
      if (file === 'file1.txt') {
        return 'This is the content of file1.txt';
      } else if (file === 'file2.txt') {
        return 'This is the content of file2.txt';
      } else {
        return `cat: ${file}: No such file or directory`;
      }
    } else if (command === 'tasks') {
      if (currentTasks.length === 0) {
        return 'No tasks assigned for this lab.';
      }
      return currentTasks.map((task, index) => 
        `${index + 1}. ${task.description} ${task.completed ? '✓' : ''}`
      ).join('\n');
    } else if (expectedOutputs[command]) {
      return expectedOutputs[command];
    } else {
      return `Command not found: ${command}. Type "help" for available commands.`;
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() === '') return;
    
    const newInput = { type: 'input' as const, content: input };
    const output = { type: 'output' as const, content: processCommand(input) };
    
    setHistory(prev => [...prev, newInput, output]);
    setInput('');
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Copy terminal content to clipboard
  const copyToClipboard = () => {
    const content = history
      .map(item => item.type === 'input' ? `$ ${item.content}` : item.content)
      .join('\n');
    
    navigator.clipboard.writeText(content)
      .then(() => {
        // Add a temporary message to the terminal
        setHistory(prev => [...prev, { type: 'output', content: 'Terminal content copied to clipboard!' }]);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        setHistory(prev => [...prev, { type: 'output', content: 'Failed to copy terminal content.' }]);
      });
  };

  return (
    <div 
      className={`bg-gray-900 text-gray-100 rounded-lg overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50' : 'relative'
      }`}
    >
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <FiTerminal className="mr-2" />
          <span className="font-mono text-sm">Terminal - {labId}</span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={copyToClipboard}
            className="text-gray-400 hover:text-white transition-colors"
            title="Copy to clipboard"
          >
            <FiClipboard size={16} />
          </button>
          <button 
            onClick={toggleFullscreen}
            className="text-gray-400 hover:text-white transition-colors"
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <FiMinimize2 size={16} /> : <FiMaximize2 size={16} />}
          </button>
          {isFullscreen && (
            <button 
              onClick={() => setIsFullscreen(false)}
              className="text-gray-400 hover:text-white transition-colors"
              title="Close"
            >
              <FiX size={16} />
            </button>
          )}
        </div>
      </div>
      
      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="font-mono text-sm p-4 h-80 overflow-y-auto cursor-text"
        onClick={focusInput}
      >
        {history.map((item, index) => (
          <div key={index} className="mb-1">
            {item.type === 'input' ? (
              <div className="flex">
                <span className="text-green-500 mr-2">$</span>
                <span>{item.content}</span>
              </div>
            ) : (
              <div className="pl-4 whitespace-pre-wrap">{item.content}</div>
            )}
          </div>
        ))}
        
        {/* Current input line */}
        <div className="flex items-center">
          <span className="text-green-500 mr-2">$</span>
          <form onSubmit={handleSubmit} className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent outline-none w-full"
              autoFocus
            />
          </form>
        </div>
      </div>
      
      {/* Tasks Panel (if tasks are provided) */}
      {currentTasks.length > 0 && (
        <div className="border-t border-gray-700 bg-gray-800 p-4">
          <h3 className="text-sm font-semibold mb-2">Lab Tasks</h3>
          <ul className="space-y-2">
            {currentTasks.map((task) => (
              <li key={task.id} className="flex items-start">
                <div className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mr-2 ${
                  task.completed ? 'bg-green-500' : 'border border-gray-600'
                }`}>
                  {task.completed && <FiCheck size={12} />}
                </div>
                <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TerminalSimulator;
