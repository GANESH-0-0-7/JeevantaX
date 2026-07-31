// =======================
// CORS Configuration
// =======================

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

console.log("Allowed Origins:", allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Incoming Origin:", origin);

      // Allow requests without Origin (Postman, curl, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        console.log("Origin Allowed");
        return callback(null, true);
      }

      console.log("Origin Blocked:", origin);

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);