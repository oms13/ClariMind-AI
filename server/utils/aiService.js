import { GoogleGenerativeAI } from '@google/generative-ai';
const generateExplain = async (text, tone) => {
    try {
        if (!tone) {
            tone = 'standard';
        }
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `Explain the following text in ${tone} way in some few sentences: "${text}"`;
        const result = await model.generateContent(prompt);
        const explanationText = result.response.text();
        return explanationText;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

export default generateExplain;