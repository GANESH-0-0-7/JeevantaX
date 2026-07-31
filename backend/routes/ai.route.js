import express from "express"
import protectRoute from "../middlewares/protectRoute.js"
import { fetchSymptom, recommendDoctor } from "../controllers/ai.controller.js"
const router=express.Router()

router.post("/recommendDoctor",protectRoute,recommendDoctor)
router.post("/symptom",protectRoute,fetchSymptom)

export default router