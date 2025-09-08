import { create } from 'zustand';

export type FileType = {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  language?: string;
  children?: FileType[];
  isOpen?: boolean;
  isExpanded?: boolean;
};

export type TabType = {
  id: string;
  name: string;
  content: string;
  language: string;
  isDirty: boolean;
};

export type ViewType = 'explorer' | 'search' | 'git' | 'debug' | 'extensions';
export type PanelType = 'problems' | 'output' | 'terminal' | 'debug console';

interface AppState {
  files: FileType[];
  activeFile: string | null;
  tabs: TabType[];
  activeTab: string | null;
  activeView: ViewType;
  activePanel: PanelType;
  isPanelVisible: boolean;
  
  setActiveView: (view: ViewType) => void;
  setActivePanel: (panel: PanelType) => void;
  togglePanel: () => void;
  
  addFile: (file: FileType, parentId?: string) => void;
  updateFile: (id: string, content: string) => void;
  deleteFile: (id: string) => void;
  toggleFolder: (id: string) => void;
  openFile: (id: string) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
}

// Sample initial files
const initialFiles: FileType[] = [
  {
    id: 'root',
    name: 'vscode-clone',
    type: 'folder',
    isExpanded: true,
    children: [
      {
        id: 'src',
        name: 'src',
        type: 'folder',
        isExpanded: true,
        children: [
          {
            id: 'app',
            name: 'App.tsx',
            type: 'file',
            language: 'typescript',
            content: `import React from 'react';\n\nfunction App() {\n  return (\n    <div className="App">\n      <header className="App-header">\n        <h1>VS Code Clone</h1>\n      </header>\n    </div>\n  );\n}\n\nexport default App;`
          },
          {
            id: 'index',
            name: 'index.tsx',
            type: 'file',
            language: 'typescript',
            content: `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport './index.css';\nimport App from './App';\n\nReactDOM.createRoot(document.getElementById('root')!).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);`
          },
          {
            id: 'styles',
            name: 'index.css',
            type: 'file',
            language: 'css',
            content: `body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\ncode {\n  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\n    monospace;\n}`
          }
        ]
      },
      {
        id: 'public',
        name: 'public',
        type: 'folder',
        children: [
          {
            id: 'index-html',
            name: 'index.html',
            type: 'file',
            language: 'html',
            content: `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <title>VS Code Clone</title>\n  </head>\n  <body>\n    <div id="root"></div>\n  </body>\n</html>`
          }
        ]
      },
      {
        id: 'package',
        name: 'package.json',
        type: 'file',
        language: 'json',
        content: `{\n  "name": "vscode-clone",\n  "version": "0.1.0",\n  "private": true,\n  "dependencies": {\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0"\n  }\n}`
      },
      {
        id: 'readme',
        name: 'README.md',
        type: 'file',
        language: 'markdown',
        content: `# VS Code Clone\n\nA simplified clone of Visual Studio Code built with React.\n\n## Features\n\n- File explorer\n- Basic editor functionality\n- Syntax highlighting\n- Tabs\n- Status bar\n`
      }
    ]
  }
];

