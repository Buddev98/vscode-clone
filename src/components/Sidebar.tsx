import React from 'react';
import { useAppStore } from '../store';
import FileExplorer from './FileExplorer';
import { Search, GitBranch, Bug, Package } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { activeView } = useAppStore();

  return (
    <div className="h-full bg-[var(--vscode-sidebar-bg)] w-full overflow-auto">
      <div className="p-2 text-sm font-medium uppercase tracking-wider text-gray-400">
        {activeView === 'explorer' && 'Explorer'}
        {activeView === 'search' && 'Search'}
        {activeView === 'git' && 'Source Control'}
        {activeView === 'debug' && 'Run and Debug'}
        {activeView === 'extensions' && 'Extensions'}
      </div>

      {activeView === 'explorer' && <FileExplorer />}
      
      {activeView === 'search' && (
        <div className="p-4 flex flex-col items-center justify-center text-gray-400">
          <Search size={48} className="mb-4 opacity-50" />
          <p className="text-center">Search functionality would go here</p>
        </div>
      )}
      
      {activeView === 'git' && (
        <div className="p-4 flex flex-col items-center justify-center text-gray-400">
          <GitBranch size={48} className="mb-4 opacity-50" />
          <p className="text-center">Git integration would go here</p>
        </div>
      )}
      
      {activeView === 'debug' && (
        <div className="p-4 flex flex-col items-center justify-center text-gray-400">
          <Bug size={48} className="mb-4 opacity-50" />
          <p className="text-center">Debugging tools would go here</p>
        </div>
      )}
      
      {activeView === 'extensions' && (
        <div className="p-4 flex flex-col items-center justify-center text-gray-400">
          <Package size={48} className="mb-4 opacity-50" />
          <p className="text-center">Extensions marketplace would go here</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
