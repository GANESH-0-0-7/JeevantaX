import {GoogleGenerativeAI} from "@google/generative-ai";
import dotenv from "dotenv"
dotenv.config()

const genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const gemini=async(description)=>{
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });
    const prompt=`You are a advanced medical assistant. Given the patient symptoms, return the relevant medical specialization doctor needed to treat it. responsd with just one word-the spcialization nothig else. For example:
    -> "chest pain and shortness of breath" -> "Cardiologist"
    -> "Skin rashing and itching" -> "Dermatologist"
    Always choose from the following options only:
    Cardiology , Dermatology , Pediatrics, Neurology, Orthopedics, Psychiatry, Radiology, Oncology. If its none of this , then return : General Medicine

    Symptoms:"${description}"
    `

    const result=await model.generateContent(prompt)
    const response=await result.response
    return response.text().trim()
}