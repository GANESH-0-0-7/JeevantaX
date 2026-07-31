import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js";
import aiRoutes from "./routes/ai.route.js";
import appointmentRoutes from "./routes/appointment.route.js";
import listRoutes from "./routes/list.route.js";
import vaultRoutes from "./routes/vault.route.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Vite frontend
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/list", listRoutes);
app.use("/api/vault", vaultRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("JeevantaX Backend is Running...");
});

// Server Start
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(" MongoDB Connected Successfully");
    });
  } catch (error) {
    console.error("Failed to start server");
    console.error(error);
    process.exit(1);
  }
};

startServer();