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
import therapistRoutes from "./routes/therapistRoutes.js";

import "./telegramBot.js";

// =======================
// Load Environment Variables
// =======================

dotenv.config();

// =======================
// Create Express App
// =======================

const app = express();

// =======================
// Middleware
// =======================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// =======================
// CORS Configuration
// =======================

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

console.log("🌐 Allowed Origins:", allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("📥 Incoming Origin:", origin);

      // Allow Postman, curl, mobile apps
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        console.log("✅ Origin Allowed");
        return callback(null, true);
      }

      console.log("❌ Origin Blocked:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
    ],
  })
);

// =======================
// API Routes
// =======================

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/list", listRoutes);
app.use("/api/vault", vaultRoutes);

// ✅ Therapist Route
app.use("/api/therapists", therapistRoutes);

// =======================
// Test Route
// =======================

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend is working!",
  });
});

// =======================
// Home Route
// =======================

app.get("/", (req, res) => {
  res.send("JeevantaX Backend is Running...");
});

// =======================
// Start Server
// =======================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log("✅ MongoDB Connected Successfully");
      console.log("🌐 CLIENT_URL:", process.env.CLIENT_URL);
    });
  } catch (error) {
    console.error("❌ Failed to start server");
    console.error(error);
    process.exit(1);
  }
};

startServer();