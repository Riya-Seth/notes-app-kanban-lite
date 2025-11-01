import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session"; // ✅ Add this
import passport from "passport"; // ✅ Add this
import connectDB from "./config/db.js";
import noteRoutes from "./routes/noteRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import "./config/passport.js"; // ✅ Initialize passport configuration

dotenv.config();
const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173", // for local dev
    "https://notes-app-kanban-lite.vercel.app" // ✅ frontend live URL (add after deploy)
  ],
  credentials: true
}));
app.use(express.json());

// ✅ Add session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// ✅ Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Connect DB
connectDB();

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
