# ClariMind AI 🧠

ClariMind AI is a powerful Chrome extension designed to simplify and explain any text you encounter on the web. Simply select a piece of text, click the explain option, and a side pop-up will instantly provide a clear, easy-to-understand breakdown of the content.

## ✨ Features
* **Select & Explain:** Instantly simplify complex paragraphs, technical jargon, or confusing articles directly from your browser.
* **Side Pop-up Interface:** View explanations seamlessly without leaving your current webpage.
* **AI-Powered:** Utilizes the Gemini API for highly accurate and contextual simplifications.

---

## 📋 Prerequisites

Before setting up the project locally, ensure you have the following installed and ready:
* [Node.js](https://nodejs.org/) (v14 or higher recommended)
* A MongoDB database (local or Atlas)
* A [Gemini API Key](https://aistudio.google.com/)

---

## ⚙️ Environment Variables (.env Setup)

You will need to set up your environment variables before running the application. Create a `.env` file in the root of your `server` directory and add the following keys:

```env
MONGO_URI=your_mongodb_connection_string_here
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```
---

## 🚀 Installation & Local Development

Follow these steps to get the development environment running:

1. Clone the repository:
```
git clone [https://github.com/oms13/ClariMind-AI.git](https://github.com/oms13/ClariMind-AI.git)
cd ClariMind-AI
```