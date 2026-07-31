import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const gemini = async (description) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an advanced medical assistant.

Given the patient's symptoms, return ONLY the medical specialization needed.

Examples:
- chest pain and shortness of breath -> Cardiology
- skin rashes and itching -> Dermatology

Choose ONLY one of these:
Cardiology, Dermatology, Pediatrics, Neurology, Orthopedics, Psychiatry, Radiology, Oncology.

If none match, return:
General Medicine

Symptoms:
${description}
`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "General Medicine";
  }
};