import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
// Removed Google OAuth and session

import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
// import User from "./models/User.js"; // not needed without OAuth

dotenv.config();
const app = express();

// Middlewares
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());

// Sessions and Passport removed

// Google OAuth fully removed

// Auth guard removed (no auth in this server)

// Create Event page is now public

// Static files
app.use(express.static("public"));

// Auth routes removed

// Logout route removed

// /api/me removed (no sessions)

// Routes
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/thegoodentry")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.log("⚠️ MongoDB connection failed, using mock data");
    console.log("To fix: Install MongoDB or use MongoDB Atlas");
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
