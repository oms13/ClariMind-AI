import History from "../models/Explanation.js";
import generateExplain from "../utils/aiService.js";

export const explain = async (req, res) => {
    try {
        const { text,tone } = req.body;
        if (!text) {
            return res.status(400).json({ explanation: "No text provided to explain." });
        }
        console.log(`Generating explanation for: "${text.substring(0, 30)}..."`);
        const resultText = await generateExplain(text,tone);
        
        if (!resultText) {
            return res.json({ explanation: "Unable to Generate the Explaination" });
        }

        await History.create({
            originalText: text,
            explanation: resultText
        });

        res.json({ explanation: resultText });
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ explanation: "Error generating explanation. Check server logs." });
    }
}