import React from 'react';
import { X } from 'lucide-react';
import { useAppStore } from '../store';

const TabBar: React.FC = () => {
  const { tabs, activeTab, closeTab, setActiveTab } = useAppStore();

  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className="flex bg-[var(--vscode-tab-inactive-bg)] border-b border-[var(--vscode-tab-border)]">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`
            flex items-center px-3 py-1 border-r border-[var(--vscode-tab-border)]
            ${activeTab === tab.id 
              ? 'bg-[var(--vscode-tab-active-bg)] text-white' 
              : 'bg-[var(--vscode-tab-inactive-bg)] text-gray-400 hover:text-white'}
          `}
          onClick={() => setActiveTab(tab.id)}
        >
          <span className="text-sm mr-2">{tab.name}{tab.isDirty ? ' •' : ''}</span>
          <button
            className="opacity-50 hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              closeTab(tab.id);
            }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TabBar;
