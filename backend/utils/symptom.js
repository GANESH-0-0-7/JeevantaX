import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const symptom = async (desc) => {
  try {
    const prompt = `
You are an experienced medical AI assistant.

A patient reports:

${desc}

Return ONLY this format:

🩺 Possible Causes
• Cause 1
• Cause 2

💊 Recommended Actions
• Action 1
• Action 2

⚠️ Emergency Signs
• Sign 1
• Sign 2

Keep the answer below 250 words.
`;

   const response = await ai.models.generateContent({
  model: "gemini-3.6-flash",
  contents: prompt,
});

    return response.text;

  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};