import Appointment from "../models/appointment.model.js";
import User from "../models/user.model.js";

export const createAppointment = async (req, res) => {
  try {
    const { doctorId, time, documentUrl } = req.body;
    const patientId = req.user._id;

    if (!doctorId || !time) {
      return res.status(400).json({ message: "Please Choose Doctor And Time" });
    }

    const doctor = await User.findOne({ _id: doctorId, role: "doctor" });
    if (!doctor) {
      return res.status(400).json({ message: "Please Choose Valid Doctor" });
    }

    const patient = await User.findOne({ _id: patientId, role: "patient" });
    if (!patient) {
      return res.status(400).json({ message: "Please Choose Valid Patient" });
    }

    const appointment = await Appointment.create({
      patientId,
      doctorId,
      time,
      documentUrl: documentUrl || null,
    });

    return res
      .status(201)
      .json({ message: "Appointment Created Successfully", appointment });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPatientAppointments = async (req, res) => {
  try {
    const patientId = req.user._id;
    const appointments = await Appointment.find({ patientId })
      .populate("doctorId", "name email specialization rating")
      .sort({ createdAt: -1 });

    return res
      .status(200)
      .json({ message: "Patient Appointments fetched", appointments });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.user._id;
    const appointments = await Appointment.find({ doctorId })
      .populate("patientId", "name email")
      .sort({ createdAt: -1 });

    return res
      .status(200)
      .json({ message: "Doctor Appointments fetched", appointments });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const doctorId = req.user._id;
    const appointmentId = req.params.id;
    const { status } = req.body;

    const appointment = await Appointment.findOne({
      _id: appointmentId,
      doctorId,
    });

    if (!appointment) {
      return res
        .status(400)
        .json({ message: "Please Choose Valid Appointment" });
    }

    appointment.status = status;
    await appointment.save();
    return res.status(200).json({
      message: "Appointment Status Updated Successfully",
      appointment,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const rateDoctor = async (req, res) => {
  try {
    const patientId = req.user._id;
    const { appointmentId, rating } = req.body;
    if (!appointmentId || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Invalid appointment or rating" });
    }
    const appointment = await Appointment.findOne({
      _id: appointmentId,
      patientId,
      status: "completed",
    });
    if (!appointment) {
      return res
        .status(400)
        .json({ message: "Appointment not found or not completed" });
    }
    if (appointment.rating) {
      return res.status(400).json({ message: "Already rated" });
    }
    appointment.rating = rating;
    await appointment.save();
    const doctor = await User.findOne({
      _id: appointment.doctorId,
      role: "doctor",
    });
    if (!doctor) {
      return res.status(400).json({ message: "Doctor not found" });
    }
    let newRating = doctor.rating;
    if (rating >= 3) {
      newRating = parseFloat((doctor.rating + 0.1).toFixed(2));
    } else {
      newRating = parseFloat((doctor.rating - 0.1).toFixed(2));
      if (newRating < 0) newRating = 0;
    }
    doctor.rating = newRating;
    await doctor.save();
    return res
      .status(200)
      .json({ message: "Doctor rated successfully", doctor });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
