import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import './content.css';

const ContentApp = () => {
  const [selection, setSelection] = useState({ text: '', x: 0, y: 0 });
  const [showButton, setShowButton] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  
  const [tone, setTone] = useState('standard'); 

  const [popup, setPopup] = useState({ 
    isOpen: false, 
    text: '', 
    explanation: '', 
    isLoading: false 
  });

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(['clarimindEnabled', 'clarimindTone'], (result) => {
        setIsEnabled(result.clarimindEnabled !== false);
        if (result.clarimindTone) {
          setTone(result.clarimindTone);
        }
      });

      const handleStorageChange = (changes, namespace) => {
        if (namespace === 'local') {
          if (changes.clarimindEnabled) {
            const newState = changes.clarimindEnabled.newValue;
            setIsEnabled(newState);
            if (!newState) {
              setShowButton(false);
              setPopup(prev => ({ ...prev, isOpen: false }));
            }
          }
          if (changes.clarimindTone) {
            setTone(changes.clarimindTone.newValue);
          }
        }
      };

      chrome.storage.onChanged.addListener(handleStorageChange);
      return () => chrome.storage.onChanged.removeListener(handleStorageChange);
    }
  }, []);

  useEffect(() => {
    const handleMouseUp = (e) => {
      if (!isEnabled) return;
      if (e.target.closest('#clarimind-extension-root')) return;

      const selectedText = window.getSelection().toString().trim();
      
      if (selectedText.length > 0) {
        setSelection({ text: selectedText, x: e.pageX, y: e.pageY });
        setShowButton(true);
      }
    };

    const handleMouseDown = (e) => {
      if (!isEnabled) return;
      if (e.target.closest('#clarimind-extension-root')) return;
      
      if (e.target.id !== 'clarimind-explain-btn') {
        setShowButton(false);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isEnabled]);

  const handleExplainClick = async () => {
    setShowButton(false);
    setPopup({ isOpen: true, text: selection.text, explanation: '', isLoading: true });

    try {
      const response = await axios.post('http://localhost:5000/api/explain', {
        text: selection.text,
        tone: tone 
      });

      setPopup(prev => ({
        ...prev,
        isLoading: false,
        explanation: response.data.explanation 
      }));

    } catch (error) {
      console.error("Error fetching explanation:", error);
      setPopup(prev => ({
        ...prev,
        isLoading: false,
        explanation: "Oops! Something went wrong while connecting to the server. Please make sure the backend is running."
      }));
    }
  };

  const closePopup = () => {
    setPopup({ isOpen: false, text: '', explanation: '', isLoading: false });
  };

  return (
    <div id="clarimind-wrapper">
      {showButton && (
        <button
          id="clarimind-explain-btn"
          className="clarimind-btn"
          style={{ top: `${selection.y - 10}px`, left: `${selection.x + 10}px` }}
          onClick={handleExplainClick}
        >
          Explain ✨
        </button>
      )}

      {popup.isOpen && (
        <div className="clarimind-popup">
          <div className="clarimind-popup-header">
            <h3>ClariMind AI <span style={{fontSize: '10px', color: '#6366f1', marginLeft: '8px', textTransform: 'uppercase'}}>{tone} mode</span></h3>
            <button className="clarimind-close-btn" onClick={closePopup}>&times;</button>
          </div>
          
          <div className="clarimind-popup-content">
            <div className="clarimind-original-text">
              <strong>Selected:</strong> "{popup.text}"
            </div>
            
            <div className="clarimind-explanation">
              {popup.isLoading ? (
                <div className="clarimind-loader">Analyzing text...</div>
              ) : (
                <p>{popup.explanation}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const appContainer = document.createElement('div');
appContainer.id = 'clarimind-extension-root';
document.body.appendChild(appContainer);

const root = createRoot(appContainer);
root.render(<ContentApp />);