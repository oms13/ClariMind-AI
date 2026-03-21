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
```bash
git clone [https://github.com/oms13/ClariMind-AI.git](https://github.com/oms13/ClariMind-AI.git)
cd ClariMind-AI
```

2. Install dependencies:

You need to install the required packages for both the client and the server.

```bash
# Navigate to the client folder and install
cd client
npm install

# Navigate to the server folder and install
cd ../server
npm install
```

3. Run the development server:

Return to the root directory of the project. Running the dev script will simultaneously build the client's `dist` folder and start the Node.js backend using Nodemon.

```bash
cd ..
npm run dev
```

---

## 🧩 Loading the Extension in Chrome

Once your `client/dist` folder is built and the server is running, you need to load the extension into your browser:

1. Open Google Chrome and navigate to `chrome://extensions/` in your address bar.

2. Toggle the Developer mode switch in the top right corner to ON.

3. Click the Load unpacked button that appears in the top left.

4. Navigate to your project folder, select the `client/dist` directory, and click open. (This folder contains all the necessary files for the browser to run the extension).

That's it! The ClariMind AI extension is now active in your browser. Select some text on any webpage and test it out.

---

## 📁 Project Structure

```
clarity-mind-ai/
│
├── client/        # Chrome extension frontend
│   ├── src/
│   └── dist/      # Built extension (load this in Chrome)
│
├── server/        # Backend (API + AI logic)
│
└── package.json   # Root scripts
```

---

## 💡 Tech Stack

• Frontend: JavaScript, Chrome Extension APIs

• Backend: Node.js, Express

• AI: Gemini API

---

## ⚠️ Notes

• Always load the `dist/ folder`, not `src/`

• Make sure backend is running before using the extension

• If extension doesn’t update, click Reload in `chrome://extensions/`

---

Built with 💡 by Om Sahu

If you like this project, give it a ⭐ on GitHub!