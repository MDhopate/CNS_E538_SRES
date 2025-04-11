import React from "react";

function VisualizationPreview({ content }) {
  // If there's no content yet, show a placeholder
  if (!content) {
    return (
      <div className="visualization-preview">
        <h2 className="panel-title">Visualization Preview</h2>
        <div className="empty-preview">
          <p>Ready to visualize your data</p>
          <p>
            Select a language, choose a visualization type, customize the code,
            and click “Generate Visualization” to see the result.
          </p>
        </div>
      </div>
    );
  }

  // If the content is an .html or .png link, you can conditionally render
  const isHtml = content.endsWith(".html");

  return (
    <div className="visualization-preview">
      <h2 className="panel-title">Visualization Preview</h2>
      {isHtml ? (
        // If it's an HTML file, embed it in an iframe
        <iframe
          src={content}
          title="Visualization"
          style={{ width: "100%", height: "600px", border: "none" }}
        />
      ) : (
        // Otherwise, assume it's an image
        <img
          src={content}
          alt="Visualization"
          style={{ maxWidth: "100%", maxHeight: "600px" }}
        />
      )}
    </div>
  );
}

export default VisualizationPreview;
