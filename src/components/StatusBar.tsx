import React from 'react';
import { GitBranch, Wifi, Bell } from 'lucide-react';

const StatusBar: React.FC = () => {
  return (
    <div className="h-6 bg-[var(--vscode-statusbar-bg)] text-[var(--vscode-statusbar-text)] flex items-center text-xs px-2">
      <div className="flex-1 flex items-center space-x-4">
        <div className="flex items-center">
          <GitBranch size={12} className="mr-1" />
          <span>main</span>
        </div>
        <div>
          <span>Ln 1, Col 1</span>
        </div>
        <div>
          <span>Spaces: 2</span>
        </div>
        <div>
          <span>UTF-8</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div>
          <span>JavaScript</span>
        </div>
        <div className="flex items-center">
          <Wifi size={12} className="mr-1" />
          <span>Live Share</span>
        </div>
        <div className="flex items-center">
          <Bell size={12} className="mr-1" />
          <span>0</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
