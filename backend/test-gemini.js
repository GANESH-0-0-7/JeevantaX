import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

console.log("Key prefix:", process.env.GEMINI_API_KEY.substring(0, 12));

try {
  const models = await ai.models.list();

  for await (const model of models) {
    console.log(model.name);
  }
} catch (e) {
  console.error(e);
}