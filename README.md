# UI Screens

This project contains the frontend UI screens for the SPARC application. It is built using HTML, CSS, and Vanilla JavaScript. 

To view and interact with these screens, you should run them using a local development server. The easiest way to do this is with the **Live Server** extension in Visual Studio Code.

## How to Run with Live Server

### Prerequisites
1. **Visual Studio Code (VS Code):** Make sure you have VS Code installed.
2. **Live Server Extension:**
   - Open VS Code.
   - Go to the Extensions view (`Cmd+Shift+X` on Mac or `Ctrl+Shift+X` on Windows).
   - Search for **"Live Server"** (by Ritwick Dey).
   - Click **Install**.

### Starting the Server
1. Open this entire folder (`UI Screens`) in VS Code.
2. Navigate to the `code/` directory in your file explorer on the left.
3. Open any of the main HTML files (for example, `Dashboard.html` or `Incidents List.html`).
4. **Start the server using one of these methods:**
   - **Method 1:** Right-click anywhere in the HTML file's code and select **"Open with Live Server"**.
   - **Method 2:** Click the **"Go Live"** button located in the bottom-right corner of the VS Code status bar.

### Expected Behavior
- Your default web browser will automatically open and navigate to the local server address (usually `http://127.0.0.1:5500/code/Dashboard.html`).
- **Live Reload:** Any changes you make and save in the HTML, CSS, or JS files will automatically refresh the browser page, allowing for rapid UI development.

## File Structure
- `code/`: Contains all the HTML screens, custom `globals.css` styles, and the `app.js` logic.
- `assets/`: Contains the logo, images, and standard icons (SVG/PNG formats) used throughout the UI.
