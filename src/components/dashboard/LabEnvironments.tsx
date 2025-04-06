import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';

interface LabEnvironmentsProps {
  userId: string;
}

interface Environment {
  id: string;
  environment_type: string;
  access_url: string;
  credentials: {
    username: string;
    password: string;
  };
  expiration_time: string;
}

interface EnvironmentType {
  id: string;
  name: string;
  description: string;
}

const LabEnvironments: React.FC<LabEnvironmentsProps> = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [environmentTypes, setEnvironmentTypes] = useState<EnvironmentType[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [moduleId, setModuleId] = useState<string>('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCredentials, setShowCredentials] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchEnvironments = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would call your environment proxy API
        const { data, error } = await supabase
          .from('environments')
          .select('*')
          .eq('user_id', userId)
          .eq('status', 'active');
        
        if (error) throw error;
        
        setEnvironments(data || []);
        
        // Fetch environment types
        const { data: typesData, error: typesError } = await supabase
          .from('environment_types')
          .select('*');
        
        if (typesError) throw typesError;
        
        setEnvironmentTypes(typesData || []);
      } catch (error) {
        console.error('Error fetching environments:', error);
        setError('Failed to load lab environments');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchEnvironments();
    }
  }, [userId]);

  const createEnvironment = async () => {
    if (!selectedType) {
      setError('Please select an environment type');
      return;
    }

    setCreating(true);
    setError(null);

    try {
      // In a real implementation, this would call your environment proxy API
      const { data, error } = await supabase
        .from('environments')
        .insert({
          user_id: userId,
          environment_type: selectedType,
          module_id: moduleId || null,
          expiration_time: new Date(Date.now() + duration * 60000).toISOString(),
          status: 'active',
          access_url: `ssh://student@localhost:22${environmentTypes.findIndex(t => t.id === selectedType) + 1}`,
          credentials: {
            username: 'student',
            password: 'cyberstudent'
          }
        })
        .select();
      
      if (error) throw error;
      
      setEnvironments([...(data || []), ...environments]);
      setSelectedType('');
      setModuleId('');
    } catch (error) {
      console.error('Error creating environment:', error);
      setError('Failed to create lab environment');
    } finally {
      setCreating(false);
    }
  };

  const terminateEnvironment = async (id: string) => {
    try {
      // In a real implementation, this would call your environment proxy API
      const { error } = await supabase
        .from('environments')
        .update({ status: 'terminated' })
        .eq('id', id);
      
      if (error) throw error;
      
      setEnvironments(environments.filter(env => env.id !== id));
    } catch (error) {
      console.error('Error terminating environment:', error);
      setError('Failed to terminate lab environment');
    }
  };

  const toggleCredentials = (id: string) => {
    setShowCredentials({
      ...showCredentials,
      [id]: !showCredentials[id]
    });
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2.5"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2.5"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2.5"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Lab Environments
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
          Access hands-on practice environments for cybersecurity training
        </p>
      </div>

      {/* Active Environments */}
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Your Active Environments
        </h4>
        
        {environments.length > 0 ? (
          <div className="space-y-4">
            {environments.map((env) => (
              <div 
                key={env.id}
                className="border border-gray-200 dark:border-gray-700 rounded-md p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                      {environmentTypes.find(t => t.id === env.environment_type)?.name || env.environment_type}
                    </h5>
                    {env.module_id && (
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        For module: {env.module_id}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => terminateEnvironment(env.id)}
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 dark:text-red-200 dark:bg-red-900/50 dark:hover:bg-red-900/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Terminate
                  </button>
                </div>
                
                <div className="mt-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Access URL: <span className="font-mono text-xs">{env.access_url}</span>
                  </p>
                  
                  <div className="mt-2">
                    <button
                      onClick={() => toggleCredentials(env.id)}
                      className="text-xs text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      {showCredentials[env.id] ? 'Hide Credentials' : 'Show Credentials'}
                    </button>
                    
                    {showCredentials[env.id] && (
                      <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded text-xs">
                        <p className="text-gray-700 dark:text-gray-300">
                          Username: <span className="font-mono">{env.credentials.username}</span>
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          Password: <span className="font-mono">{env.credentials.password}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  Expires: {new Date(env.expiration_time).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No active environments. Create one below to start practicing.
          </p>
        )}
      </div>

      {/* Create New Environment */}
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Create New Environment
        </h4>
        
        {error && (
          <div className="mb-4 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded text-sm text-red-700 dark:text-red-300">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label htmlFor="environment-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Environment Type
            </label>
            <select
              id="environment-type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select an environment</option>
              {environmentTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="module-id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Module ID (optional)
            </label>
            <input
              type="text"
              id="module-id"
              value={moduleId}
              onChange={(e) => setModuleId(e.target.value)}
              className="mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g., w1-p1-m2"
            />
          </div>
          
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Duration (minutes)
            </label>
            <select
              id="duration"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
              <option value={240}>4 hours</option>
            </select>
          </div>
          
          <div>
            <button
              onClick={createEnvironment}
              disabled={creating || !selectedType}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {creating ? 'Creating...' : 'Create Environment'}
            </button>
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">
          How to Connect
        </h4>
        <div className="prose dark:prose-invert max-w-none text-sm">
          <p>
            To connect to your lab environment, you can use:
          </p>
          <ul>
            <li>
              <strong>SSH Client:</strong> Use a terminal or SSH client like PuTTY to connect using the provided access URL and credentials.
            </li>
            <li>
              <strong>Web Terminal:</strong> For environments with web interfaces, simply click on the access URL to open in your browser.
            </li>
          </ul>
          <p>
            <strong>Note:</strong> Lab environments are automatically terminated after the specified duration to conserve resources.
            Make sure to save your work before the environment expires.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LabEnvironments;