export const useAppStore = create<AppState>((set) => ({
  files: initialFiles,
  activeFile: null,
  tabs: [],
  activeTab: null,
  activeView: 'explorer',
  activePanel: 'terminal',
  isPanelVisible: true,
  
  setActiveView: (view) => set({ activeView: view }),
  setActivePanel: (panel) => set({ activePanel: panel }),
  togglePanel: () => set((state) => ({ isPanelVisible: !state.isPanelVisible })),
  
  addFile: (file, parentId) => set((state) => {
    const newFiles = [...state.files];
    
    const findAndAddFile = (files: FileType[], id?: string): boolean => {
      if (!id) {
        newFiles.push(file);
        return true;
      }
      
      for (let i = 0; i < files.length; i++) {
        if (files[i].id === id) {
          if (files[i].type === 'folder') {
            files[i].children = [...(files[i].children || []), file];
            return true;
          }
          return false;
        }
        
        if (files[i].children) {
          if (findAndAddFile(files[i].children!, id)) {
            return true;
          }
        }
      }
      
      return false;
    };
    
    findAndAddFile(newFiles, parentId);
    return { files: newFiles };
  }),
  
  updateFile: (id, content) => set((state) => {
    const newFiles = [...state.files];
    const newTabs = [...state.tabs];
    
    const findAndUpdateFile = (files: FileType[]): boolean => {
      for (let i = 0; i < files.length; i++) {
        if (files[i].id === id) {
          files[i].content = content;
          
          // Update tab content if open
          const tabIndex = newTabs.findIndex(tab => tab.id === id);
          if (tabIndex !== -1) {
            newTabs[tabIndex] = { ...newTabs[tabIndex], content, isDirty: true };
          }
          
          return true;
        }
        
        if (files[i].children) {
          if (findAndUpdateFile(files[i].children!)) {
            return true;
          }
        }
      }
      
      return false;
    };
    
    findAndUpdateFile(newFiles);
    return { files: newFiles, tabs: newTabs };
  }),
  
  deleteFile: (id) => set((state) => {
    const newFiles = [...state.files];
    const newTabs = state.tabs.filter(tab => tab.id !== id);
    let newActiveTab = state.activeTab;
    
    if (state.activeTab === id) {
      newActiveTab = newTabs.length > 0 ? newTabs[0].id : null;
    }
    
    const findAndDeleteFile = (files: FileType[], parentFiles?: FileType[]): boolean => {
      for (let i = 0; i < files.length; i++) {
        if (files[i].id === id) {
          if (parentFiles) {
            parentFiles.splice(i, 1);
          }
          return true;
        }
        
        if (files[i].children) {
          if (findAndDeleteFile(files[i].children!, files[i].children)) {
            return true;
          }
        }
      }
      
      return false;
    };
    
    findAndDeleteFile(newFiles);
    return { 
      files: newFiles, 
      tabs: newTabs,
      activeTab: newActiveTab
    };
  }),
  
  toggleFolder: (id) => set((state) => {
    const newFiles = [...state.files];
    
    const findAndToggleFolder = (files: FileType[]): boolean => {
      for (let i = 0; i < files.length; i++) {
        if (files[i].id === id && files[i].type === 'folder') {
          files[i].isExpanded = !files[i].isExpanded;
          return true;
        }
        
        if (files[i].children) {
          if (findAndToggleFolder(files[i].children!)) {
            return true;
          }
        }
      }
      
      return false;
    };
    
    findAndToggleFolder(newFiles);
    return { files: newFiles };
  }),
  
  openFile: (id) => set((state) => {
    const newFiles = [...state.files];
    let fileToOpen: FileType | null = null;
    
    const findFile = (files: FileType[]): boolean => {
      for (let i = 0; i < files.length; i++) {
        if (files[i].id === id) {
          fileToOpen = files[i];
          return true;
        }
        
        if (files[i].children) {
          if (findFile(files[i].children!)) {
            return true;
          }
        }
      }
      
      return false;
    };
    
    findFile(newFiles);
    
    if (fileToOpen && fileToOpen.type === 'file') {
      // Check if tab already exists
      const existingTabIndex = state.tabs.findIndex(tab => tab.id === id);
      
      if (existingTabIndex === -1) {
        // Create new tab
        const newTab: TabType = {
          id: fileToOpen.id,
          name: fileToOpen.name,
          content: fileToOpen.content || '',
          language: fileToOpen.language || 'plaintext',
          isDirty: false
        };
        
        return {
          activeFile: id,
          tabs: [...state.tabs, newTab],
          activeTab: id
        };
      } else {
        // Just activate existing tab
        return {
          activeFile: id,
          activeTab: id
        };
      }
    }
    
    return {};
  }),
  
  closeTab: (id) => set((state) => {
    const newTabs = state.tabs.filter(tab => tab.id !== id);
    let newActiveTab = state.activeTab;
    
    if (state.activeTab === id) {
      // Set new active tab
      const closedTabIndex = state.tabs.findIndex(tab => tab.id === id);
      if (newTabs.length > 0) {
        if (closedTabIndex < newTabs.length) {
          newActiveTab = newTabs[closedTabIndex].id;
        } else {
          newActiveTab = newTabs[newTabs.length - 1].id;
        }
      } else {
        newActiveTab = null;
      }
    }
    
    return {
      tabs: newTabs,
      activeTab: newActiveTab,
      activeFile: newActiveTab
    };
  }),
  
  setActiveTab: (id) => set({
    activeTab: id,
    activeFile: id
  })
}));
