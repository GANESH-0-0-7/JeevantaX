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

// =======================
// CORS Configuration
// =======================

const allowedOrigins = [
  "http://localhost:5173", // Local Development
  process.env.CLIENT_URL,  // Vercel Frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow Postman/mobile apps (no origin)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
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

// =======================
// Server Start
// =======================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log("✅ MongoDB Connected Successfully");
      console.log("🌐 Allowed Origin:", process.env.CLIENT_URL);
    });
  } catch (error) {
    console.error("❌ Failed to start server");
    console.error(error);
    process.exit(1);
  }
};

startServer();