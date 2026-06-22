import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import ngoRoutes from "./routes/ngoRoutes.js";
import pickupRoutes from "./routes/pickupRoutes.js";

dotenv.config();

const app = express();

// 🔐 MIDDLEWARE
app.use(cors());
app.use(express.json());

// logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// 🧩 ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/ngos", ngoRoutes);
app.use("/api/pickups", pickupRoutes);

// // ❌ 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     message: "Route not found",
//   });
// });
app.get("/", (req, res) => {
  res.json({
    message: "Donation Platform Backend Running Successfully"
  });
});

// ❌ error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong on server",
  });
});

const PORT = process.env.PORT || 5000;

// 🚀 START SERVER ONLY AFTER DB CONNECT
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.log("Server failed to start:", err);
    process.exit(1);
  }
};

startServer();