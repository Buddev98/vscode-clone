import React, { useState } from 'react';
import SplitPane from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import { 
  ActivityBar, 
  Sidebar, 
  EditorArea, 
  StatusBar, 
  TitleBar, 
  Panel 
} from './components';
import { useAppStore } from './store';

const App: React.FC = () => {
  const [mainSizes, setMainSizes] = useState<(number | string)[]>([250, 'auto']);
  const [editorPanelSizes, setEditorPanelSizes] = useState<(number | string)[]>(['auto', 200]);
  const { activeView, togglePanel, isPanelVisible } = useAppStore();

  return (
    <div className="flex flex-col h-screen">
      <TitleBar />
      
      <div className="flex-1 flex overflow-hidden">
        <SplitPane
          split="vertical"
          sizes={mainSizes}
          onChange={setMainSizes}
          sashRender={() => <div className="split-pane-divider" />}
        >
          <div className="flex h-full">
            <ActivityBar />
            <Sidebar />
          </div>
          
          <SplitPane
            split="horizontal"
            sizes={isPanelVisible ? editorPanelSizes : ['auto', 0]}
            onChange={setEditorPanelSizes}
            sashRender={() => <div className="horizontal-split-pane-divider" />}
          >
            <EditorArea />
            {isPanelVisible && <Panel />}
          </SplitPane>
        </SplitPane>
      </div>
      
      <StatusBar />
    </div>
  );
};

export default App;
