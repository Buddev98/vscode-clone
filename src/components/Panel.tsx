import React from 'react';
import { X, Terminal, AlertCircle, Info, Play } from 'lucide-react';
import { useAppStore, PanelType } from '../store';

const Panel: React.FC = () => {
  const { activePanel, setActivePanel, togglePanel } = useAppStore();

  const panels = [
    { id: 'problems' as PanelType, icon: AlertCircle, label: 'Problems' },
    { id: 'output' as PanelType, icon: Info, label: 'Output' },
    { id: 'terminal' as PanelType, icon: Terminal, label: 'Terminal' },
    { id: 'debug console' as PanelType, icon: Play, label: 'Debug Console' },
  ];

  return (
    <div className="h-full flex flex-col bg-[var(--vscode-panel-bg)] border-t border-[var(--vscode-panel-border)]">
      <div className="flex bg-[var(--vscode-panel-bg)] border-b border-[var(--vscode-panel-border)]">
        {panels.map((panel) => {
          const Icon = panel.icon;
          return (
            <button
              key={panel.id}
              className={`
                flex items-center px-3 py-1 text-xs
                ${activePanel === panel.id 
                  ? 'border-b-2 border-[var(--vscode-blue)] text-white' 
                  : 'text-gray-400 hover:text-white'}
              `}
              onClick={() => setActivePanel(panel.id)}
            >
              <Icon size={14} className="mr-1" />
              <span>{panel.label}</span>
            </button>
          );
        })}
        <div className="flex-1"></div>
        <button
          className="px-2 py-1 text-gray-400 hover:text-white"
          onClick={togglePanel}
        >
          <X size={14} />
        </button>
      </div>
      <div className="flex-1 p-2 overflow-auto">
        {activePanel === 'problems' && (
          <div className="text-sm text-gray-400">
            <p>No problems have been detected in the workspace.</p>
          </div>
        )}
        
        {activePanel === 'output' && (
          <div className="text-sm text-gray-400">
            <p>No output to display.</p>
          </div>
        )}
        
        {activePanel === 'terminal' && (
          <div className="text-sm font-mono">
            <p className="text-green-500">$ npm start</p>
            <p className="text-gray-400">{`> vscode-clone@0.1.0 start`}</p>
            <p className="text-gray-400">{`> react-scripts start`}</p>
            <p className="text-blue-400">Starting development server...</p>
            <p className="text-blue-400">Compiled successfully!</p>
            <p className="text-white">You can now view vscode-clone in the browser.</p>
            <p className="text-white">  Local:            http://localhost:3000</p>
            <p className="text-white">  On Your Network:  http://192.168.1.5:3000</p>
            <p className="text-gray-400">Note that the development build is not optimized.</p>
            <p className="text-gray-400">To create a production build, use npm run build.</p>
            <p className="text-gray-400">webpack compiled successfully</p>
            <p className="text-white">$</p>
          </div>
        )}
        
        {activePanel === 'debug console' && (
          <div className="text-sm text-gray-400">
            <p>Debug console is ready.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Panel;
