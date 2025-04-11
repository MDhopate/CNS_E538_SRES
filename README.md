# Language Agnostic Visualization Web Application

## Overview

This project is designed to allow users to generate and view visualizations using code written in either **Python** or **R**. The application is built with a **React** frontend and a **Node.js/Express** backend. Users can select their desired scripting language, paste custom code into a text area, and generate visualizations on demand. The backend executes the provided scripts in an isolated environment and returns the resulting image (e.g., a PNG for static plots) or an HTML file for interactive visualizations.

### Key Components

- **Frontend (React):**
  - **UI Components:**
    - A code editor panel to select language (Python or R) and input code.
    - A preview panel that displays the generated visualization (using an `<img>` for static plots or an `<iframe>` for interactive ones).
  - **Communication:**
    - Uses Axios to send POST requests to the backend containing the script and parameters.
- **Backend (Node.js/Express):**

  - **API Endpoint:**
    - Receives a JSON payload containing the language, code, and visualization type.
  - **Script Execution:**
    - Writes the user-provided code to a temporary file.
    - Executes the file using `child_process.exec` with the appropriate interpreter (e.g., Python or R).
    - Returns the URL of the generated visualization file to the frontend.
  - **File Serving:**
    - Serves the generated images/HTML files as static assets.

- **Scripting Languages:**
  - **Python:** Supports libraries such as Matplotlib and Plotly (with Kaleido for static images) to generate both static and interactive visualizations.
  - **R:** Supports ggplot2, plotly, and rgl (with htmlwidgets) for creating static, interactive, and 3D charts.

## Tools and Technologies

- **Frontend:**
  - React.js (created using Create React App)
  - Axios (for HTTP requests)
- **Backend:**

  - Node.js with Express.js
  - Child process execution (`child_process.exec`)
  - File System module (`fs`) for managing temporary scripts and output files

- **Scripting Environments:**
  - Python 3.x (managed with Anaconda for dependency control)
  - R (with packages installed either via R’s `install.packages` or Conda)

## Issues Encountered and Solutions

1. **Environment and Interpreter Configuration:**

   - _Issue:_ The backend initially used the system default Python interpreter, which did not have the required libraries (Plotly, Kaleido, etc.).
   - _Solution:_ Configured the backend to use the absolute path to the correct Anaconda Python environment. This ensures that all necessary packages are available during script execution.

2. **3D Visualization in R:**

   - _Issue:_ Creating interactive 3D charts using R’s `rgl` package often failed in headless (non-GUI) environments, especially when running on a server.
   - _Solution:_
     - Used `open3d(useNULL = TRUE)` to enable offscreen rendering.
     - Recommended using a virtual framebuffer (such as Xvfb on Linux) or switching to Plotly’s 3D capabilities that work natively in an HTML output.

## Setup and Usage

### Prerequisites

- **Node.js** and **npm** installed.
- **Python 3.x** with necessary libraries (e.g., Matplotlib, Plotly, NumPy) installed in an Anaconda environment.
- **R** installed along with required packages (e.g., ggplot2, plotly, rgl, htmlwidgets).

### Running the Application

1. **Backend:**
   - Navigate to the `backend` folder.
   - Initialize npm and install dependencies :
     ```bash
     npm init -y
     npm install express cors body-parser
     ```
   - Start the backend server:
     ```bash
     node server.js
     ```
2. **Frontend:**
   - Navigate to the `frontend` folder.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the React application:
     ```bash
     npm start
     ```
3. **Generating Visualizations:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.
   - Use the UI to select a language, input your code, and click **Generate Visualization**.
   - The backend executes your script and returns a URL that the frontend uses to display the visualization.

## Conclusion

This project provides a framework for generating visualizations from custom scripts in multiple languages. While challenges such as secure code execution and environment configuration were encountered, careful configuration of interpreters and leveraging offscreen rendering helped overcome these issues. Future improvements include enhancing sandboxing for code execution and implementing robust file management.

## License

This project was completed as part of the assessment for the Hourly RA position (E538 SRES with CNS).
