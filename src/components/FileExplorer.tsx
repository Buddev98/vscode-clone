import React from 'react';
import { ChevronDown, ChevronRight, File, Folder } from 'lucide-react';
import { useAppStore, FileType } from '../store';

const FileExplorer: React.FC = () => {
  const { files, toggleFolder, openFile } = useAppStore();

  const renderFileTree = (files: FileType[]) => {
    return files.map((file) => (
      <div key={file.id} className="select-none">
        {file.type === 'folder' ? (
          <div>
            <div
              className="flex items-center py-1 px-2 hover:bg-[var(--vscode-sidebar-active)] cursor-pointer"
              onClick={() => toggleFolder(file.id)}
            >
              <span className="mr-1">
                {file.isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </span>
              <Folder size={16} className="mr-2 text-blue-400" />
              <span className="text-sm">{file.name}</span>
            </div>
            {file.isExpanded && file.children && (
              <div className="pl-4">{renderFileTree(file.children)}</div>
            )}
          </div>
        ) : (
          <div
            className="flex items-center py-1 px-2 hover:bg-[var(--vscode-sidebar-active)] cursor-pointer"
            onClick={() => openFile(file.id)}
          >
            <span className="w-4 mr-1"></span>
            <File size={16} className="mr-2 text-gray-400" />
            <span className="text-sm">{file.name}</span>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="p-1">
      {renderFileTree(files)}
    </div>
  );
};

export default FileExplorer;
