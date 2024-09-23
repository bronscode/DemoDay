import React from 'react';
import {ReactFlowProvider} from '@xyflow/react';
import FlowView from './FlowView.tsx';

import '@xyflow/react/dist/style.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <ReactFlowProvider>
        <FlowView/>
        </ReactFlowProvider>
    </div>
  );
}

export default App