import React, { useState } from "react";
import CodeEditorPanel from "./CodeEditorPanel";
import VisualizationPreview from "./VisualizationPreview";
import "./App.css";

function App() {
  // We'll store the "preview" URL or content in App state
  const [previewContent, setPreviewContent] = useState(null);

  // Callback for when user clicks "Generate Visualization"
  // This is where you'd actually call your backend, run the script, etc.
  const handleGenerateVisualization = (generatedUrlOrHtml) => {
    setPreviewContent(generatedUrlOrHtml);
  };

  return (
    <div className="app-container">
      <div className="left-panel">
        <CodeEditorPanel onGenerate={handleGenerateVisualization} />
      </div>
      <div className="right-panel">
        <VisualizationPreview content={previewContent} />
      </div>
    </div>
  );
}

export default App;
