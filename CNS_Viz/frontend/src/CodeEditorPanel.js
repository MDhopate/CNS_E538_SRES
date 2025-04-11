import React, { useState } from "react";
import axios from "axios";

function CodeEditorPanel({ onGenerate }) {
  const [language, setLanguage] = useState("Python");
  const [library, setLibrary] = useState("Matplotlib, Plotly");
  const [vizType, setVizType] = useState("3D");
  const [code, setCode] = useState("");

  // Example handleGenerateClick
  const handleGenerateClick = async () => {
    try {
      // Send language, library, vizType, and code to the backend
      const response = await axios.post("http://localhost:3001/run-script", {
        language,
        library,
        vizType,
        code,
      });
      // The backend returns fileUrl
      if (response.data.fileUrl) {
        onGenerate(response.data.fileUrl);
      }
    } catch (err) {
      console.error("Script execution error:", err);
      alert("Failed to generate visualization");
    }
  };

  return (
    <div className="code-editor-panel">
      <h2 className="panel-title">Code Editor</h2>

      {/* Language Dropdown */}
      <div className="form-group">
        <label htmlFor="languageSelect">Language</label>
        <select
          id="languageSelect"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="Python">Python</option>
          <option value="R">R</option>
        </select>
      </div>

      {/* Library Selection (could be multiple checkboxes or a single text string) */}
      {/* <div className="form-group">
        <label htmlFor="librarySelect">Library</label>
        <select
          id="librarySelect"
          value={library}
          onChange={(e) => setLibrary(e.target.value)}
        >
          <option value="Matplotlib, Plotly">Matplotlib, Plotly</option>
          <option value="ggplot2, plotly">ggplot2, plotly</option> */}
      {/* etc. */}
      {/* </select>
      </div> */}

      {/* Visualization Type */}
      <div className="form-group">
        <label>Visualization Type</label>
        <div className="viz-type-group">
          <label>
            <input
              type="radio"
              name="vizType"
              value="Static"
              checked={vizType === "Static"}
              onChange={(e) => setVizType(e.target.value)}
            />
            Static
          </label>
          <label>
            <input
              type="radio"
              name="vizType"
              value="Interactive"
              checked={vizType === "Interactive"}
              onChange={(e) => setVizType(e.target.value)}
            />
            Interactive or 3D
          </label>
          {/* <label>
            <input
              type="radio"
              name="vizType"
              value="3D"
              checked={vizType === "3D"}
              onChange={(e) => setVizType(e.target.value)}
            />
            3D
          </label> */}
        </div>
      </div>

      {/* Code Text Area */}
      <div className="form-group">
        <label htmlFor="codeArea">Code</label>
        <textarea
          id="codeArea"
          rows={10}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your Python or R code here..."
        />
      </div>

      {/* Generate Button */}
      <button className="generate-btn" onClick={handleGenerateClick}>
        Generate Visualization
      </button>
    </div>
  );
}

export default CodeEditorPanel;
