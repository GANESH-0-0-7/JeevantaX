import { gemini } from "../utils/gemini.js";
import User from "../models/user.model.js"
import { symptom } from "../utils/symptom.js";

export const recommendDoctor = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ message: "Please provide description" });
    }

    const specialization = await gemini(description);

    const doctor = await User.findOne({
      role: "doctor",
      specialization,
    }).sort({ rating: -1 });

    if (!doctor) {
      return res
        .status(404)
        .json({ message: "No doctor available for this specialization" });
    }

    return res
      .status(200)
      .json({ message: "Doctor recommended successfully", doctor });
  } catch (error) {
    console.error("Error in recommendDoctor:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchSymptom=async(req,res)=>{
  try {
    const {prompt}=req.body
    if(!prompt){
      return res.status(400).json({message:"Please provide prompt"})
    }
    const response=await symptom(prompt)
    return res.status(200).json({message:"Symptoms Fetched Successfully",response})
  } 
  catch (error) {
    console.error("Error in recommendDoctor:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}


