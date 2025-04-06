"use client";

import { useState } from 'react';
import { FiChevronRight, FiChevronDown, FiCheckCircle, FiHelpCircle, FiAlertTriangle, FiClock } from 'react-icons/fi';
import TerminalSimulator from './TerminalSimulator';

interface Task {
  id: string;
  title: string;
  description: string;
  command: string;
  hint?: string;
  completed: boolean;
}

interface GuidedLabProps {
  labId: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  objectives: string[];
  prerequisites?: string[];
  tasks: Task[];
}

const GuidedLab: React.FC<GuidedLabProps> = ({
  labId,
  title,
  description,
  difficulty,
  estimatedTime,
  objectives,
  prerequisites = [],
  tasks: initialTasks,
}) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeSection, setActiveSection] = useState<'overview' | 'tasks' | 'resources'>('overview');
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});
  
  // Calculate progress
  const completedTasks = tasks.filter(task => task.completed).length;
  const progressPercentage = (completedTasks / tasks.length) * 100;
  
  // Handle task completion
  const handleTaskComplete = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
  };
  
  // Toggle hint visibility
  const toggleHint = (taskId: string) => {
    setShowHint(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };
  
  // Get difficulty color
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      {/* Lab Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor()}`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
              <FiClock className="mr-1" />
              {estimatedTime}
            </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{completedTasks}/{tasks.length} tasks</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="mt-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveSection('overview')}
              className={`${
                activeSection === 'overview'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveSection('tasks')}
              className={`${
                activeSection === 'tasks'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Tasks
            </button>
            <button
              onClick={() => setActiveSection('resources')}
              className={`${
                activeSection === 'resources'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Resources
            </button>
          </nav>
        </div>
      </div>
      
      {/* Lab Content */}
      <div className="p-6">
        {activeSection === 'overview' && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Lab Objectives</h2>
            <ul className="space-y-2 mb-6">
              {objectives.map((objective, index) => (
                <li key={index} className="flex items-start">
                  <FiChevronRight className="mt-1 mr-2 text-indigo-500" />
                  <span className="text-gray-700 dark:text-gray-300">{objective}</span>
                </li>
              ))}
            </ul>
            
            {prerequisites.length > 0 && (
              <>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Prerequisites</h2>
                <ul className="space-y-2 mb-6">
                  {prerequisites.map((prerequisite, index) => (
                    <li key={index} className="flex items-start">
                      <FiChevronRight className="mt-1 mr-2 text-indigo-500" />
                      <span className="text-gray-700 dark:text-gray-300">{prerequisite}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            
            <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiAlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700 dark:text-yellow-200">
                    This is a simulated lab environment. All commands are executed in a safe, isolated environment.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <button
                onClick={() => setActiveSection('tasks')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Start Lab
              </button>
            </div>
          </div>
        )}
        
        {activeSection === 'tasks' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tasks List */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Lab Tasks</h2>
              
              {tasks.map((task, index) => (
                <div 
                  key={task.id} 
                  className={`bg-white dark:bg-gray-800 border rounded-lg overflow-hidden ${
                    task.completed 
                      ? 'border-green-200 dark:border-green-900' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                        task.completed 
                          ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                      }`}>
                        {task.completed ? <FiCheckCircle /> : index + 1}
                      </div>
                      <div className="ml-3 flex-1">
                        <h3 className={`text-base font-medium ${
                          task.completed 
                            ? 'text-green-800 dark:text-green-200' 
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {task.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{task.description}</p>
                        
                        {task.hint && (
                          <div className="mt-3">
                            <button
                              onClick={() => toggleHint(task.id)}
                              className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
                            >
                              <FiHelpCircle className="mr-1" />
                              {showHint[task.id] ? 'Hide Hint' : 'Show Hint'}
                            </button>
                            
                            {showHint[task.id] && (
                              <div className="mt-2 p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-md text-sm text-indigo-700 dark:text-indigo-300">
                                {task.hint}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Terminal */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Lab Terminal</h2>
              <TerminalSimulator 
                labId={labId}
                tasks={tasks.map(task => ({
                  id: task.id,
                  description: task.title,
                  command: task.command,
                  completed: task.completed
                }))}
                onTaskComplete={handleTaskComplete}
              />
            </div>
          </div>
        )}
        
        {activeSection === 'resources' && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Additional Resources</h2>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="p-4">
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">Command Reference</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Quick reference for commands used in this lab
                  </p>
                  <div className="mt-3">
                    <button
                      onClick={() => {}}
                      className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
                    >
                      <FiChevronDown className="mr-1" />
                      View Commands
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="p-4">
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">Related Documentation</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    External documentation and tutorials
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li>
                      <a 
                        href="#" 
                        className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
                      >
                        Official Documentation
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#" 
                        className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
                      >
                        Tutorial: Getting Started
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#" 
                        className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
                      >
                        Common Troubleshooting
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="p-4">
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">Downloadable Resources</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Files and resources for this lab
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li>
                      <a 
                        href="#" 
                        className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
                      >
                        Lab Cheat Sheet (PDF)
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#" 
                        className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
                      >
                        Sample Files (ZIP)
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuidedLab;
