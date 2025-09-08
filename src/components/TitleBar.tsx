import React from 'react';
import { 
  Minimize2, 
  Square, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  RefreshCw 
} from 'lucide-react';

const TitleBar: React.FC = () => {
  return (
    <div className="h-8 bg-[var(--vscode-titlebar-bg)] text-[var(--vscode-titlebar-text)] flex items-center">
      <div className="flex-1 flex items-center px-2">
        <div className="flex space-x-2 mr-4">
          <button className="p-1 rounded hover:bg-gray-700">
            <ChevronLeft size={16} />
          </button>
          <button className="p-1 rounded hover:bg-gray-700">
            <ChevronRight size={16} />
          </button>
          <button className="p-1 rounded hover:bg-gray-700">
            <RefreshCw size={16} />
          </button>
        </div>
        <div className="flex space-x-2 text-sm">
          <span>File</span>
          <span>Edit</span>
          <span>Selection</span>
          <span>View</span>
          <span>Go</span>
          <span>Run</span>
          <span>Terminal</span>
          <span>Help</span>
        </div>
      </div>
      <div className="text-center text-sm flex-1">
        VS Code Clone - React
      </div>
      <div className="flex-1 flex justify-end">
        <button className="w-12 h-8 flex items-center justify-center hover:bg-gray-700">
          <Minimize2 size={16} />
        </button>
        <button className="w-12 h-8 flex items-center justify-center hover:bg-gray-700">
          <Square size={16} />
        </button>
        <button className="w-12 h-8 flex items-center justify-center hover:bg-red-700">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
