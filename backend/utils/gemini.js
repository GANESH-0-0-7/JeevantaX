
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const gemini = async (description) => {
  try {

    const prompt = `
Return ONLY one specialization.

Symptoms:

${description}

Choose one:

Cardiology
Dermatology
Neurology
Orthopedics
Psychiatry
Pediatrics
Radiology
Oncology
General Medicine
`;

    const response = await ai.models.generateContent({
  model: "gemini-3.6-flash",
  contents: prompt,
});

    return response.text.trim();

  } catch (error) {

    console.error(error);

    return "General Medicine";
  }
};