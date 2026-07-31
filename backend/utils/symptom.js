import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const symptom = async (desc) => {
  const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });
  const prompt = `You are an advanced medical assistant. Given the patient symptoms, return a concise, well-formatted, and styled response. Use clear headings, bullet points, and limit the reply to essential information. Be on point and professional. Example format: Dont response with anyting liks "Okay, I understand. Here's a response" etc just answer like a professinal doctor" also dont give disclaimers in your response:

**Possible Causes**\n\n**Common:**\n• Musculoskeletal Pain\n\n**Rare:**\n• Costochondritis\n\n**Extreme:**\n• Stable Angina\n\n**What to Do:**\n1. Monitor symptoms\n2. See a doctor\n3. Seek immediate help if severe symptoms occur\n\n**Disclaimer:** This is not a substitute for professional medical advice. Always consult a healthcare provider.\n\nSymptoms: "${desc}"
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text().trim();

  // Filter: Keep only the first 1200 characters for brevity
  if (text.length > 1200) text = text.slice(0, 1200) + "...";

  // Ensure basic markdown styling (headings, bullets, disclaimer)
  // Optionally, you can further process the text here if needed

  return text;
};
