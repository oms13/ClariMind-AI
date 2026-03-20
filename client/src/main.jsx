import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Function to inject the React app into the webpage
const injectApp = (selectedText) => {
  // Check if our box already exists. If it does, remove it to start fresh.
  let existingRoot = document.getElementById('clarimind-root');
  if (existingRoot) {
    existingRoot.remove();
  }

  // Create a new container div
  const rootNode = document.createElement('div');
  rootNode.id = 'clarimind-root';
  document.body.appendChild(rootNode);
  
  // Render React inside that div
  const root = ReactDOM.createRoot(rootNode);
  root.render(
    <React.StrictMode>
      <App initialText={selectedText} rootNode={rootNode} />
    </React.StrictMode>
  );
};

// Listen for the message from background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "SHOW_EXPLANATION") {
    injectApp(request.text);
  }
});