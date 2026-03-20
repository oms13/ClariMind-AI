import { useState, useEffect } from 'react'

function App({ initialText, rootNode }) {
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(true);

  // Function to close the popup
  const closeApp = () => {
    rootNode.remove();
  }

  useEffect(() => {
    const fetchExplanation = async () => {
      try {
        const response = await fetch("http://localhost:5000/explain", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: initialText }),
        });
        const data = await response.json();
        setExplanation(data.explanation);
      } catch (error) {
        setExplanation("Error: Make sure your Node.js server is running on port 5000.");
      } finally {
        setLoading(false);
      }
    };
    fetchExplanation();
  }, [initialText]);

  return (
    <div style={styles.overlay}>
      <div style={styles.header}>
        <strong style={{ color: '#4f46e5' }}>✨ ClariMind AI</strong>
        <button onClick={closeApp} style={styles.closeBtn}>✕</button>
      </div>
      <div style={styles.body}>
        <p style={styles.quote}>"{initialText}"</p>
        <hr style={{ border: '0.5px solid #eee', margin: '10px 0' }} />
        {loading ? (
          <p style={{ color: '#4f46e5', fontWeight: 'bold' }}>Thinking...</p>
        ) : (
          <p style={{ lineHeight: '1.5' }}>{explanation}</p>
        )}
      </div>
    </div>
  )
}

// Simple inline styles to guarantee it looks good immediately
const styles = {
  overlay: {
    position: 'fixed', top: '20px', right: '20px', width: '320px',
    backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)', zIndex: 2147483647,
    fontFamily: 'system-ui, sans-serif', color: '#1f2937'
  },
  header: {
    display: 'flex', justifyContent: 'space-between', padding: '12px 16px',
    borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb',
    borderTopLeftRadius: '12px', borderTopRightRadius: '12px', fontSize: '14px'
  },
  closeBtn: { cursor: 'pointer', background: 'none', border: 'none', fontSize: '16px', color: '#9ca3af' },
  body: { padding: '16px', fontSize: '14px', maxHeight: '400px', overflowY: 'auto' },
  quote: { fontStyle: 'italic', color: '#6b7280', fontSize: '13px', margin: '0' }
};

export default App;