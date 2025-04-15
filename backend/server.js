const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Folder to store generated viz
const VIS_OUTPUT_FOLDER = path.join(__dirname, "visualizations");

// Ensuring the "visualizations" folder exists
if (!fs.existsSync(VIS_OUTPUT_FOLDER)) {
  fs.mkdirSync(VIS_OUTPUT_FOLDER);
}

app.post("/run-script", (req, res) => {
  // Extracting fields
  const { language, library, vizType, code } = req.body;

  // debug logs
  console.log("Received /run-script with:", { language, library, vizType });

  // Validate that we have all fields
  if (!language || !vizType || !code) {
    return res.status(400).json({
      error: "Missing required fields: language, vizType, or code.",
    });
  }

  // Determine command & script extension based on language
  let fileExtension = "";
  let command = "";

  if (language.toLowerCase() === "python") {
    fileExtension = "py";
    // If you have a specific Python path (conda env), set it here:
    // command = '/path/to/env/bin/python';
    command = "python3";
  } else if (language.toLowerCase() === "r") {
    fileExtension = "R";
    command = "Rscript";
  } else {
    return res.status(400).json({ error: "Unsupported language" });
  }

  // Deciding the output extension based on visualization Type
  //    For simplicity, "Static" -> .png, "Interactive" or "3D" -> .html
  let outExt = "png";
  const vtLower = vizType.toLowerCase();
  if (vtLower === "interactive" || vtLower === "3d") {
    outExt = "html";
  }
  // (You can adapt the logic if you want 3D to produce .png or anything else)

  // Createing unique filenames
  const timestamp = Date.now();
  const scriptFilename = `script_${timestamp}.${fileExtension}`;
  const scriptFilePath = path.join(__dirname, scriptFilename);

  // Writing user code to script file
  fs.writeFileSync(scriptFilePath, code);

  // The final output the user’s script generates
  const plotFilename = `plot_${timestamp}.${outExt}`;
  const outputFilePath = path.join(VIS_OUTPUT_FOLDER, plotFilename);

  // Build command
  const finalCommand = `${command} "${scriptFilePath}" "${outputFilePath}"`;
  console.log("Executing command:", finalCommand);

  // Execute
  exec(finalCommand, (error, stdout, stderr) => {
    // Cleanup script
    fs.unlinkSync(scriptFilePath);

    if (error) {
      console.error("Script error:", stderr);
      return res.status(500).json({
        error: "Execution failed",
        details: stderr.toString(),
      });
    }

    // Responding with file
    const fileUrl = `http://localhost:3001/visuals/${plotFilename}`;
    console.log("Success! File available at:", fileUrl);

    return res.json({
      message: "Script executed successfully",
      fileUrl,
    });
  });
});

// Displaying the "visualizations" folder for static files
app.use("/visuals", express.static(VIS_OUTPUT_FOLDER));

// Starting server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
