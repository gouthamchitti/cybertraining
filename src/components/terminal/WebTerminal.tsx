import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { io, Socket } from 'socket.io-client';
import 'xterm/css/xterm.css';

interface WebTerminalProps {
  sessionId: string;
  token: string;
  environmentId: string;
  onClose?: () => void;
}

const WebTerminal: React.FC<WebTerminalProps> = ({ 
  sessionId, 
  token, 
  environmentId,
  onClose 
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [terminal, setTerminal] = useState<Terminal | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize terminal
    const term = new Terminal({
      cursorBlink: true,
      theme: {
        background: '#1e1e1e',
        foreground: '#f0f0f0'
      },
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      fontSize: 14,
      lineHeight: 1.2,
      scrollback: 1000
    });

    // Add addons
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.loadAddon(new WebLinksAddon());

    // Open terminal
    if (terminalRef.current) {
      term.open(terminalRef.current);
      fitAddon.fit();
      setTerminal(term);
    }

    // Connect to socket server
    const socketInstance = io(process.env.NEXT_PUBLIC_TERMINAL_SERVICE_URL || 'http://localhost:3001');
    setSocket(socketInstance);

    // Handle window resize
    const handleResize = () => {
      if (fitAddon) {
        fitAddon.fit();
        if (socketInstance && connected) {
          socketInstance.emit('resize', { 
            cols: term.cols, 
            rows: term.rows 
          });
        }
      }
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      term.dispose();
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!socket || !terminal) return;

    // Authenticate with the server
    socket.emit('authenticate', { token, sessionId, environmentId });

    // Handle socket events
    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('ready', (data) => {
      console.log('Terminal ready', data);
      setConnected(true);
      terminal.focus();

      // Handle terminal input
      terminal.onData((data) => {
        socket.emit('input', data);
      });
    });

    socket.on('output', (data) => {
      terminal.write(data);
    });

    socket.on('error', (data) => {
      console.error('Terminal error:', data);
      setError(data.message);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      setConnected(false);
      setError('Connection to terminal server lost');
    });

    return () => {
      socket.off('connect');
      socket.off('ready');
      socket.off('output');
      socket.off('error');
      socket.off('disconnect');
    };
  }, [socket, terminal, token, sessionId, environmentId]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center bg-gray-800 text-white px-4 py-2">
        <div className="text-sm">
          {connected ? (
            <span className="text-green-400">● Connected</span>
          ) : (
            <span className="text-red-400">● Disconnected</span>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              if (terminal) {
                terminal.clear();
              }
            }}
            className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded"
          >
            Clear
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-2 py-1 text-xs bg-red-700 hover:bg-red-600 rounded"
            >
              Close
            </button>
          )}
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 text-sm">
          Error: {error}
        </div>
      )}
      
      <div 
        ref={terminalRef} 
        className="flex-1 overflow-hidden"
        style={{ height: 'calc(100% - 40px)' }}
      />
    </div>
  );
};

export default WebTerminal;
