import React from 'react';
import { 
  Files, 
  Search, 
  GitBranch, 
  Bug, 
  Package, 
  Settings, 
  User 
} from 'lucide-react';
import { useAppStore, ViewType } from '../store';

const ActivityBar: React.FC = () => {
  const { activeView, setActiveView } = useAppStore();

  const handleViewChange = (view: ViewType) => {
    setActiveView(view);
  };

  const views = [
    { id: 'explorer' as ViewType, icon: Files },
    { id: 'search' as ViewType, icon: Search },
    { id: 'git' as ViewType, icon: GitBranch },
    { id: 'debug' as ViewType, icon: Bug },
    { id: 'extensions' as ViewType, icon: Package },
  ];

  return (
    <div className="w-12 h-full bg-[var(--vscode-sidebar-bg)] flex flex-col items-center py-2">
      <div className="flex-1 flex flex-col items-center space-y-4">
        {views.map((view) => {
          const Icon = view.icon;
          return (
            <button
              key={view.id}
              className={`w-12 h-12 flex items-center justify-center transition-colors ${
                activeView === view.id
                  ? 'text-white border-l-2 border-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => handleViewChange(view.id)}
              title={view.id.charAt(0).toUpperCase() + view.id.slice(1)}
            >
              <Icon size={24} />
            </button>
          );
        })}
      </div>
      <div className="flex flex-col items-center space-y-4 mt-auto">
        <button className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white">
          <User size={24} />
        </button>
        <button className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white">
          <Settings size={24} />
        </button>
      </div>
    </div>
  );
};

export default ActivityBar;
