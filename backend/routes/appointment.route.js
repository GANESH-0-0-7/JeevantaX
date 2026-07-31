import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  createAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  rateDoctor,
} from "../controllers/appointment.controller.js";
const router = express.Router();

router.post("/", protectRoute, createAppointment);
router.get("/patient", protectRoute, getPatientAppointments);
router.get("/doctor", protectRoute, getDoctorAppointments);
router.put("/update/:id", protectRoute, updateAppointmentStatus);
router.post("/rate", protectRoute, rateDoctor);

export default router;
