import React from 'react';
import SimpleCodeEditor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-json';
// Remove the problematic import
// import 'prismjs/components/prism-html';
import { useAppStore } from '../store';

interface EditorProps {
  content: string;
  language: string;
  fileId: string;
}

const Editor: React.FC<EditorProps> = ({ content, language, fileId }) => {
  const { updateFile } = useAppStore();

  const getLanguage = (lang: string) => {
    switch (lang) {
      case 'javascript':
        return languages.javascript;
      case 'typescript':
        return languages.typescript;
      case 'jsx':
        return languages.jsx;
      case 'tsx':
        return languages.tsx;
      case 'css':
        return languages.css;
      case 'markdown':
        return languages.markdown;
      case 'json':
        return languages.json;
      case 'html':
        // Fall back to markup for HTML
        return languages.markup || languages.javascript;
      default:
        return languages.javascript;
    }
  };

  const handleCodeChange = (code: string) => {
    updateFile(fileId, code);
  };

  return (
    <div className="editor-container">
      <SimpleCodeEditor
        value={content}
        onValueChange={handleCodeChange}
        highlight={code => highlight(code, getLanguage(language), language)}
        padding={10}
        className="editor"
        style={{
          fontFamily: '"Fira Code", "Consolas", monospace',
          fontSize: 14,
          backgroundColor: 'var(--vscode-editor-bg)',
          color: 'var(--vscode-text)',
        }}
      />
    </div>
  );
};

export default Editor;
