import User from "../models/user.model.js";


export const getDoctors=async(req,res)=>{
    try {
        const doctors=await User.find({role:"doctor"}).select("-password")
        return res.status(200).json({message:"Doctors fetched successfully",doctors})
    } 
    catch (error) {
        console.error("Error fetching doctors:", error);
        return res.status(500).json({ message: "Failed to fetch doctors" });
    }
}