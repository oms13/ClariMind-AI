require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const History = require('./models/History');

const app = express();

// Allow the Chrome Extension to talk to this server
app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB!'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// 2. Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 3. The Explain Endpoint
app.post('/explain', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ explanation: "No text provided to explain." });
    }

    console.log(`Generating explanation for: "${text.substring(0, 30)}..."`);

    // Call Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `Explain the following text simply and concisely in a few sentences: "${text}"`;
    
    const result = await model.generateContent(prompt);
    const explanationText = result.response.text();

    // Save to Database
    await History.create({ 
      originalText: text, 
      explanation: explanationText 
    });

    // Send back to the Chrome Extension
    res.json({ explanation: explanationText });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ explanation: "Error generating explanation. Check server logs." });
  }
});

// 4. Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 ClariMind Backend running on http://localhost:${PORT}`);
});