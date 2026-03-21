// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [tone, setTone] = useState('standard');

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(['clarimindEnabled', 'clarimindTone'], (result) => {
        setIsEnabled(result.clarimindEnabled !== false);
        if (result.clarimindTone) {
          setTone(result.clarimindTone);
        }
      });
    }
  }, []);

  const toggleExtension = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({ clarimindEnabled: newState });
    }
  };

  const handleToneChange = (e) => {
    const newTone = e.target.value;
    setTone(newTone);
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({ clarimindTone: newTone });
    }
  };

  const openDashboard = () => {
    window.open('http://localhost:5000', '_blank');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="title-row">
          <img src="/icon128.png" alt="ClariMind Logo" className="app-logo" />
          <h1>ClariMind AI</h1>
        </div>
        <p>Your intelligent reading assistant</p>
      </header>

      <main className="app-main">
        <div className="setting-row">
          <span>Enable Extension</span>
          <button
            className={`toggle-btn ${isEnabled ? 'on' : 'off'}`}
            onClick={toggleExtension}
          >
            {isEnabled ? 'ON' : 'OFF'}
          </button>
        </div>

        <div className="setting-row tone-selector">
          <span>Explanation Style</span>
          <select
            value={tone}
            onChange={handleToneChange}
            className="select-input"
          >
            <option value="simple">Explain Like I'm 5</option>
            <option value="standard">Standard Summary</option>
            <option value="detailed">In-Depth & Detailed</option>
          </select>
        </div>
      </main>

      <footer className="app-footer">
        <button className="history-btn" onClick={openDashboard}>
          View Saved Explanations
        </button>
      </footer>
    </div>
  );
}

export default App;