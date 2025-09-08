import React from 'react';
import TabBar from './TabBar';
import Editor from './Editor';
import { useAppStore } from '../store';

const EditorArea: React.FC = () => {
  const { tabs, activeTab } = useAppStore();
  
  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="h-full flex flex-col bg-[var(--vscode-editor-bg)]">
      <TabBar />
      <div className="flex-1 overflow-hidden">
        {activeTabData ? (
          <Editor 
            content={activeTabData.content} 
            language={activeTabData.language} 
            fileId={activeTabData.id} 
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <h2 className="text-2xl mb-2">VS Code Clone</h2>
              <p className="text-sm">Open a file from the explorer to start editing</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorArea;
